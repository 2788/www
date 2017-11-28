require "uri"
require 'net/http'
require 'json'

class UserinfoController < ActionController::Base
  # protect_from_forgery with: :exception
  protect_from_forgery with: :null_session

  def userinfo
      sso_host = Rails.configuration.sso_host
      client_id = Rails.application.secrets.sso[:client_id]
      if sso_host.nil? || client_id.nil? || sso_host.blank? || client_id.blank?
        render json: {
          "can_use": false, 
        }
        return
      end
  
         
      cookie_value = cookies[:SSID]
      if cookie_value.blank?
        render json: {
          "is_signin": false, 
        }
        return
      end

      store_ssid = session[:SSID]
      cookie_ssid = get_ssid(cookie_value, Rails.application.secrets.sso[:cookie_secret])
      if cookie_ssid.blank?
        render json: {
          "is_signin": false, 
        }
        return
      end
          
      # 如果cookie里面的 ssid 跟存起来的session 里面的ssid相同，那么说明这个ssid已经登录过了。 所以可以直接拿session里面的用户信息
      if store_ssid == cookie_ssid
        uinfo = session[:uinfo]
        render json: {
            "email": uinfo["email"],
            "name": uinfo["name"],
            "is_signin": true,
        }
        return
      end

      token = get_admin_token()
      if token.nil?
        render json: {
          "is_signin": false,
        }
        return
      end


      uinfo = get_uinfo(token, cookie_ssid)
      if uinfo.nil?
        render json: {
          "is_signin": false,
        }
        return
      end


      session[:SSID] = cookie_ssid
      session[:uinfo] = uinfo
      render json: {
          "email": uinfo["email"],
          "name": uinfo["name"],
          "is_signin": true,
      }
  end

  def get_ssid(value, secret)        
      vValues = value.tr('-_','+/').unpack('m')[0]
      vRaw, vCreated, vHash = vValues.split(",")
      vRaw = URI.escape(vRaw)
      hash_ = OpenSSL::HMAC.hexdigest(OpenSSL::Digest.new('sha512'), secret, vRaw+vCreated)
      if hash_ != vHash
          return ""
      end
      return vRaw
  end

  def get_admin_token
      admin_username = Rails.application.secrets.admin[:username]
      admin_password = Rails.application.secrets.admin[:password]
         
      begin
          res = Net::HTTP.post_form(URI.parse(Rails.configuration.acc_host+"/oauth2/token"),
                                    {'grant_type' => 'password', 'username' => admin_username, 'password' => admin_password})
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

  def get_uinfo(token, ssid)
       
      access_token = token["access_token"]
      client_id = Rails.application.secrets.sso[:client_id]
      uri = URI.parse(Rails.configuration.sso_host+"/uinfo/session?client_id="+client_id+"&ssid="+ssid)
      req = Net::HTTP::Get.new(uri)
      req["Authorization"] = "Bearer " + access_token

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
end
