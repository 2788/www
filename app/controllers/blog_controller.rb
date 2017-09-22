class BlogController < ApplicationController
  layout "blog"

  before_action :getHot

  def index
    @archives = Archive.page
  end

  def archives
    @title = "archives"
    @archive = Archive.where(id: params[:id]).first
  end

  def author
    @archives = Archive.where(author: params[:author]).page
    render "index"
  end

  def category
    @archives = Archive.where(category: params[:category]).page
    render "index"
  end

  private

    def getHot
      @hot_archives = Archive.hot_archives
    end

end
