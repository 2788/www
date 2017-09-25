class BlogController < ApplicationController
  layout "blog"

  before_action :getHot

  def index
    @q = Archive.ransack(title_or_summary_cont: params[:q])
    @archives = @q.result.page params[:page]
  end

  def archives
    @title = "archives"
    @archive = Archive.where(id: params[:id]).first
  end

  def author
    @archives = Archive.where(author: params[:author]).page params[:page]
    render "index"
  end

  def category
    @archives = Archive.where(category: params[:category]).page params[:page]
    render "index"
  end

  private

    def getHot
      @hot_archives = Archive.hot_archives
    end

end
