module WelcomeHelper

  # 校验welcome/index页面 top_archives 发布信息字段
  def archive_publish_meta(archive)
    "#{ archive[:created_at].strftime("%Y-%m-%d") } 发布在 #{ Archive::CATEGORIES[archive.category] || "" }"
  end

end