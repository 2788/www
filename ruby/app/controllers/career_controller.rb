class CareerController < ApplicationController
  layout "career"

  def index
    @title = "招聘"
  end

  def social
    # @title = "社会招聘"
    # @social_positions = Position.social
    redirect_to("https://jobs.qiniu.com/", :status => 301)
  end

  def school
    # @title = "校园招聘"
    # @school_positions = Position.school
    redirect_to("https://campus.qiniu.com/", :status => 301)
  end

  def position
    @position = Position.find(params[:id])
  end

end
