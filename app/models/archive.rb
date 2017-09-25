class Archive < ApplicationRecord

  paginates_per 5

  default_scope -> { order(created_at: :desc) }

  scope :hot_sort,  -> { where(:is_hot => 1) }

  CATEGORIES = {
    1 => "新闻动态",
    2 => "产品动态",
    3 => "客户案例",
    4 => "近期福利",
    5 => "技术实践",
    6 => "牛棚漫画",
    7 => "加入我们",
  }

  def self.hot_archives
    hot = Archive.hot_sort.limit(3)
    return hot
  end

end
