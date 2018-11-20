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

  def livequiz
  end

  def qavs
  end

  def edu
  end

  def ess
  end

  def ecs
  end

  def qvmfeeds
  end

  def censorfeeds
  end

  def censor
    @videoSrc_1 = "https://mars-assets.qnssl.com/Fi1UC6waXtXYCpnTGHa8XxIziGNk"
    @videoSrc_2 = "https://mars-assets.qnssl.com/Fos2uiHzcuvF6HZF3RarMp9J1ewZ"
    @videoSrc_3 = "https://mars-assets.qnssl.com/FgV6wvTgRv8ZgUZBecKojdIlfs58"
    @videoSrc_4 = "https://mars-assets.qnssl.com/lrBYuiLwg0zFRUP97w59FmmN6H01"
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
      body[:data][:uri] = 'https://mars-assets.qnssl.com/' + path
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
      body[:data][:uri] = 'https://mars-assets.qnssl.com/' + path
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

end