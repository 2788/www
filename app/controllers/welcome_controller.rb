require "uri"
require 'net/http'
require 'json'

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

  def partner
  end

  def censor
    @videoSrc_1 = authorize_download_url("http://pbxwdyktb.bkt.clouddn.com/Fi1UC6waXtXYCpnTGHa8XxIziGNk")
    @videoSrc_2 = authorize_download_url("http://pbxwdyktb.bkt.clouddn.com/Fos2uiHzcuvF6HZF3RarMp9J1ewZ")
    @videoSrc_3 = authorize_download_url("http://pbxwdyktb.bkt.clouddn.com/FgV6wvTgRv8ZgUZBecKojdIlfs58")
    @videoSrc_4 = authorize_download_url("http://pbxwdyktb.bkt.clouddn.com/lrBYuiLwg0zFRUP97w59FmmN6H01")
  end

  # 生成下载授权
  def authorize_download_url(url)
    download_url = url
    # 授权期计算，设置为一分钟(60秒)
    e = Time.now.to_i + 60
    # URL变换：追加授权期参数
    download_url = "#{download_url}?e=#{e}"

    ### 生成数字签名
    encoded_sign = generate_encoded_sign(download_url)

    ### 生成下载授权凭证
    dntoken = "#{Rails.application.secrets.access_key}:#{encoded_sign}"

    ### 返回下载授权URL
    return "#{download_url}&token=#{dntoken}"
  end

  # 生成下载授权
  def authorize_download_url(url)
    download_url = url
    # 授权期计算，设置为一分钟(60秒)
    e = Time.now.to_i + 60
    # URL变换：追加授权期参数
    download_url = "#{download_url}?e=#{e}"

    ### 生成数字签名
    encoded_sign = generate_encoded_sign(download_url)

    ### 生成下载授权凭证
    dntoken = "#{Rails.application.secrets.atlab_acc_key}:#{encoded_sign}"

    ### 返回下载授权URL
    return "#{download_url}&token=#{dntoken}"
  end

  # 生成签名(base64编码后)
  def generate_encoded_sign(originStr)
    hmac_digest = OpenSSL::HMAC.digest(OpenSSL::Digest.new('sha1'), Rails.application.secrets.atlab_sec_key, originStr)
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
      }
    }

    if type == 'slide'
      body[:data][:uri] = authorize_download_url('http://pbxwdyktb.bkt.clouddn.com/' + path)
    elsif type == 'url'
      body[:data][:uri] = path
    end

    # 生成qiniu_token
    originStr = "POST " + uri.path + "\nHost: " + uri.host + "\nContent-Type: application/json\n\n"
    originStr += body.to_json.encode('UTF-8')
    encoded_sign = generate_encoded_sign(originStr)
    qiniu_token = "Qiniu #{Rails.application.secrets.atlab_acc_key}:#{encoded_sign}"

    header = {
      'Authorization' => qiniu_token,
      'Content-Type' => 'application/json'
    }

    request = Net::HTTP::Post.new(uri, header)
    request.body = body.to_json.encode('UTF-8')

    begin
      http = Net::HTTP.new(uri.host, uri.port)
      http.use_ssl = true
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
        p res.message
        render json: {
          result: nil
        }
        return
    end
  end

  # 视频审核
  def video_censor

    uri = URI.parse(Rails.configuration.video_audit_host + 'video_demo')

    path = params[:path]
    type = params[:type]

    body = {
      data: {
        uri: ''
      },
      ops: [{op: 'pulp'}, {op: 'terror'}, {op: 'politician'}]
    }

    if type == 'slide'
      body[:data][:uri] = authorize_download_url('http://pbxwdyktb.bkt.clouddn.com/' + path)
    elsif type == 'url'
      body[:data][:uri] = path
    end

    # 生成qiniu_token
    originStr = "POST " + uri.path + "\nHost: " + uri.host + "\nContent-Type: application/json\n\n"
    originStr += body.to_json.encode('UTF-8')

    encoded_sign = generate_encoded_sign(originStr)
    qiniu_token = "Qiniu #{Rails.application.secrets.atlab_acc_key}:#{encoded_sign}"

    header = {
      'Authorization' => qiniu_token,
      'Content-Type' => 'application/json'
    }

    request = Net::HTTP::Post.new(uri, header)
    request.body = body.to_json.encode('UTF-8')

    begin
      http = Net::HTTP.new(uri.host, uri.port)
      http.use_ssl = true
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
