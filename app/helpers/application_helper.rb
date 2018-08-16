module ApplicationHelper

  def sigin_url
    sso_host = Rails.configuration.sso_host
    client_id = Rails.application.secrets.sso[:client_id]
    www_host = Rails.configuration.www_host

    if sso_host.nil? || client_id.nil? || sso_host.blank? || client_id.blank?
      return "https://portal.qiniu.com/signin"
    end

    return Rails.configuration.sso_host + "?client_id=" + client_id + "&redirect_url=" + www_host
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

end
