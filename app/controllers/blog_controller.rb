class BlogController < ApplicationController
  layout "blog"

  def index
    @archives = Archive.page
  end
  def archives
    @title = "archives"
  end
end
