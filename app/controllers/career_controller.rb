class CareerController < ApplicationController
  layout "career"

  def index
    @title = "招聘"
  end

  def social
    @title = "社会招聘"
    @social_positions = Position.social
  end

  def school
    @title = "校园招聘"
    @school_positions = Position.school
  end

  def position
    @position = Position.find(params[:id])
  end

end
