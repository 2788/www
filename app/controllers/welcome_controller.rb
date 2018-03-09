class WelcomeController < ApplicationController

  def index
    @top_archives = Archive.top_archives
  end

  def kodo
  end

  def pili
  end

  def pandora
  end

  def fusion
  end

  def dora
  end

  def kirk
  end

  def vance
  end

  def player
  end

  def contact
  end

  def solution
  end

  def alaccelerator
  end

  def cdnprice2018
  end

  def livequiz
  end

  def news
    @archives = Archive.news_archives
    render "about"
  end

  def product_news
    @archives = Archive.product_archives
    render "about"
  end

  def welfares
    @archives = Archive.welfares_archives
    render "about"
  end

  def company
  end

  def case
  end

  def atlab
  end

  def plsv
  end

  def newmedia
  end

  def user_agreement
    render "sla"
  end

  def sla_kodo
    render "sla"
  end

  def sla_fusion
    render "sla"
  end

  def sla_pili
    render "sla"
  end

  def sla_dora
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
