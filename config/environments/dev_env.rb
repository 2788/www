Rails.application.configure do
  # Settings specified here will take precedence over those in config/application.rb.

  # Code is not reloaded between requests.
  config.cache_classes = true

  # Eager load code on boot. This eager loads most of Rails and
  # your application in memory, allowing both threaded web servers
  # and those relying on copy on write to perform better.
  # Rake tasks automatically ignore this option for performance.
  config.eager_load = true

  # Full error reports are disabled and caching is turned on.
  config.consider_all_requests_local       = false
  config.action_controller.perform_caching = true

  # Disable serving static files from the `/public` folder by default since
  # Apache or NGINX already handles this.
  config.public_file_server.enabled = ENV['RAILS_SERVE_STATIC_FILES'].present?

  # Compress JavaScripts and CSS.
  config.assets.js_compressor = :uglifier
  # config.assets.css_compressor = :sass

  # Do not fallback to assets pipeline if a precompiled asset is missed.
  config.assets.compile = false

  # `config.assets.precompile` and `config.assets.version` have moved to config/initializers/assets.rb

  # Enable serving of images, stylesheets, and JavaScripts from an asset server.
  # config.action_controller.asset_host = 'http://assets.example.com'

  # Specifies the header that your server uses for sending files.
  # config.action_dispatch.x_sendfile_header = 'X-Sendfile' # for Apache
  # config.action_dispatch.x_sendfile_header = 'X-Accel-Redirect' # for NGINX

  # Mount Action Cable outside main process or domain
  # config.action_cable.mount_path = nil
  # config.action_cable.url = 'wss://example.com/cable'
  # config.action_cable.allowed_request_origins = [ 'http://example.com', /http:\/\/example.*/ ]

  # Force all access to the app over SSL, use Strict-Transport-Security, and use secure cookies.
  # config.force_ssl = true

  # Use the lowest log level to ensure availability of diagnostic information
  # when problems arise.
  config.log_level = :debug

  # Prepend all log lines with the following tags.
  config.log_tags = [ :request_id ]

  # Use a different cache store in production.
  # config.cache_store = :mem_cache_store

  # Use a real queuing backend for Active Job (and separate queues per environment)
  # config.active_job.queue_adapter     = :resque
  # config.active_job.queue_name_prefix = "official_#{Rails.env}"
  config.action_mailer.perform_caching = false

  # Ignore bad email addresses and do not raise email delivery errors.
  # Set this to true and configure the email server for immediate delivery to raise delivery errors.
  # config.action_mailer.raise_delivery_errors = false

  # Enable locale fallbacks for I18n (makes lookups for any locale fall back to
  # the I18n.default_locale when a translation cannot be found).
  config.i18n.fallbacks = true

  # Send deprecation notices to registered listeners.
  config.active_support.deprecation = :notify

  # Use default logging formatter so that PID and timestamp are not suppressed.
  config.log_formatter = ::Logger::Formatter.new

  # Use a different logger for distributed setups.
  # require 'syslog/logger'
  # config.logger = ActiveSupport::TaggedLogging.new(Syslog::Logger.new 'app-name')

  config.acc_host = 'http://acc.dev.qiniu.io'
  config.sso_host = 'https://sso-dev.qiniu.io'
  config.www_host = 'http://www-dev.qiniu.io'
  config.blog_host = 'http://blog-dev.qiniu.io'
  config.career_host = 'http://career-dev.qiniu.io'
  config.portal_host = 'http://portalv4.dev.qiniu.io'
  config.gaea_admin_host = 'http://bo-gaea-admin-koderover-staging-bo.cs-spock.cloudappl.com'
  config.qvm_host = 'http://qvm-admin.dev.qiniu.io'

  # 2018 年 1024 活动热度计算配置
  # https://jira.qiniu.io/browse/BO-5294
  config.event1024 = {
    start_time: {
      year: 2018,
      month: 10,
      date: 24
    },
    end_time: {
      year: 2018,
      month: 10,
      date: 28
    },
    expired_time: {
      year: 2018,
      month: 11,
      date: 10
    }
  }

  # 2018 年 qvm 双十一活动时间配置
  # https://jira.qiniu.io/browse/BO-5517
  config.double11 = {
    start_time: {
      year: 2018,
      month: 11,
      date: 10
    },
    end_time: {
      year: 2019,
      month: 2,
      date: 1
    }
  }

  # qvmsumsale 限量机型每天开抢时间
  config.qvmsumsale = {
    start_hour: "10",
    start_minute: "0"
  }

  # 2019 年 618 活动结束时间
  # https://jira.qiniu.io/browse/BO-7519
  config.bigpromotion = {
    end_year: 2019,
    end_month: 7,
    end_date: 1
  }

  # 2019 年 1024 活动结束时间
  # https://jira.qiniu.io/browse/BO-9137
  config.zelda = {
    end_year: 2019,
    end_month: 11,
    end_date: 7
  }

  # 2019 年 1111 活动结束时间
  config.double11_2019 = {
    end_year: 2019,
    end_month: 12,
    end_date: 12
  }

  config.img_audit_host = 'http://ai.qiniuapi.com/v3/image/censor'
  config.video_audit_host = 'http://ai.qiniuapi.com/v3/video/censor'
  config.video_jobs_host = 'http://ai.qiniuapi.com/v3/jobs/video'

  if ENV["RAILS_LOG_TO_STDOUT"].present?
    logger           = ActiveSupport::Logger.new(STDOUT)
    logger.formatter = config.log_formatter
    config.logger = ActiveSupport::TaggedLogging.new(logger)
  end

  config.paths['config/database'] = ["../www_database.yml"]
  config.paths['config/secrets'] = ["../www_secrets.yml"]
  Mongoid.load!("../www_mongoid.yml")
end
