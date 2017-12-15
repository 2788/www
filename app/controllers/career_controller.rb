class CareerController < ApplicationController
  layout "career"

  def index
    @title = "招聘"
  end
  def social
    @title = "社会招聘"
    @tech_social_lists = Position.social.tech
    @market_social_lists = Position.social.market
    @product_social_lists = Position.social.product
    @design_social_lists = Position.social.design
    @sales_social_lists = Position.social.sales
    @office_social_lists = Position.social.office
  end
  def positions
    @title = "招聘岗位"
  end
  def school
    @title = "校园招聘"
    @tech_school_lists = Position.school.tech
    @market_school_lists = Position.school.market
    @product_school_lists = Position.school.product
    @design_school_lists = Position.school.design
    @sales_school_lists = Position.school.sales
    @office_school_lists = Position.school.office
  end
end
