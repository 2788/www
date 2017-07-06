class WelcomeController < ApplicationController

  def index
    @title = "七牛云-国内领先的企业级云服务商"
    @keywords = "七牛, 七牛云, 七牛云存储, 七牛直播云, 七牛CDN加速"
    @description = "七牛云是国内领先的企业级云服务商，致力于打造以数据为核心的场景化 PaaS 服务。围绕富媒体场景，七牛提供对象存储，融合CDN加速，直播云，内容反垃圾等服务。"
  end

  def kodo
    @title = "对象存储_海量安全高可靠的云存储-七牛云"
    @keywords = "云存储, 对象存储, 七牛云存储, 分布式存储, 图片存储, 视频存储, 存储解决方案，视频托管，图片托管"
    @description = "七牛云对象存储为七牛完全自主研发并拥有核心技术，经过大规模客户验证已占据行业绝对领先地位，可广泛应用于海量数据管理的场景。强安全、高可靠、易扩展、低成本，比传统存储节省62%的存储成本。"
  end

  def pili
    @title = "pili"
  end

  def pandora
    @title = "pandora"
  end

  def fusion
    @title = "fusion"
  end

  def dora
    @title = "dora"
  end

  def kirk
    @title = "kirk"
  end

  def vance
    @title = "vance"
  end

  def contact
    @title = "contact"
  end

  def solution
    @title = "solution"
  end

  def about
    @title = "about"
  end

  def company
    @title = "company"
  end

  def cooperation
    @title = "cooperation"
  end

  def case
    @title = "case"
  end

  def atlib
    @title = "atlib"
  end

end
