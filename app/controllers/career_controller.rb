class CareerController < ApplicationController
  layout "career"

  def index
    @title = "招聘"
  end
  def social
    @title = "社会招聘"
  end
  def positions
    @title = "招聘岗位"
  end
  def school
    @title = "校园招聘"
  end
end
