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

end
