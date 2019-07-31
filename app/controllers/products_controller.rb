class ProductsController < ApplicationController
  def index
  end

  def kodo
  end

  def fusion
  end

  def qvm
  end

  def kirk
  end

  def snow
  end

  def atlab
  end

  def pandora
  end

  def insight
  end

  def dora
  end

  def pili
  end

  def rtn
  end

  def sdk
  end

  def vance
  end

  def plsv
  end

  def vcs
  end

  def player
  end

  def newmedia
  end

  def playout
  end

  def mam
  end

  def cms
  end

  def operation
  end

  def convergence
  end

  def live
  end

  def resolution
  end

  def demolition
  end

  def microservices
  end

  def editor
    # 云快编页面下线
    # 不隐藏路由，访问页面重定向到新媒体解决方案落地页
    # https://jira.qiniu.io/browse/BO-7814
    redirect_to('https://www.qiniu.com/products/newmedia', :status => 301)
  end

  def auditor
  end

  def copyright
  end

  def visualization
  end

  def interact
  end

  def livequiz
  end

  def qavs
  end

  def edu
    # 在线教育解决方案页面下线
    # 不隐藏路由，访问页面重定向到官网主页
    # https://jira.qiniu.io/browse/BO-6826
    redirect_to('https://www.qiniu.com/', :status => 301)
  end

  def ess
  end

  def ecs
  end

  def kodoprivate
  end

  def kodoprivate_company
  end

  def qvmfeeds
  end

  def censorfeeds
  end

  def qvm_partner
  end

  def qvm_company
  end

  def linking
  end

  def sms
  end

  def kodo_goglobal
  end

  def censor
    @videoSrc_1 = "https://mars-assets.qnssl.com/Fi1UC6waXtXYCpnTGHa8XxIziGNk"
    @videoSrc_2 = "https://mars-assets.qnssl.com/Fos2uiHzcuvF6HZF3RarMp9J1ewZ"
    @videoSrc_3 = "https://mars-assets.qnssl.com/FgV6wvTgRv8ZgUZBecKojdIlfs58"
    @videoSrc_4 = "https://mars-assets.qnssl.com/lrBYuiLwg0zFRUP97w59FmmN6H01"
  end

  def censor_photo
    @type = "photo"
    @videoSrc_1 = "https://mars-assets.qnssl.com/Fi1UC6waXtXYCpnTGHa8XxIziGNk"
    @videoSrc_2 = "https://mars-assets.qnssl.com/Fos2uiHzcuvF6HZF3RarMp9J1ewZ"
    @videoSrc_3 = "https://mars-assets.qnssl.com/FgV6wvTgRv8ZgUZBecKojdIlfs58"
    @videoSrc_4 = "https://mars-assets.qnssl.com/lrBYuiLwg0zFRUP97w59FmmN6H01"
    render "censor_key_rank"
  end

  def censor_video
    @type = "video"
    @videoSrc_1 = "https://mars-assets.qnssl.com/Fi1UC6waXtXYCpnTGHa8XxIziGNk"
    @videoSrc_2 = "https://mars-assets.qnssl.com/Fos2uiHzcuvF6HZF3RarMp9J1ewZ"
    @videoSrc_3 = "https://mars-assets.qnssl.com/FgV6wvTgRv8ZgUZBecKojdIlfs58"
    @videoSrc_4 = "https://mars-assets.qnssl.com/lrBYuiLwg0zFRUP97w59FmmN6H01"
    render "censor_key_rank"
  end

  # 生成签名(base64编码后)
  def generate_encoded_sign(key, originStr)
    hmac_digest = OpenSSL::HMAC.digest(OpenSSL::Digest.new('sha1'), key, originStr)
    return Qiniu::Utils.urlsafe_base64_encode(hmac_digest)
  end

  # 图片审核
  def img_censor

    uri = URI.parse(Rails.configuration.img_audit_host)

    path = params[:path]
    type = params[:type]

    body = {
      data: {
        uri: ''
      },
      params: {
        scenes: ['pulp', 'terror', 'politician', 'ads']
      }
    }

    if type == 'slide'
      body[:data][:uri] = 'https://mars-assets.qnssl.com/' + path
    elsif type == 'url'
      body[:data][:uri] = path
    end

    # 生成qiniu_token
    originStr = "POST " + uri.path + "\nHost: " + uri.host + "\nContent-Type: application/json\n\n"
    originStr += body.to_json.encode('UTF-8')

    encoded_sign = generate_encoded_sign(Rails.application.secrets.atlab_sec_key, originStr)
    qiniu_token = "Qiniu #{Rails.application.secrets.atlab_acc_key}:#{encoded_sign}"

    header = {
      'Authorization' => qiniu_token,
      'Content-Type' => 'application/json'
    }

    request = Net::HTTP::Post.new(uri, header)
    request.body = body.to_json.encode('UTF-8')

    begin
      http = Net::HTTP.new(uri.host, uri.port)
      if uri.port == 443
        http.use_ssl = true
      end
      res = http.request(request)
    rescue
      render json: {
        result: nil
      }
      return
    end

    case res
      when Net::HTTPSuccess
        resBody = JSON.parse res.body
        if resBody.nil?
          render json: {
            result: nil
          }
          return
        end
        render json: {
          result: resBody
        }
        return
      else
        p res
        render json: {
          result: nil
        }
        return
    end
  end

  # 视频审核
  def video_censor

    uri = URI.parse(Rails.configuration.video_audit_host)

    path = params[:path]
    type = params[:type]

    body = {
      data: {
        uri: ''
      },
      params: {
        scenes: ['pulp', 'terror', 'politician', 'ads']
      }
    }

    if type == 'slide'
      body[:data][:uri] = 'https://mars-assets.qnssl.com/' + path
    elsif type == 'url'
      body[:data][:uri] = path
    end

    # 生成qiniu_token
    originStr = "POST " + uri.path + "\nHost: " + uri.host + "\nContent-Type: application/json\n\n"
    originStr += body.to_json.encode('UTF-8')

    encoded_sign = generate_encoded_sign(Rails.application.secrets.atlab_sec_key, originStr)
    qiniu_token = "Qiniu #{Rails.application.secrets.atlab_acc_key}:#{encoded_sign}"

    header = {
      'Authorization' => qiniu_token,
      'Content-Type' => 'application/json'
    }

    request = Net::HTTP::Post.new(uri, header)
    request.body = body.to_json.encode('UTF-8')

    begin
      http = Net::HTTP.new(uri.host, uri.port)
      if uri.port == 443
        http.use_ssl = true
      end
      res = http.request(request)
    rescue
      render json: {
        is_success: false,
        job_id: ''
      }
      return
    end

    case res
      when Net::HTTPSuccess
        resBody = JSON.parse res.body
        if resBody.nil?
          render json: {
            is_success: false,
            job_id: ''
          }
          return
        end
        render json: {
          is_success: true,
          job_id: resBody['job'] || ''
        }
        return
      else
        p res
        render json: {
          is_success: false,
          job_id: ''
        }
        return
    end
  end

  # 获取视频审核结果
  def video_censor_result

    video_censor_job = params[:jobID]

    if video_censor_job.nil? || video_censor_job.blank?
      render json: {
        is_success: false,
        data: nil
      }
      return
    end

    uri = URI.parse(Rails.configuration.video_jobs_host + '/' + video_censor_job)
    # 生成qiniu_token
    originStr = "GET " + uri.path + "\nHost: " + uri.host + "\nContent-Type: application/json\n\n"

    encoded_sign = generate_encoded_sign(Rails.application.secrets.atlab_sec_key, originStr)
    qiniu_token = "Qiniu #{Rails.application.secrets.atlab_acc_key}:#{encoded_sign}"

    header = {
      'Authorization' => qiniu_token,
      'Content-Type' => 'application/json'
    }

    request = Net::HTTP::Get.new(uri, header)

    begin
      http = Net::HTTP.new(uri.host, uri.port)
      if uri.port == 443
        http.use_ssl = true
      end
      res = http.request(request)
    rescue
      render json: {
        is_success: false,
        data: nil
      }
      return
    end

    case res
      when Net::HTTPSuccess
        resBody = JSON.parse res.body
        if resBody.nil?
          render json: {
            is_success: false,
            data: nil
          }
          return
        end
        render json: {
          is_success: true,
          data: resBody
        }
        return
      else
        p res
        render json: {
          is_success: false,
          data: nil
        }
        return
    end
  end

  # 获取 atlab 审核数量数据
  def censor_quantity_data
    # atlab 成立的日子
    date_atlab_found = Time.local(2017, 4, 1)
    current_time = Time.now
    begin_of_today = Time.local(current_time.year, current_time.month, current_time.day)

    diff_days = (begin_of_today.to_i - date_atlab_found.to_i) / (24 * 60 * 60)
    diff_hours = current_time.hour
    diff_seconds = current_time.to_i - begin_of_today.to_i
    diff_milli_seconds = diff_seconds * 1000

    # 23 个节点把一天分为 24 个小时，所以这里除以的是 23
    increase_value_average_milli = ((diff_days * 1000) / 23).to_i
    increase_value_average = (diff_days / 23).to_i

    # 保护平台数
    protect_platform = ((1000 + diff_days.to_i) * 0.72).to_i

    # 今日审核总量
    total_video = ((diff_milli_seconds * 0.75) + (diff_hours * increase_value_average_milli) + rand(751)).to_i
    total_image = ((diff_milli_seconds * 0.85) + (diff_hours * increase_value_average_milli) + rand(851)).to_i
    total_text = ((diff_milli_seconds * 0.73) + (diff_hours * increase_value_average_milli) + rand(731)).to_i

    # 今日已封禁违规内容
    forbid_sexy = ((diff_seconds * 0.65) + (diff_hours * increase_value_average)).to_i
    forbid_violence = ((diff_seconds * 0.18) + (diff_hours * increase_value_average)).to_i
    forbid_political = ((diff_seconds * 0.15) + (diff_hours * increase_value_average)).to_i
    forbid_vulgar = ((diff_seconds * 0.14) + (diff_hours * increase_value_average)).to_i
    forbid_ads = ((diff_seconds * 0.13) + (diff_hours * increase_value_average)).to_i

    render json: {
      "is_success": true,
      "data": {
        "protect_platform": protect_platform,
        "total_video": total_video,
        "total_image": total_image,
        "total_text": total_text,
        "forbid_sexy": forbid_sexy,
        "forbid_violence": forbid_violence,
        "forbid_political": forbid_political,
        "forbid_vulgar": forbid_vulgar,
        "forbid_ads": forbid_ads
      }
    }
    return
  end

  # POST /qvm/user/action
  # 上报QVM相关用户行为
  def report_user_action

    uinfo = session[:uinfo]

    if uinfo.nil? || uinfo.blank?
      render json: {
        "success": false,
      }
      return
    end

    uid = uinfo["uid"]

    endpoint_url = "#{Rails.configuration.qvm_host}/api/v1/www/user/#{uid}/action"

    query = {}
    query[:Signature] = generate_encoded_sign(Rails.application.secrets.qvm_secret_key + "&", "POST&%2F&")

    uri = URI(endpoint_url)
    uri.query = URI.encode_www_form(query)
    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = (uri.scheme == "https")
    http.verify_mode = OpenSSL::SSL::VERIFY_NONE

    header = {
      'Content-Type' => 'application/json'
    }
    request = Net::HTTP::Post.new(uri.request_uri, header)
    request.body = params["product"].to_json.encode("UTF-8")

    response = http.request(request)

    case response
    when Net::HTTPSuccess
      render json: response.body
      return
    else
      render json: {
        "success": false
      } 
      return
    end
  end

end