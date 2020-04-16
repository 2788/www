package render

import (
	"net/http"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	legoService "github.com/qbox/pay-sdk/http/lego/lego/lego_service"
	"github.com/qbox/pay-sdk/http/lego/models"
	"qiniu.com/qbox/www/janus/controllers/middlewares"
)

const (
	notFoundPage        = "activity/not-found"
	campaignExpiredPage = "activity/activity-end"
)

// Render handler for lego render
type Render struct {
	marketingHost string
	legoService   legoService.ClientService
}

// NewRenderHandler initializes a render handler
func NewRenderHandler(marketingHost string, legoService legoService.ClientService) *Render {
	if !strings.HasSuffix(marketingHost, "/") {
		marketingHost += "/"
	}
	return &Render{
		marketingHost: marketingHost,
		legoService:   legoService,
	}
}

// RenderPage renders a campaign page
func (c *Render) RenderPage(ctx *gin.Context) {
	log := middlewares.GetLogger(ctx)
	code := ctx.Param("code")
	if code == "" {
		ctx.Redirect(http.StatusFound, c.marketingHost+notFoundPage)
		return
	}

	// 未查询到活动跳 404
	campaignRes, err := c.legoService.GetCampaign(legoService.NewGetCampaignParams().WithCode(&code))
	if err != nil || campaignRes.Payload == nil {
		log.Errorf("c.legoService.GetCampaign(%s) with error: %s", code, err)
		ctx.Redirect(http.StatusFound, c.marketingHost+notFoundPage)
		return
	}

	if campaignRes.Payload.Status != models.LegoCampaignStatusCAMPAIGNSTATUSONLINE {
		log.Warnf("request campaign of %s with status %s", code, campaignRes.Payload.Status)
		ctx.Redirect(http.StatusFound, c.marketingHost+notFoundPage)
		return
	}

	// 活动过期跳过期页面
	now := time.Now()
	if (!time.Time(campaignRes.Payload.EffectAt).IsZero() && time.Time(campaignRes.Payload.EffectAt).After(now)) ||
		(!time.Time(campaignRes.Payload.DeadAt).IsZero() && time.Time(campaignRes.Payload.DeadAt).Before(now)) {
		log.Warnf("campaign overdue, code: %s, effectAt: %s, deadAt: %s", code, campaignRes.Payload.EffectAt, campaignRes.Payload.DeadAt)
		ctx.Redirect(http.StatusFound, c.marketingHost+campaignExpiredPage)
		return
	}

	// 未查询到页面信息跳 404
	var page, pageSize = "1", "1"
	pageListRes, err := c.legoService.ListTemplatePage(
		legoService.NewListTemplatePageParams().
			WithCampaignID(&campaignRes.Payload.ID).WithPage(&page).WithPageSize(&pageSize))
	if err != nil || len(pageListRes.Payload.Pages) == 0 {
		log.Errorf("c.legoService.ListTemplatePage(%d) with error: %s", campaignRes.Payload.ID, err)
		ctx.Redirect(http.StatusFound, c.marketingHost+notFoundPage)
		return
	}

	ctx.HTML(http.StatusOK, "templates/render.html", gin.H{
		"campaign": pageListRes.GetPayload().Pages[0],
	})
}

// RenderPreviewPageByData renders a preview page by post data
func (c *Render) RenderPreviewPageByData(ctx *gin.Context) {
	log := middlewares.GetLogger(ctx)
	var data *models.LegoTemplatePagePreviewData
	err := ctx.BindJSON((&data))
	if err != nil {
		log.Errorf("ctx.BindJSON with error: %s", err)
		ctx.Redirect(http.StatusFound, c.marketingHost+notFoundPage)
		return
	}

	if data.CampaignCode == "" || data.Page == nil || data.Page.Content == "" {
		ctx.Redirect(http.StatusFound, c.marketingHost+notFoundPage)
		return
	}

	ctx.HTML(http.StatusOK, "templates/preview.html", gin.H{
		"data": data,
	})
}

// RenderPreviewPageByShareCode renders a preview page by share code
func (c *Render) RenderPreviewPageByShareCode(ctx *gin.Context) {
	log := middlewares.GetLogger(ctx)
	code := ctx.Param("code")
	secret := ctx.Param("secret-code")

	if code != "preview" || secret == "" {
		ctx.Redirect(http.StatusFound, c.marketingHost+notFoundPage)
		return
	}

	result, err := c.legoService.GetTemplatePagePreviewData(legoService.NewGetTemplatePagePreviewDataParams().WithCode(&code))
	if err != nil {
		log.Errorf("c.legoService.GetTemplatePagePreviewData(%s) with error: %s", code, err)
		ctx.Redirect(http.StatusFound, c.marketingHost+notFoundPage)
		return
	}

	if result.GetPayload() == nil ||
		result.GetPayload().CampaignCode == "" ||
		result.GetPayload().Page == nil ||
		result.GetPayload().Page.Content == "" {
		ctx.Redirect(http.StatusFound, c.marketingHost+notFoundPage)
		return
	}

	ctx.HTML(http.StatusOK, "templates/preview.html", gin.H{
		"data": result.Payload,
	})
}
