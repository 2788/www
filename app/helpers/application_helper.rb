module ApplicationHelper

  def signin_url(host, path)
    sso_host = Rails.configuration.sso_host
    client_id = Rails.application.secrets.sso[:client_id]
    site_host = ''

    if host == 'www'
      site_host = Rails.configuration.www_host
    elsif host == 'blog'
      site_host = Rails.configuration.blog_host
    elsif host == 'career'
      site_host = Rails.configuration.career_host
    end

    if sso_host.nil? || client_id.nil? || sso_host.blank? || client_id.blank?
      return "https://portal.qiniu.com/signin"
    end

    return Rails.configuration.sso_host + "?client_id=" + client_id + "&redirect_url=" + site_host + path
  end

  def signout_url
    sso_host = Rails.configuration.sso_host
    if sso_host.nil? || sso_host.blank?
      return "https://sso.qiniu.com/signout"
    end

    return sso_host + "/signout"
  end

  def signup_url
    portal_host = Rails.configuration.portal_host
    if portal_host.nil? || portal_host.blank?
      return "https://portal.qiniu.com/signup"
    end
    return portal_host + "/signup"
  end

  # <meta name="go-import" content="qiniu.com/<package> git https://github.com/qbox/<package>">
  def meta_go_import
    paths = request.original_fullpath.split('?').first

    if paths.blank?
      return
    end

    package = paths.split('/').reject { |c| c.empty? }.first

    if package.blank?
      return
    end

    tag("meta", name: "go-import", content: "qiniu.com/#{package} git https://github.com/qbox/#{package}") +
    tag("meta", name: "go-source", content: "qiniu.com/#{package} https://github.com/qbox/#{package}/ https://github.com/qbox/#{package}/tree/master{/dir} https://github.com/qbox/#{package}/blob/master{/dir}/{file}#L{line}")
  end

  def is_1024event_on
    # 1024 活动页面 banner 添加定时显示功能
    # https://jira.qiniu.io/browse/BO-5294
    is1024EventBegin = false
    # 判断日期配置是否有效
    date_conf = is_date_conf_valid()
    if !date_conf.nil?
      # 当前时间
      current_time = Time.now
      # 从配置文件中读取的 1024 活动开始时间
      start_time = Time.local(date_conf[:start_time][:year], date_conf[:start_time][:month], date_conf[:start_time][:date])
      # 从配置文件中读取的 1024 活动过期时间
      expired_time = Time.local(date_conf[:expired_time][:year], date_conf[:expired_time][:month], date_conf[:expired_time][:date])
      if current_time.to_i >= start_time.to_i && current_time.to_i < expired_time.to_i
        is1024EventBegin = true
      end
    end
    return is1024EventBegin
  end

  # 判断 1024 活动的时间配置是否有效
  def is_date_conf_valid
    res_date_conf = nil
    if Rails.configuration.event1024.nil? || Rails.configuration.event1024.blank?
      return res_date_conf
    end

    date_conf = Rails.configuration.event1024
    if date_conf.nil? || date_conf.blank?
      return res_date_conf
    end
    start_time = date_conf[:start_time]
    if start_time.nil? || start_time.blank?
      return res_date_conf
    end

    end_time = date_conf[:end_time]
    if end_time.nil? || end_time.blank?
      return res_date_conf
    end

    expired_time = date_conf[:expired_time]
    if expired_time.nil? || expired_time.blank?
      return res_date_conf
    end

    if start_time[:year].nil? || start_time[:year].blank? || start_time[:month].nil? || start_time[:month].blank? || start_time[:date].nil? || start_time[:date].blank?
      return res_date_conf
    end

    if end_time[:year].nil? || end_time[:year].blank? || end_time[:month].nil? || end_time[:month].blank? || end_time[:date].nil? || end_time[:date].blank?
      return res_date_conf
    end

    if expired_time[:year].nil? || expired_time[:year].blank? || expired_time[:month].nil? || expired_time[:month].blank? || expired_time[:date].nil? || expired_time[:date].blank?
      return res_date_conf
    end

    res_date_conf = {
      "start_time": {
        "year": start_time[:year].to_i,
        "month": start_time[:month].to_i,
        "date": start_time[:date].to_i
      },
      "end_time": {
        "year": end_time[:year].to_i,
        "month": end_time[:month].to_i,
        "date": end_time[:date].to_i
      },
      "expired_time": {
        "year": expired_time[:year].to_i,
        "month": expired_time[:month].to_i,
        "date": expired_time[:date].to_i
      }
    }

    return res_date_conf
  end

  def is_double11_on
    # 2018 年 qvm 双十一活动定时显示
    # https://jira.qiniu.io/browse/BO-5517
    isDouble11Begin = false
    date_conf = is_double11_conf_valid()
    if !date_conf.nil?
      # 当前时间
      current_time = Time.now
      # 从配置文件中读取的 qvm 双十一活动开始时间
      start_time = Time.local(date_conf[:start_time][:year], date_conf[:start_time][:month], date_conf[:start_time][:date])
      # 从配置文件中读取的 qvm 双十一活动过期时间
      end_time = Time.local(date_conf[:end_time][:year], date_conf[:end_time][:month], date_conf[:end_time][:date])
      if current_time.to_i >= start_time.to_i && current_time.to_i < end_time.to_i
        isDouble11Begin = true
      end
    end
    return isDouble11Begin
  end

  # 判断 qvm 双十一活动的时间配置是否有效
  def is_double11_conf_valid
    res_date_conf = nil
    if Rails.configuration.double11.nil? || Rails.configuration.double11.blank?
      return res_date_conf
    end

    date_conf = Rails.configuration.double11
    if date_conf.nil? || date_conf.blank?
      return res_date_conf
    end
    start_time = date_conf[:start_time]
    if start_time.nil? || start_time.blank?
      return res_date_conf
    end

    end_time = date_conf[:end_time]
    if end_time.nil? || end_time.blank?
      return res_date_conf
    end

    if start_time[:year].nil? || start_time[:year].blank? || start_time[:month].nil? || start_time[:month].blank? || start_time[:date].nil? || start_time[:date].blank?
      return res_date_conf
    end

    if end_time[:year].nil? || end_time[:year].blank? || end_time[:month].nil? || end_time[:month].blank? || end_time[:date].nil? || end_time[:date].blank?
      return res_date_conf
    end

    res_date_conf = {
      "start_time": {
        "year": start_time[:year].to_i,
        "month": start_time[:month].to_i,
        "date": start_time[:date].to_i
      },
      "end_time": {
        "year": end_time[:year].to_i,
        "month": end_time[:month].to_i,
        "date": end_time[:date].to_i
      }
    }

    return res_date_conf
  end
end
