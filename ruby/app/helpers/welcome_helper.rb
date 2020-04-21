module WelcomeHelper

  # 校验welcome/index页面 top_archives 发布信息字段
  def index_archive_publish_meta(archive)
    "#{ archive[:created_at].strftime("%Y-%m-%d") } 发布在 #{ Archive::CATEGORIES[archive.category] || "" }"
  end

  # 校验welcome/about页面 archives 发布信息字段
  def about_archive_publish_meta(archive)
    "发布在 #{ Archive::CATEGORIES[archive.category] || "" }"
  end

  def index_dynamic_banner(banner)
    if banner.nil? || banner.blank?
      return raw("")
    end

    jump_link = banner["link"]
    banner_str = "<div class='jumbotron hero' title=#{ banner["title"] || "" } style='background-image: url(#{ banner["image_src"] });'></div>"
    if jump_link.nil? || jump_link.blank?
      return raw(banner_str)
    end

    return raw(
      "<a class='dynamic-banner-link' href=#{ jump_link || "" } title=#{ banner["title"] || "" } target='_blank'>
        #{ banner_str }
      </a>"
    )
  end

  def index_dynamic_advert(advert)
    if advert.nil? || advert.blank?
      return raw("")
    end

    subscript_str = ""
    if advert["subscript_name"].nil? == false && advert["subscript_name"].blank? == false
      subscript_str = (
        "<span class='advert-tip' style='background-color: #{ advert["subscript_color"] || "#FF5928" }'>
          #{ advert["subscript_text"] || "NEW" }
        </span>"
      )
    end

    jump_link = advert["url"]
    advert_str = (
      "<div class='advert-body'>
        <h4 class='advert-heading'>
          #{ advert["title"] || "" }#{ subscript_str }
        </h4>
        <p class='hidden-xs'>
          #{ advert["subtitle"] || "" }
        </p>
      </div>"
    )
    if jump_link.nil? || jump_link.blank?
      return raw("<td title=#{ advert["subtitle"] || "" }>#{ advert_str }</td>")
    end

    return raw(
      "<td title=#{ advert["subtitle"] || "" }>
        <a class='dynamic-advert-link' href=#{ jump_link || "" } target='_blank'>
          #{ advert_str }
        </a>
      </td>"
    )
  end
end
