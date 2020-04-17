package env

import (
	"html/template"
	"io/ioutil"
	"path/filepath"

	"github.com/gin-gonic/gin"
	"qiniu.com/qbox/www/janus/controllers/proxy"
	"qiniu.com/qbox/www/janus/controllers/render"
)

func InitRouters(app *gin.Engine) {
	proxyHandler := proxy.NewProxyHandler(Global.AccTr, Global.ProxyCfg, Global.SSOService, Global.Logger)
	render := render.NewRenderHandler(Global.Cfg.Host.MarketingFront, Global.LegoService)

	setHTMLTemplate(app)

	activity := app.Group("/activity")
	{
		activity.GET("/:code", render.RenderPage)
		// for /preview/:code
		activity.GET("/:code/:secret-code", render.RenderPreviewPageByShareCode)
		activity.POST("/preview", render.RenderPreviewPageByData)
	}

	proxy := app.Group("/api/proxy")
	{
		proxy.Any("/*proxy", proxyHandler.HandleProxyRequest)
	}

}

func setHTMLTemplate(app *gin.Engine) {
	t := template.New("templates").Funcs(template.FuncMap{
		"htmlSafe": func(text string) template.HTML {
			return template.HTML(text)
		},
	})

	filenames, err := filepath.Glob("templates/*.html")
	if err != nil {
		panic(err)
	}

	for _, filename := range filenames {
		bytes, err := ioutil.ReadFile(filename)
		if err != nil {
			panic(err)
		}

		tmpl := t.New(filename)
		_, err = tmpl.Parse(string(bytes))
		if err != nil {
			panic(err)
		}
	}

	app.SetHTMLTemplate(t)
}
