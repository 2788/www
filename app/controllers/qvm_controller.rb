require 'net/http'
require 'time'
require 'securerandom'
require 'uri'
require 'base64'
require 'hmac-sha1'
require 'json'

class QvmController < ApplicationController

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
    query[:Signature] = compute_signature("POST", query)

    uri = URI(endpoint_url)
    uri.query = URI.encode_www_form(query)
    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = (uri.scheme == "https")
    http.verify_mode = OpenSSL::SSL::VERIFY_NONE

    header = {
      'Content-Type' => 'application/json'
    }
    request = Net::HTTP::Post.new(uri.request_uri, header)
    request.body = params["qvm"].to_json.encode("UTF-8")

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

  #compute the signature of the parameters String
  def compute_signature(method, params)
    
    sorted_keys = params.keys.sort

    canonicalized_query_string = ""

    canonicalized_query_string = sorted_keys.map {|key|
      "%s=%s" % [safe_encode(key.to_s), safe_encode(params[key])]
    }.join("&")

    length = canonicalized_query_string.length

    string_to_sign = method + "&" + safe_encode('/') + "&" + safe_encode(canonicalized_query_string)

    signature = calculate_signature Rails.application.secrets.qvm_secret_key+"&", string_to_sign
  end

  #calculate the signature
  def calculate_signature key, string_to_sign
    hmac = HMAC::SHA1.new(key)
    hmac.update(string_to_sign)
    signature = Base64.encode64(hmac.digest).gsub("\n", '')
    signature
  end

  #encode the value to aliyun's requirement
  def safe_encode value
    value = URI.encode_www_form_component(value).gsub(/\+/,'%20').gsub(/\*/,'%2A').gsub(/%7E/,'~')
  end

end