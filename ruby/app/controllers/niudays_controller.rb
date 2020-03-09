class NiudaysController < ApplicationController
  layout "niuday"

  def index
    redirect_to(Rails.configuration.www_host, :status => 301)
  end

  def view
    redirect_to(Rails.configuration.www_host, :status => 301)
  end

  def xian
    redirect_to(Rails.configuration.www_host, :status => 301)
  end

  def shenzhen
    redirect_to(Rails.configuration.www_host, :status => 301)
  end

  def xiamen
    redirect_to(Rails.configuration.www_host, :status => 301)
  end

  def chengdu
    redirect_to(Rails.configuration.www_host, :status => 301)
  end

  def beijing
    redirect_to(Rails.configuration.www_host, :status => 301)
  end

end