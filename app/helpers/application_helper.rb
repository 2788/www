require "uri"
require 'net/http'
require 'json'

module ApplicationHelper

    def is_signin?
        !cookies[:SSID].blank?
    end

    def get_userinfo
        sso_host = Rails.configuration.sso_host
        client_id = Rails.application.secrets.sso["client_id"]
        if sso_host == "" || client_id == ""
            return nil
        end

        cookie_value = cookies[:SSID]
        if cookie_value.blank?
            return nil
        end

        store_ssid = session[:SSID]
        cookie_ssid = get_ssid(cookie_value, Rails.application.secrets.sso["cookie_secret"])
        if cookie_ssid.blank?
            return nil
        end
            
        logout_url = Rails.configuration.sso_host+"/signout"

        # 如果cookie里面的 ssid 跟存起来的session 里面的ssid相同，那么说明这个ssid已经登录过了。 所以可以直接拿session里面的用户信息
        if store_ssid == cookie_ssid
            uinfo = session[:uinfo]
            return {
                "email" => uinfo["email"],
                "logout_url" => logout_url,
                "name" => uinfo["name"],
            }
        end

        token = get_admin_token()
        if token.nil?
            return nil
        end

        uinfo = get_uinfo(token, cookie_ssid)
        if uinfo.nil?
            return nil
        end

        session[:SSID] = cookie_ssid
        session[:uinfo] = uinfo
        return {
            "email" => uinfo["email"],
            "logout_url" => logout_url,
            "name" => uinfo["name"],
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
        admin_username = Rails.application.secrets.admin["username"]
        admin_password = Rails.application.secrets.admin["password"]
           
        begin
            res = Net::HTTP.post_form(URI.parse(Rails.configuration.acc_host+"/oauth2/token"),
                                      {'grant_type' => 'password', 'username' => admin_username, 'password' => admin_password})
        rescue Timeout::Error, Errno::EINVAL, Errno::ECONNRESET, EOFError, Net::HTTPBadResponse, Net::HTTPHeaderSyntaxError, Net::ProtocolError => e
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
        client_id = Rails.application.secrets.sso["client_id"]
        uri = URI.parse(Rails.configuration.sso_host+"/uinfo/session?client_id="+client_id+"&ssid="+ssid)
        req = Net::HTTP::Get.new(uri)
        req["Authorization"] = "Bearer " + access_token

        begin 
            res = Net::HTTP.start(uri.hostname, uri.port) {|http|
              http.request(req)
            }
        rescue Timeout::Error, Errno::EINVAL, Errno::ECONNRESET, EOFError, Net::HTTPBadResponse, Net::HTTPHeaderSyntaxError, Net::ProtocolError => e
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

    def sigin_url
        sso_host = Rails.configuration.sso_host
        client_id = Rails.application.secrets.sso["client_id"]

        if sso_host == "" || client_id == ""
            return "https://portal.qiniu.com/signin"
        end

        return Rails.configuration.sso_host+"?client_id="+client_id+"&redirect_path=/"
    end
end
