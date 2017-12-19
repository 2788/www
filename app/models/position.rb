class Position < ApplicationRecord

  default_scope -> { where(:status => 'published', :deleted_at => nil).order(created_at: :desc) }

  scope :social, -> { where(:on_campus => 0) }

  scope :school, -> { where(:on_campus => 1) }

  scope :tech, -> { where(:category => 1) }

  scope :market, -> { where(:category => 2) }

  scope :product, -> { where(:category => 3) }

  scope :design, -> { where(:category => 4) }

  scope :sales, -> { where(:category => 5) }

  scope :office, -> { where(:category => 6) }

  CATEGORIES = {
    1 => "技术",
    2 => "市场",
    3 => "产品",
    4 => "设计",
    5 => "销售",
    6 => "职能",
  }

end
