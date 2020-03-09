class BlogController < ApplicationController
  layout "blog"

  before_action :getHot

  def index
    @title = "博客"
    # @q = Archive.ransack(title_or_summary_cont: params[:q])
    # @archives = @q.result.page params[:page]
    redirect_to(:action => 'category', :category => '5')
  end

  def all
    @title = "博客"
    # @q = Archive.ransack(title_or_summary_cont: params[:q])
    # 根据 current_editor 判断查询条件
    if current_editor.nil? == false
      @q = Archive.where(status: ['published', 'offline', 'draft']).ransack(title_or_summary_cont: params[:q])
    else
      @q = Archive.where(status: 'published').ransack(title_or_summary_cont: params[:q])
    end
    @archives = @q.result.page params[:page]
    render "index"
  end

  def archives
    # @archive = Archive.find(params[:id])
    # 根据 current_editor 判断查询条件
    if current_editor.nil? == false
      @archive = Archive.where(status: ['published', 'offline', 'draft']).find(params[:id])
    else
      @archive = Archive.where(status: 'published').find(params[:id])
    end
    @title = @archive[:title]
  end

  def author
    # @archives = Archive.where(author: params[:author]).page params[:page]
    # 根据 current_editor 判断查询条件
    if current_editor.nil? == false
      @archives = Archive.where(status: ['published', 'offline', 'draft'], author: params[:author]).page params[:page]
    else
      @archives = Archive.where(status: 'published', author: params[:author]).page params[:page]
    end
    @title = "博客"
    render "index"
  end

  def category
    category = params[:category]
    if category == "5"
      category = [5, 51, 52, 53, 54, 55, 56]
    end
    # @archives = Archive.where(category: category).page params[:page]
    # 根据 current_editor 判断查询条件
    if current_editor.nil? == false
      @archives = Archive.where(status: ['published', 'offline', 'draft'], category: category).page params[:page]
    else
      @archives = Archive.where(status: 'published', category: category).page params[:page]
    end
    @title = "博客"
    render "index"
  end

  private

    def getHot
      # @hot_archives = Archive.hot_archives
      # 根据 current_editor 判断查询条件
      if current_editor.nil? == false
        @hot_archives = Archive.where(status: ['published', 'offline', 'draft']).hot_archives
      else
        @hot_archives = Archive.where(status: 'published').hot_archives
      end
    end

end
