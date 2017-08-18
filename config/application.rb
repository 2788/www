require_relative 'boot'

require "rails"
# Pick the frameworks you want:
require "active_model/railtie"
require "active_job/railtie"
# require "active_record/railtie"
require "action_controller/railtie"
require "action_mailer/railtie"
require "action_view/railtie"
require "action_cable/engine"
require "sprockets/railtie"
require "rails/test_unit/railtie"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Official
  class Application < Rails::Application
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.

    # https://ruby-doc.org/stdlib-2.1.0/libdoc/logger/rdoc/Logger.html#method-c-new
    # shift_age:5, shift_size: 500M
    logger = Logger.new(File.join(Rails.root, "log", "#{Rails.env}.log"), 5, 1024 * 1024 * 500)

    config.logger = logger
    config.mongoid.logger = logger # Logger.new($stdout, :warn)

    config.action_dispatch.perform_deep_munge = false

    # Set Time.zone default to the specified zone and make Active Record auto-convert to this zone.
    # Run "rake -D time" for a list of tasks for finding time zone names. Default is UTC.
    # config.time_zone = 'Central Time (US & Canada)'
    config.time_zone = 'Beijing'

    # The default locale is :en and all translations from config/locales/*.rb,yml are auto loaded.
    config.i18n.load_path += Dir[Rails.root.join('my', 'locales', '*.{rb,yml}').to_s]
    config.i18n.default_locale = "zh-CN"

    config.exceptions_app = self.routes

    config.action_dispatch.default_headers.merge!({'X-Frame-Options' => 'Allow-From https://hm.baidu.com'})

    config.action_view.embed_authenticity_token_in_remote_forms = true
  end
end
