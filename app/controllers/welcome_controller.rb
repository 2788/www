require "uri"
require 'net/http'
require 'json'

class WelcomeController < ApplicationController

  def index
    # @top_archives = Archive.top_archives
    # 根据 current_editor 判断查询条件
    # index 首页不查找数据库获取文章
    # if current_editor.nil? == false
    #   @top_archives = Archive.where(status: ['published', 'offline', 'draft']).top_archives
    # else
    #   @top_archives = Archive.where(status: 'published').top_archives
    # end
  end

  def contact
  end

  def solution
  end

  def alaccelerator
  end

  def cdnprice2018
  end

  def news
    # @archives = Archive.news_archives
    # 根据 current_editor 判断查询条件
    if current_editor.nil? == false
      @archives = Archive.where(status: ['published', 'offline', 'draft']).news_archives.page params[:page]
    else
      @archives = Archive.where(status: 'published').news_archives.page params[:page]
    end
    render "about"
  end

  def product_news
    # @archives = Archive.product_archives
    # 根据 current_editor 判断查询条件
    if current_editor.nil? == false
      @archives = Archive.where(status: ['published', 'offline', 'draft']).product_archives.page params[:page]
    else
      @archives = Archive.where(status: 'published').product_archives.page params[:page]
    end
    render "about"
  end

  def welfares
    # @archives = Archive.welfares_archives
    # 根据 current_editor 判断查询条件
    if current_editor.nil? == false
      @archives = Archive.where(status: ['published', 'offline', 'draft']).welfares_archives.page params[:page]
    else
      @archives = Archive.where(status: 'published').welfares_archives.page params[:page]
    end
    render "about"
  end

  def company
  end

  def case
  end

  def user_agreement
    render "sla"
  end

  def sla_kodo
    render "sla"
  end

  def sla_kodo_old
    render "sla"
  end

  def sla_kodo_new
    # 考虑到 /sla-kodo-new 这个路由已经开放出去了
    # 重定向到 /sla-kodo
    redirect_to('https://www.qiniu.com/sla-kodo', :status => 301)
  end

  def sla_fusion
    render "sla"
  end

  def sla_fusion_old
    render "sla"
  end

  def sla_fusion_new
    # 重定向到 /sla-fusion
    redirect_to('https://www.qiniu.com/sla-fusion', :status => 301)
  end

  def sla_pili
    render "sla"
  end

  def sla_dora
    render "sla"
  end

  def privacy_right
    render "sla"
  end

  def goglobal
    render "goglobal"
  end

  def invitation
    render "invitation"
  end

  def ssl
    render "ssl"
  end

  def partner
  end

  def robots
    if request.host == "www.qiniu.com"
      render plain: """\
        User-agent: *
      """
    else
      render plain: """\
        User-agent: Baiduspider
        Disallow: /
        User-agent: Sosospider
        Disallow: /
        User-agent: sogou spider
        Disallow: /
        User-agent: YodaoBot
        Disallow: /
        User-agent: Googlebot
        Disallow: /
        User-agent: Bingbot
        Disallow: /
        User-agent: Slurp
        Disallow: /
        User-agent: MSNBot
        Disallow: /
        User-agent: googlebot-image
        Disallow: /
        User-agent: googlebot-mobile
        Disallow: /
        User-agent: yahoo-blogs/v3.9
        Disallow: /
        User-agent: psbot
        Disallow: /
        User-agent: *
        Disallow: /\
      """
    end
  end

end
