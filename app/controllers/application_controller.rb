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

  def set_locale
    if params[:locale] === 'en'
      I18n.locale = params[:locale]
    else
      I18n.locale = I18n.default_locale
    end

  end

end
