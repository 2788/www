class ApplicationController < ActionController::Base
  # protect_from_forgery with: :exception
  protect_from_forgery with: :null_session

  # Get CDN X-Forwarded-For
  def client_ip
    x_forwarded_for = request.headers["Cdn-Src-Ip"] || request.headers["X-Forwarded-For"] || ""
    x_forwarded_for.split(",").first || request.remote_ip
  end
end
