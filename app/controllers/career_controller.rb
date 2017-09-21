class CareerController < ApplicationController
  layout "career"

  def index
  end
  def social
    @title = "social"
  end
  def positions
    @title = "positions"
  end
  def school
    @title = "school"
  end
end
