class ErrorsController < ApplicationController

  def not_found
    if params["go-get"] == "1"
      render formats: :html, status: 200
    else
      render formats: :html, status: 404
    end
  end

  def internal_server_error
    render formats: :html, status: 500
  end

end
