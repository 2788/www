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

  DEPARTMENTSMAP = {
    "030001" => "网络加速部 (Fusion)",
    "030002" => "企业存储部(KODO)",
    "030003" => "容器计算部",
    "030004" => "直播业务部(PILI-VDN)",
    "030005" => "数据科学与产品部（Pandora）",
    "030006" => "人工智能实验室",
    "030007" => "视频播放器",
    "030008" => "工程效率部(Aslan)",
    "030009" => "运维部",
    "030010" => "服务线",
    "030011" => "企业服务",
    "030012" => "商业运营",
    "030013" => "人力资源部",
    "030014" => "财务部",
    "030015" => "行政部",
    "030016" => "采购部",
    "030017" => "市场部",
    "030018" => "政府事务部",
    "030019" => "销售部",
    "030020" => "战略管理中心",
    "030021" => "INF",
    "030024" => "金融行业产品部",
    "030025" => "政府行业产品部",
    "030026" => "专有存储部",
    "030027" => "富媒体",
    "030028" => "新媒体行业产品部"
  }

end
