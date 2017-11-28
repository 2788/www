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
end
