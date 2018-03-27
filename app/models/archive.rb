class Archive < ApplicationRecord

  paginates_per 5

  default_scope -> { where(:status => 'published', :deleted_at => nil).order(created_at: :desc) }

  scope :hot_sort,  -> { where(:is_hot => 1) }

  scope :top_sort,  -> { where(:is_top => 1) }

  scope :new_lists, -> { where(:category => 1) }

  scope :product_lists, -> { where(:category => 2) }

  scope :welfares_lists, -> { where(:category => 4) }

  CATEGORIES = {
    1 => "新闻动态",
    2 => "产品动态",
    3 => "客户案例",
    4 => "近期福利",
    5 => "技术实践",
    6 => "牛棚漫画",
    7 => "加入我们",
    8 => "NewTech 观察圈",
    9 => "其他分类"
  }

  def self.hot_archives
    hot = Archive.hot_sort.limit(3)
    return hot
  end

  def self.top_archives
    top = Archive.top_sort.limit(3)
    return top
  end

  def self.news_archives
    news = Archive.new_lists.limit(10)
    return news
  end

  def self.product_archives
    product_news = Archive.product_lists.limit(10)
    return product_news
  end

  def self.welfares_archives
    welfares = Archive.welfares_lists.limit(10)
    return welfares
  end

  def cover
    attributes["cover"].blank? ? "/archive-default-cover.png" : attributes["cover"]
  end

end
