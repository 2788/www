class EventsController < ApplicationController
  def index
    # @niushows = Event.where( category: "NiuShow", is_top: true).limit(3)
    # @teches = Event.where( category: "TechOnline", is_top: true).limit(3)
    # @ecugs = Event.where( category: "ECUG", is_top: true).limit(3)
    redirect_to niudays_url
  end

  def tech_online
    @events = Event.where( category: "TechOnline")
    @hero = "hero-tech"
    render "list"
  end

  def ecug
    @events = Event.where( category: "ECUG")
    @hero = "hero-ecug"
    render "list"
  end

  def niushow
    @events = Event.where( category: "NiuShow")
    @hero = "hero-niushow"
    render "list"
  end

  def arch
  end

  def ecugcon
    @events = Event.where( category: "ECUG")
    render "ecugcon"
  end

  def free
  end

  def event1024
  end

  # 根据时间计算热度
  # 2018 年 1024 活动
  # https://jira.qiniu.io/browse/BO-5294
  def get_heat
    # 活动开始时间 2018 年 10 月 24 日 00:00:00
    start_time = Time.local(2018, 10, 24)
    # 热度判定结束时间 2018 年 10 月 28 日 00:00:00
    end_time = Time.local(2018, 10, 28)
    # 当前时间
    current_time = Time.now
    # 活动未开始
    if current_time.to_i < start_time.to_i
      render json: {
        "is_valid": false,
        "value": 0
      }
      return
    end
    # 活动已结束
    if current_time.to_i > end_time.to_i
      render json: {
        "is_valid": true,
        "value": 1
      }
      return
    end

    pass_day = current_time.yday - start_time.yday
    heat_res = heat_function(pass_day)

    if heat_res < 0
      render json: {
        "is_valid": false,
        "value": 0
      }
      return
    end

    # 热度总量为 27
    # 转换为 float 型
    heat_all = 27.to_f
    heat_ratio = (heat_res / heat_all).round(2)

    if heat_ratio < 0
      render json: {
        "is_valid": false,
        "value": 0
      }
      return
    end

    if heat_ratio > 1
      render json: {
        "is_valid": true,
        "value": 1
      }
      return
    end

    render json: {
      "is_valid": true,
      "value": heat_ratio
    }
  end

  # 计算热度的函数
  # pass_day: 活动已经开始的天数
  def heat_function(pass_day)
    # 结果转换为 float 型
    return (-(pass_day - 5) ** 2 + 28).to_f
  end

  # 获取好友分享链接
  def get_share_link
    uid = params[:uid]
    portal_host = Rails.configuration.portal_host
    if uid.nil? || uid.blank? || portal_host.nil? || portal_host.blank?
      render json: {
        "is_valid": false,
        "link": ""
      }
      return
    end

    admin_token = get_admin_token()
    if admin_token.nil?
      render json: {
        "is_valid": false,
        "link": ""
      }
      return
    end

    req_uri = portal_host + "/api/gaea/user/promotion/" + uid + "/invite/url"
    share_link = get_remote_data(req_uri, admin_token)
    if share_link.nil?
      render json: {
        "is_valid": false,
        "link": ""
      }
      return
    end

    if share_link["code"] != 200
      render json: {
        "is_valid": false,
        "link": ""
      }
      return
    end

    if share_link["data"].nil? || share_link["data"].blank?
      render json: {
        "is_valid": false,
        "link": ""
      }
      return
    end

    render json: {
      "is_valid": true,
      "link": share_link["data"]
    }
  end

  # 获取用户邀请信息
  def get_invited_info
    uid = params[:uid]
    gaea_admin_host = Rails.configuration.gaea_admin_host
    if uid.nil? || uid.blank? || gaea_admin_host.nil? || gaea_admin_host.blank?
      render json: {
        "is_valid": false,
        "invited_info": nil
      }
      return
    end

    admin_token = get_admin_token()
    if admin_token.nil?
      render json: {
        "is_valid": false,
        "invited_info": nil
      }
      return
    end

    req_uri = gaea_admin_host + "/api/marketing/promotion/bo5310/info/" + uid
    invited_info = get_remote_data(req_uri, admin_token)
    if invited_info.nil?
      render json: {
        "is_valid": false,
        "invited_info": nil
      }
      return
    end

    if invited_info["code"] != 200
      render json: {
        "is_valid": false,
        "invited_info": nil
      }
      return
    end

    render json: {
      "is_valid": true,
      "invited_info": invited_info["data"]
    }
  end

  # 创建抽奖资格
  def event1024_create_award
    uid = params[:uid]
    gaea_admin_host = Rails.configuration.gaea_admin_host
    if uid.nil? || uid.blank? || gaea_admin_host.nil? || gaea_admin_host.blank?
      render json: {
        "is_success": false
      }
      return
    end

    uid_number = uid.to_i
    if uid_number.nil? || uid_number.blank?
      render json: {
        "is_success": false
      }
      return
    end

    admin_token = get_admin_token()
    if admin_token.nil?
      render json: {
        "is_success": false
      }
      return
    end

    req_body = render json: {
      "uid": uid_number
    }
    req_uri = gaea_admin_host + "/api/marketing/promotion/bo5310/info"
    res = post_remote_data(req_uri, admin_token, req_body)

    if res.nil?
      render json: {
        "is_success": false
      }
      return
    end

    if res["code"] != 200
      render json: {
        "is_success": false
      }
      return
    end

    render json: {
      "is_success": true
    }
  end

  # remote get 请求
  def get_remote_data(req_uri, admin_token)
    access_token = admin_token["access_token"]
    uri = URI.parse(req_uri)
    req = Net::HTTP::Get.new(uri)
    req["Authorization"] = "Bearer " + access_token
    req["Content-Type"] = "application/json"

    begin
        http = Net::HTTP.new(uri.hostname, uri.port)
        if uri.port == 443
          http.use_ssl = true
        end
        res = http.request(req)
    rescue
      return nil
    end

    case res
      when Net::HTTPSuccess
        JSON.parse res.body
      else
        puts res.message
        return nil
    end
  end

  # remote post 请求
  def post_remote_data(req_uri, admin_token, req_body)
    access_token = admin_token["access_token"]
    uri = URI.parse(req_uri)
    req = Net::HTTP::POST.new(uri)
    req["body"] = req_body.to_json.encode("UTF-8")
    req["Authorization"] = "Bearer " + access_token
    req["Content-Type"] = "application/json"

    begin
        http = Net::HTTP.new(uri.hostname, uri.port)
        if uri.port == 443
          http.use_ssl = true
        end
        res = http.request(req)
    rescue
      return nil
    end

    case res
      when Net::HTTPSuccess
        JSON.parse res.body
      else
        puts res.message
        return nil
    end
  end

  # 获取 admin_token
  def get_admin_token
    admin_username = Rails.application.secrets.admin[:username]
    admin_password = Rails.application.secrets.admin[:password]
    begin
      res = Net::HTTP.post_form(URI.parse(Rails.configuration.acc_host+"/oauth2/token"),
                                  {"grant_type" => "password", "username" => admin_username, "password" => admin_password})
    rescue 
      return nil
    end

    case res
      when Net::HTTPSuccess
        JSON.parse res.body
      else
        puts res.message
        return nil
    end
  end
end
