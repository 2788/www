class BlogController < ApplicationController
  layout "blog"

  before_action :getHot

  def index
    @title = "博客"
    @q = Archive.ransack(title_or_summary_cont: params[:q])
    @archives = @q.result.page params[:page]
  end

  def archives
    @archive = Archive.where(id: params[:id]).first
    @title = @archive[:title]
  end

  def author
    @archives = Archive.where(author: params[:author]).page params[:page]
    @title = "博客"
    render "index"
  end

  def category
    @archives = Archive.where(category: params[:category]).page params[:page]
    @title = "博客"
    render "index"
  end

  private

    def getHot
      @hot_archives = Archive.hot_archives
    end

end
