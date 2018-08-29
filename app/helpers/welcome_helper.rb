module WelcomeHelper

  # 校验welcome/index页面 top_archives 发布信息字段
  def index_archive_publish_meta(archive)
    "#{ archive[:created_at].strftime("%Y-%m-%d") } 发布在 #{ Archive::CATEGORIES[archive.category] || "" }"
  end

  # 校验welcome/about页面 archives 发布信息字段
  def about_archive_publish_meta(archive)
    "发布在 #{ Archive::CATEGORIES[archive.category] || "" }"
  end
end