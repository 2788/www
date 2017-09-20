class BlogController < ApplicationController
  layout "blog"

  def index
  end
  def archives
    @title = "archives"  
  end
end
