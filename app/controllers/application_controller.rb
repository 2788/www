class ApplicationController < ActionController::Base
  # set language
  before_action :set_locale

  # protect_from_forgery with: :exception
  protect_from_forgery with: :null_session

  # Get CDN X-Forwarded-For
  def client_ip
    x_forwarded_for = request.headers["Cdn-Src-Ip"] || request.headers["X-Forwarded-For"] || ""
    x_forwarded_for.split(",").first || request.remote_ip
  end

  def default_url_options
    if I18n.locale == :"zh-CN"
      { locale: nil }
    else
      { locale: I18n.locale }
    end
  end

  def set_locale
    I18n.locale = params[:locale] || I18n.default_locale
  end

  # 根据 _editor_token 获取 current_editor
  def current_editor
    editor_token = cookies[:_editor_token]
    if editor_token.blank?
      return nil
    end

    username, token = Base64.decode64(editor_token).split(":")
    username = Base64.decode64(username)

    if token == OpenSSL::HMAC.hexdigest(OpenSSL::Digest.new('sha512'), "9386e468ba84c46f29c524d0624104303853734a", username)
      username
    else
      nil
    end
  end

  helper_method :current_editor

end
