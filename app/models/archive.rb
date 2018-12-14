class Archive < ApplicationRecord

  paginates_per 5
  
  # BO-5655 修改官网博文查询条件
  # status 条件根据 current_editor 值进行判断
  # https://jira.qiniu.io/browse/BO-5655
  # default_scope -> { where(:status => 'published', :deleted_at => nil).order(created_at: :desc) }
  default_scope -> { where(:deleted_at => nil).order(created_at: :desc) }

  scope :hot_sort, -> { where(:is_hot => 1) }

  scope :top_sort, -> { where(:is_top => 1) }

  scope :new_lists, -> { where(:category => 1) }

  scope :product_lists, -> { where(:category => 2) }

  scope :welfares_lists, -> { where(:category => 4) }

  CATEGORIES = {
    1 => "新闻动态",
    2 => "产品动态",
    3 => "客户案例",
    4 => "近期福利",
    5 => "技术实践",
    51 => '大数据',
    52 => '人工智能',
    53 => '容器云',
    54 => '基础设施',
    55 => '音视频',
    56 => 'Go 语言',
    6 => "牛棚漫画",
    7 => "加入我们",
    9 => "其他相关"
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
    # news = Archive.new_lists.limit(10)
    news = Archive.new_lists
    return news
  end

  def self.product_archives
    # product_news = Archive.product_lists.limit(10)
    product_news = Archive.product_lists
    return product_news
  end

  def self.welfares_archives
    # welfares = Archive.welfares_lists.limit(10)
    welfares = Archive.welfares_lists
    return welfares
  end

  def cover
    attributes["cover"].blank? ? "/archive-default-cover.png" : attributes["cover"]
  end

end
