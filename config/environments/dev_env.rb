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

  # 2019 年 1212 活动结束时间
  config.double12_2019 = {
    end_year: 2020,
    end_month: 1,
    end_date: 15
  }

  config.double12_2019_comb_package = [{
    "type": "comb-pack-1",
    "title": "新手上路包",
    "durations": [{
      "value": 6,
      "text": "6个月"
    },{
      "value": 3,
      "text": "3个月"
    },{
      "value": 1,
      "text": "1个月"
    }],
    "packages": [{
      "index": "一",
      "product": "kodo",
      "title": "国内标准存储空间",
      "capacity": "2000（GB/月）"
    },{
      "index": "二",
      "product": "fusion",
      "title": "国内CDN流量（不可结转）",
      "capacity": "10000（GB/月）"
    }]
  },{
    "type": "comb-pack-2",
    "title": "打怪升级包",
    "durations": [{
      "value": 6,
      "text": "6个月"
    },{
      "value": 3,
      "text": "3个月"
    },{
      "value": 1,
      "text": "1个月"
    }],
    "packages": [{
      "index": "一",
      "product": "kodo",
      "title": "国内标准存储空间",
      "capacity": "2000（GB/月）"
    },{
      "index": "二",
      "product": "fusion",
      "title": "国内CDN流量（不可结转）",
      "capacity": "10000（GB/月）"
    },{
      "index": "三",
      "product": "sms",
      "title": "系统短信（不可结转）",
      "capacity": "1000（条/月）"
    }]
  },{
    "type": "comb-pack-3",
    "title": "所向披靡包",
    "durations": [{
      "value": 12,
      "text": "12个月"
    },{
      "value": 6,
      "text": "6个月"
    },{
      "value": 3,
      "text": "3个月"
    }],
    "packages": [{
      "index": "一",
      "product": "kodo",
      "title": "国内标准存储空间",
      "capacity": "5000（GB/月）"
    },{
      "index": "二",
      "product": "fusion",
      "title": "国内CDN流量（不可结转）",
      "capacity": "20000（GB/月）"
    },{
      "index": "三",
      "product": "pili",
      "title": "国内直播流量（不可结转）",
      "capacity": "10000（GB/月）"
    },{
      "index": "四",
      "product": "sdk",
      "title": "基础版SDK",
      "capacity": "一年 license"
    }]
  },{
    "type": "comb-pack-4",
    "title": "最强王者包",
    "durations": [{
      "value": 12,
      "text": "12个月"
    },{
      "value": 6,
      "text": "6个月"
    },{
      "value": 3,
      "text": "3个月"
    }],
    "packages": [{
      "index": "一",
      "product": "kodo",
      "title": "国内标准存储空间",
      "capacity": "5000（GB/月）"
    },{
      "index": "二",
      "product": "fusion",
      "title": "国内CDN流量（不可结转）",
      "capacity": "20000（GB/月）"
    },{
      "index": "三",
      "product": "pili",
      "title": "国内直播流量（不可结转）",
      "capacity": "10000（GB/月）"
    },{
      "index": "四",
      "product": "sdk",
      "title": "基础版SDK",
      "capacity": "一年 license"
    },{
      "index": "五",
      "product": "sms",
      "title": "系统短信（不可结转）",
      "capacity": "5000（条/月）"
    }]
  }]

  config.double12_2019_comb_pack_info = {
    "comb-pack-1": {
      "duration-1": {
        "price": "1890",
        "origin-price": "2691.59",
        "diff-price": "801.59",
        "ids": {
          "z0http": 166,
          "z0https": "1-1-z0https",
          "z1http": "1-1-z1http",
          "z1https": "1-1-z1https",
          "z3http": 167,
          "z3https": "1-1-z3https"
        }
      },
      "duration-3": {
        "price": "5556.6",
        "origin-price": "8074.77",
        "diff-price": "2518.17",
        "ids": {
          "z0http": "1-3-z0http",
          "z0https": "1-3-z0https",
          "z1http": "1-3-z1http",
          "z1https": "1-3-z1https",
          "z3http": "1-3-z3http",
          "z3https": "1-3-z3https"
        }
      },
      "duration-6": {
        "price": "10886.4",
        "origin-price": "16149.54",
        "diff-price": "5263.14",
        "ids": {
          "z0http": "1-6-z0http",
          "z0https": "1-6-z0https",
          "z1http": "1-6-z1http",
          "z1https": "1-6-z1https",
          "z3http": "1-6-z3http",
          "z3https": 168
        }
      }
    },
    "comb-pack-2": {
      "duration-1": {
        "price": "1920",
        "origin-price": "2734.59",
        "diff-price": "814.59",
        "ids": {
          "z0http": "2-1-z0http",
          "z0https": "2-1-z0https",
          "z1http": 169,
          "z1https": "2-1-z1https",
          "z3http": "2-1-z3http",
          "z3https": "2-1-z3https"
        }
      },
      "duration-3": {
        "price": "5646.6",
        "origin-price": "8203.77",
        "diff-price": "2557.17",
        "ids": {
          "z0http": "2-3-z0http",
          "z0https": "2-3-z0https",
          "z1http": "2-3-z1http",
          "z1https": "2-3-z1https",
          "z3http": "2-3-z3http",
          "z3https": "2-3-z3https"
        }
      },
      "duration-6": {
        "price": "11066.4",
        "origin-price": "16407.54",
        "diff-price": "5341.14",
        "ids": {
          "z0http": "2-6-z0http",
          "z0https": "2-6-z0https",
          "z1http": "2-6-z1http",
          "z1https": "2-6-z1https",
          "z3http": "2-6-z3http",
          "z3https": "2-6-z3https"
        }
      }
    },
    "comb-pack-3": {
      "duration-3": {
        "price": "19120.2",
        "origin-price": "32215.77",
        "diff-price": "13095.57",
        "ids": {
          "z0http": "3-3-z0http",
          "z0https": "3-3-z0https",
          "z1http": "3-3-z1http",
          "z1https": "3-3-z1https",
          "z3http": 170,
          "z3https": "3-3-z3https"
        }
      },
      "duration-6": {
        "price": "31202.7",
        "origin-price": "56295.54",
        "diff-price": "25092.84",
        "ids": {
          "z0http": "3-6-z0http",
          "z0https": "3-6-z0https",
          "z1http": "3-6-z1http",
          "z1https": "3-6-z1https",
          "z3http": "3-6-z3http",
          "z3https": "3-6-z3https"
        }
      },
      "duration-12": {
        "price": "45295.2",
        "origin-price": "104455.08",
        "diff-price": "59159.88",
        "ids": {
          "z0http": "3-12-z0http",
          "z0https": "3-12-z0https",
          "z1http": "3-12-z1http",
          "z1https": "3-12-z1https",
          "z3http": "3-12-z3http",
          "z3https": "3-12-z3https"
        }
      }
    },
    "comb-pack-4": {
      "duration-3": {
        "price": "19540.2",
        "origin-price": "32860.77",
        "diff-price": "13320.57",
        "ids": {
          "z0http": 163,
          "z0https": "4-3-z0https",
          "z1http": "4-3-z1http",
          "z1https": "4-3-z1https",
          "z3http": "4-3-z3http",
          "z3https": "4-3-z3https"
        }
      },
      "duration-6": {
        "price": "32042.7",
        "origin-price": "57585.54",
        "diff-price": "25542.84",
        "ids": {
          "z0http": "4-6-z0http",
          "z0https": "4-6-z0https",
          "z1http": "4-6-z1http",
          "z1https": "4-6-z1https",
          "z3http": "4-6-z3http",
          "z3https": "4-6-z3https"
        }
      },
      "duration-12": {
        "price": "46975.2",
        "origin-price": "107035.08",
        "diff-price": "60059.88",
        "ids": {
          "z0http": "4-12-z0http",
          "z0https": "4-12-z0https",
          "z1http": "4-12-z1http",
          "z1https": 171,
          "z3http": "4-12-z3http",
          "z3https": "4-12-z3https"
        }
      }
    }
  }

  # 2019 年 1212 活动页面 package 配置信息
  # 区分测试环境和线上 pakcageID 信息
  config.double12_2019_package = {
    "kodo": {
      "table": [
        {
          "title": "标准存储空间 100GB X 6 个月",
          "tipClass": "orange",
          "tipText": "新人专享",
          "duration": "6 个月",
          "areas": [
            {
              "value": "kodo-east-100GB-6",
              "text": "华东地区"
            },
            {
              "value": "kodo-south-100GB-6",
              "text": "华南地区"
            },
            {
              "value": "kodo-north-100GB-6",
              "text": "华北地区"
            }
          ],
          "sections": [
            {
              "id": "kodo-east-100GB-6",
              "class": "active",
              "price": "0.01",
              "originPrice": "79.92",
              "save": "79.91",
              "btnText": "立即抢购",
              "btnClass": "orange",
              "packageID": 0,
              "info": "请您再次确认所选的区域和规格<br />标准存储空间 100GB X 6 个月 - <span class='high-light'>华东地区</span>"
            },
            {
              "id": "kodo-south-100GB-6",
              "class": "",
              "price": "0.01",
              "originPrice": "79.92",
              "save": "79.91",
              "btnText": "立即抢购",
              "btnClass": "orange",
              "packageID": 152,
              "info": "请您再次确认所选的区域和规格<br />标准存储空间 100GB X 6 个月 - <span class='high-light'>华南地区</span>"
            },
            {
              "id": "kodo-north-100GB-6",
              "class": "",
              "price": "0.01",
              "originPrice": "79.92",
              "save": "79.91",
              "btnText": "立即抢购",
              "btnClass": "orange",
              "packageID": 0,
              "info": "请您再次确认所选的区域和规格<br />标准存储空间 100GB X 6 个月 - <span class='high-light'>华北地区</span>"
            }
          ]
        }
      ],
      "southList": [
        {
          "title": "标准存储 500GB/月",
          "desc": "可选购半年/全年包，华南地区专享",
          "isNew": false,
          "durations": [
            {
              "value": "kodo-south-500GB-6",
              "text": "6 个月"
            },
            {
              "value": "kodo-south-500GB-12",
              "text": "12 个月"
            }
          ],
          "sections": [
            {
              "id": "kodo-south-500GB-6",
              "class": "active",
              "price": "195",
              "originPrice": "291.06",
              "save": "96.06",
              "packageID": 0,
              "info": "请您再次确认所选的区域和规格<br />标准存储空间 500GB X 6 个月 - <span class='high-light'>华南地区</span>"
            },
            {
              "id": "kodo-south-500GB-12",
              "class": "",
              "price": "354",
              "originPrice": "582.12",
              "save": "228.12",
              "packageID": 0,
              "info": "请您再次确认所选的区域和规格<br />标准存储空间 500GB X 12 个月 - <span class='high-light'>华南地区</span>"
            }
          ]
        },
        {
          "title": "标准存储 1TB/月",
          "desc": "可选购半年/全年包，华南地区专享",
          "isNew": false,
          "durations": [
            {
              "value": "kodo-south-1TB-6",
              "text": "6 个月"
            },
            {
              "value": "kodo-south-1TB-12",
              "text": "12 个月"
            }
          ],
          "sections": [
            {
              "id": "kodo-south-1TB-6",
              "class": "active",
              "price": "399",
              "originPrice": "602.32",
              "save": "203.32",
              "packageID": 0,
              "info": "请您再次确认所选的区域和规格<br />标准存储空间 1TB X 6 个月 - <span class='high-light'>华南地区</span>"
            },
            {
              "id": "kodo-south-1TB-12",
              "class": "",
              "price": "725",
              "originPrice": "1204.63",
              "save": "479.63",
              "packageID": 0,
              "info": "请您再次确认所选的区域和规格<br />标准存储空间 1TB X 12 个月 - <span class='high-light'>华南地区</span>"
            }
          ]
        },
        {
          "title": "标准存储 5TB/月",
          "desc": "可选购半年/全年包，华南地区专享",
          "isNew": false,
          "durations": [
            {
              "value": "kodo-south-5TB-6",
              "text": "6 个月"
            },
            {
              "value": "kodo-south-5TB-12",
              "text": "12 个月"
            }
          ],
          "sections": [
            {
              "id": "kodo-south-5TB-6",
              "class": "active",
              "price": "1997",
              "originPrice": "3035.34",
              "save": "1038.34",
              "packageID": 0,
              "info": "请您再次确认所选的区域和规格<br />标准存储空间 5TB X 6 个月 - <span class='high-light'>华南地区</span>"
            },
            {
              "id": "kodo-south-5TB-12",
              "class": "",
              "price": "3625",
              "originPrice": "6070.68",
              "save": "2445.68",
              "packageID": 0,
              "info": "请您再次确认所选的区域和规格<br />标准存储空间 5TB X 12 个月 - <span class='high-light'>华南地区</span>"
            }
          ]
        },
        {
          "title": "标准存储 10TB/月",
          "desc": "可选购半年/全年包，华南地区专享",
          "isNew": false,
          "durations": [
            {
              "value": "kodo-south-10TB-6",
              "text": "6 个月"
            },
            {
              "value": "kodo-south-10TB-12",
              "text": "12 个月"
            }
          ],
          "sections": [
            {
              "id": "kodo-south-10TB-6",
              "class": "active",
              "price": "3994",
              "originPrice": "6076.62",
              "save": "2082.62",
              "packageID": 0,
              "info": "请您再次确认所选的区域和规格<br />标准存储空间 10TB X 6 个月 - <span class='high-light'>华南地区</span>"
            },
            {
              "id": "kodo-south-10TB-12",
              "class": "",
              "price": "7250",
              "originPrice": "12153.24",
              "save": "4903.24",
              "packageID": 0,
              "info": "请您再次确认所选的区域和规格<br />标准存储空间 10TB X 12 个月 - <span class='high-light'>华南地区</span>"
            }
          ]
        }
      ],
      "list": [
        {
          "title": "标准存储 500GB/月",
          "desc": "可选购半年/全年包，华东/华北地区",
          "isNew": false,
          "durations": [
            {
              "value": "6",
              "text": "6 个月"
            },
            {
              "value": "12",
              "text": "12 个月"
            }
          ],
          "areas": [
            {
              "value": "kodo-east-500GB",
              "text": "华东地区"
            },
            {
              "value": "kodo-north-500GB",
              "text": "华北地区"
            }
          ],
          "sections": [
            {
              "id": "kodo-east-500GB-6",
              "class": "active",
              "price": "246",
              "originPrice": "435.12",
              "save": "189.12",
              "packageID": 154,
              "info": "请您再次确认所选的区域和规格<br />标准存储空间 500GB X 6 个月 - <span class='high-light'>华东地区</span>"
            },
            {
              "id": "kodo-east-500GB-12",
              "class": "",
              "price": "444",
              "originPrice": "870.24",
              "save": "426.24",
              "packageID": 0,
              "info": "请您再次确认所选的区域和规格<br />标准存储空间 500GB X 12 个月 - <span class='high-light'>华东地区</span>"
            },
            {
              "id": "kodo-north-500GB-6",
              "class": "",
              "price": "246",
              "originPrice": "435.12",
              "save": "189.12",
              "packageID": 0,
              "info": "请您再次确认所选的区域和规格<br />标准存储空间 500GB X 6 个月 - <span class='high-light'>华北地区</span>"
            },
            {
              "id": "kodo-north-500GB-12",
              "class": "",
              "price": "444",
              "originPrice": "870.24",
              "save": "426.24",
              "packageID": 0,
              "info": "请您再次确认所选的区域和规格<br />标准存储空间 500GB X 12 个月 - <span class='high-light'>华北地区</span>"
            }
          ]
        },
        {
          "title": "标准存储 1TB/月",
          "desc": "可选购半年/全年包，华东/华北地区",
          "isNew": false,
          "durations": [
            {
              "value": "6",
              "text": "6 个月"
            },
            {
              "value": "12",
              "text": "12 个月"
            }
          ],
          "areas": [
            {
              "value": "kodo-east-1TB",
              "text": "华东地区"
            },
            {
              "value": "kodo-north-1TB",
              "text": "华北地区"
            }
          ],
          "sections": [
            {
              "id": "kodo-east-1TB-6",
              "class": "active",
              "price": "503",
              "originPrice": "900.43",
              "save": "397.43",
              "packageID": 0,
              "info": "请您再次确认所选的区域和规格<br />标准存储空间 1TB X 6 个月 - <span class='high-light'>华东地区</span>"
            },
            {
              "id": "kodo-east-1TB-12",
              "class": "",
              "price": "909",
              "originPrice": "1800.86",
              "save": "891.86",
              "packageID": 0,
              "info": "请您再次确认所选的区域和规格<br />标准存储空间 1TB X 12 个月 - <span class='high-light'>华东地区</span>"
            },
            {
              "id": "kodo-north-1TB-6",
              "class": "",
              "price": "503",
              "originPrice": "900.43",
              "save": "397.43",
              "packageID": 0,
              "info": "请您再次确认所选的区域和规格<br />标准存储空间 1TB X 6 个月 - <span class='high-light'>华北地区</span>"
            },
            {
              "id": "kodo-north-1TB-12",
              "class": "",
              "price": "909",
              "originPrice": "1800.86",
              "save": "891.86",
              "packageID": 0,
              "info": "请您再次确认所选的区域和规格<br />标准存储空间 1TB X 12 个月 - <span class='high-light'>华北地区</span>"
            }
          ]
        },
        {
          "title": "标准存储 5TB/月",
          "desc": "可选购半年/全年包，华东/华北地区",
          "isNew": false,
          "durations": [
            {
              "value": "6",
              "text": "6 个月"
            },
            {
              "value": "12",
              "text": "12 个月"
            }
          ],
          "areas": [
            {
              "value": "kodo-east-5TB",
              "text": "华东地区"
            },
            {
              "value": "kodo-north-5TB",
              "text": "华北地区"
            }
          ],
          "sections": [
            {
              "id": "kodo-east-5TB-6",
              "class": "active",
              "price": "2519",
              "originPrice": "4463.95",
              "save": "1944.95",
              "packageID": 0,
              "info": "请您再次确认所选的区域和规格<br />标准存储空间 5TB X 6 个月 - <span class='high-light'>华东地区</span>"
            },
            {
              "id": "kodo-east-5TB-12",
              "class": "",
              "price": "4546",
              "originPrice": "8927.90",
              "save": "4381.9",
              "packageID": 0,
              "info": "请您再次确认所选的区域和规格<br />标准存储空间 5TB X 12 个月 - <span class='high-light'>华东地区</span>"
            },
            {
              "id": "kodo-north-5TB-6",
              "class": "",
              "price": "2519",
              "originPrice": "4463.95\"",
              "save": "1944.95",
              "packageID": 0,
              "info": "请您再次确认所选的区域和规格<br />标准存储空间 5TB X 6 个月 - <span class='high-light'>华北地区</span>"
            },
            {
              "id": "kodo-north-5TB-12",
              "class": "",
              "price": "4546",
              "originPrice": "8927.90",
              "save": "4381.9",
              "packageID": 0,
              "info": "请您再次确认所选的区域和规格<br />标准存储空间 5TB X 12 个月 - <span class='high-light'>华北地区</span>"
            }
          ]
        },
        {
          "title": "标准存储 10TB/月",
          "desc": "可选购半年/全年包，华东/华北地区",
          "isNew": false,
          "durations": [
            {
              "value": "6",
              "text": "6 个月"
            },
            {
              "value": "12",
              "text": "12 个月"
            }
          ],
          "areas": [
            {
              "value": "kodo-east-10TB",
              "text": "华东地区"
            },
            {
              "value": "kodo-north-10TB",
              "text": "华北地区"
            }
          ],
          "sections": [
            {
              "id": "kodo-east-10TB-6",
              "class": "active",
              "price": "5038",
              "originPrice": "8918.35",
              "save": "3880.35",
              "packageID": 0,
              "info": "请您再次确认所选的区域和规格<br />标准存储空间 10TB X 6 个月 - <span class='high-light'>华东地区</span>"
            },
            {
              "id": "kodo-east-10TB-12",
              "class": "",
              "price": "9093",
              "originPrice": "17836.70",
              "save": "8743.7",
              "packageID": 0,
              "info": "请您再次确认所选的区域和规格<br />标准存储空间 10TB X 12 个月 - <span class='high-light'>华东地区</span>"
            },
            {
              "id": "kodo-north-10TB-6",
              "class": "",
              "price": "5038",
              "originPrice": "8918.35",
              "save": "3880.35",
              "packageID": 0,
              "info": "请您再次确认所选的区域和规格<br />标准存储空间 10TB X 6 个月 - <span class='high-light'>华北地区</span>"
            },
            {
              "id": "kodo-north-10TB-12",
              "class": "",
              "price": "9093",
              "originPrice": "17836.70",
              "save": "8743.7",
              "packageID": 0,
              "info": "请您再次确认所选的区域和规格<br />标准存储空间 10TB X 12 个月 - <span class='high-light'>华北地区</span>"
            }
          ]
        }
      ]
    },
    "fusion": {
      "list": [
        {
          "title": "国内全时段静态加速流量 100GB",
          "desc": "有效期 6 个月",
          "isNew": true,
          "durations": [
            {
              "value": "fusion-http-100GB-6",
              "text": "HTTP"
            },
            {
              "value": "fusion-https-100GB-6",
              "text": "HTTPS"
            }
          ],
          "sections": [
            {
              "id": "fusion-http-100GB-6",
              "class": "active",
              "price": "7.7",
              "originPrice": "24",
              "save": "16.3",
              "packageID": 107,
              "info": "请您再次确认所选的域名和规格<br />国内 HTTP 全时段静态加速流量 100GB，有效期 6 个月"
            },
            {
              "id": "fusion-https-100GB-6",
              "class": "",
              "price": "8.8",
              "originPrice": "28",
              "save": "19.2",
              "packageID": 111,
              "info": "请您再次确认所选的域名和规格<br />国内 HTTPS 全时段静态加速流量 100GB，有效期 6 个月"
            }
          ]
        },
        {
          "title": "国内全时段静态加速流量 1TB",
          "desc": "有效期 6 个月",
          "isNew": true,
          "durations": [
            {
              "value": "fusion-http-1TB-6",
              "text": "HTTP"
            },
            {
              "value": "fusion-https-1TB-6",
              "text": "HTTPS"
            }
          ],
          "sections": [
            {
              "id": "fusion-http-1TB-6",
              "class": "active",
              "price": "77",
              "originPrice": "240",
              "save": "163",
              "packageID": 108,
              "info": "请您再次确认所选的域名和规格<br />国内 HTTP 全时段静态加速流量 1TB，有效期 6 个月"
            },
            {
              "id": "fusion-https-1TB-6",
              "class": "",
              "price": "88",
              "originPrice": "280",
              "save": "192",
              "packageID": 112,
              "info": "请您再次确认所选的域名和规格<br />国内 HTTPS 全时段静态加速流量 1TB，有效期 6 个月"
            }
          ]
        },
        {
          "title": "国内全时段静态加速流量 10TB",
          "desc": "有效期 6 个月",
          "isNew": true,
          "durations": [
            {
              "value": "fusion-http-10TB-6",
              "text": "HTTP"
            },
            {
              "value": "fusion-https-10TB-6",
              "text": "HTTPS"
            }
          ],
          "sections": [
            {
              "id": "fusion-http-10TB-6",
              "class": "active",
              "price": "777",
              "originPrice": "2400",
              "save": "1623",
              "packageID": 109,
              "info": "请您再次确认所选的域名和规格<br />国内 HTTP 全时段静态加速流量 10TB，有效期 6 个月"
            },
            {
              "id": "fusion-https-10TB-6",
              "class": "",
              "price": "888",
              "originPrice": "2800",
              "save": "1912",
              "packageID": 113,
              "info": "请您再次确认所选的域名和规格<br />国内 HTTPS 全时段静态加速流量 10TB，有效期 6 个月"
            }
          ]
        },
        {
          "title": "国内全时段静态加速流量 50TB",
          "desc": "有效期 6 个月",
          "isNew": true,
          "durations": [
            {
              "value": "fusion-http-50TB-6",
              "text": "HTTP"
            },
            {
              "value": "fusion-https-50TB-6",
              "text": "HTTPS"
            }
          ],
          "sections": [
            {
              "id": "fusion-http-50TB-6",
              "class": "active",
              "price": "3777",
              "originPrice": "12000",
              "save": "8223",
              "packageID": 110,
              "info": "请您再次确认所选的域名和规格<br />国内 HTTP 全时段静态加速流量 50TB，有效期 6 个月"
            },
            {
              "id": "fusion-https-50TB-6",
              "class": "",
              "price": "4321",
              "originPrice": "14000",
              "save": "9679",
              "packageID": 114,
              "info": "请您再次确认所选的域名和规格<br />国内 HTTPS 全时段静态加速流量 50TB，有效期 6 个月"
            }
          ]
        },
        {
          "title": "国内全时段静态加速流量 1.2TB（按月结转）",
          "desc": "按月发放 102.4GB/月，可结转<br />有效期 1 年",
          "isNew": false,
          "durations": [
            {
              "value": "fusion-http-1dot2TB-12",
              "text": "HTTP"
            },
            {
              "value": "fusion-https-1dot2TB-12",
              "text": "HTTPS"
            }
          ],
          "sections": [
            {
              "id": "fusion-http-1dot2TB-12",
              "class": "active",
              "price": "199",
              "originPrice": "295",
              "save": "96",
              "packageID": 128,
              "info": "请您再次确认所选的域名和规格<br />国内 HTTP 全时段静态加速流量 1.2TB，按月发放 102.4GB/月，可结转，有效期 1 年"
            },
            {
              "id": "fusion-https-1dot2TB-12",
              "class": "",
              "price": "299",
              "originPrice": "344",
              "save": "45",
              "packageID": 0,
              "info": "请您再次确认所选的域名和规格<br />国内 HTTPS 全时段静态加速流量 1.2TB，按月发放 102.4GB/月，可结转，有效期 1 年"
            }
          ]
        },
        {
          "title": "国内全时段静态加速流量 6TB（按月结转）",
          "desc": "按月发放 512GB/月，可结转<br />有效期 1 年",
          "isNew": false,
          "durations": [
            {
              "value": "fusion-http-6TB-12",
              "text": "HTTP"
            },
            {
              "value": "fusion-https-6TB-12",
              "text": "HTTPS"
            }
          ],
          "sections": [
            {
              "id": "fusion-http-6TB-12",
              "class": "active",
              "price": "999",
              "originPrice": "1475",
              "save": "476",
              "packageID": 0,
              "info": "请您再次确认所选的域名和规格<br />国内 HTTP 全时段静态加速流量 6TB，按月发放 512GB/月，可结转，有效期 1 年"
            },
            {
              "id": "fusion-https-6TB-12",
              "class": "",
              "price": "1199",
              "originPrice": "1720",
              "save": "521",
              "packageID": 0,
              "info": "请您再次确认所选的域名和规格<br />国内 HTTPS 全时段静态加速流量 6TB，按月发放 512GB/月，可结转，有效期 1 年"
            }
          ]
        },
        {
          "title": "国内全时段静态加速流量 12TB（按月结转）",
          "desc": "按月发放 1TB/月，可结转<br />有效期 1 年",
          "isNew": false,
          "durations": [
            {
              "value": "fusion-http-12TB-12",
              "text": "HTTP"
            },
            {
              "value": "fusion-https-12TB-12",
              "text": "HTTPS"
            }
          ],
          "sections": [
            {
              "id": "fusion-http-12TB-12",
              "class": "active",
              "price": "1999",
              "originPrice": "2949",
              "save": "950",
              "packageID": 0,
              "info": "请您再次确认所选的域名和规格<br />国内 HTTP 全时段静态加速流量 12TB，按月发放 1TB/月，可结转，有效期 1 年"
            },
            {
              "id": "fusion-https-12TB-12",
              "class": "",
              "price": "2299",
              "originPrice": "3441",
              "save": "1142",
              "packageID": 0,
              "info": "请您再次确认所选的域名和规格<br />国内 HTTPS 全时段静态加速流量 12TB，按月发放 1TB/月，可结转，有效期 1 年"
            }
          ]
        },
        {
          "title": "国内全时段静态加速流量 60TB（按月结转）",
          "desc": "按月发放 5TB/月，可结转<br />有效期 1 年",
          "isNew": false,
          "durations": [
            {
              "value": "fusion-http-60TB-12",
              "text": "HTTP"
            },
            {
              "value": "fusion-https-60TB-12",
              "text": "HTTPS"
            }
          ],
          "sections": [
            {
              "id": "fusion-http-60TB-12",
              "class": "active",
              "price": "7999",
              "originPrice": "14746",
              "save": "6747",
              "packageID": 0,
              "info": "请您再次确认所选的域名和规格<br />国内 HTTP 全时段静态加速流量 60TB，按月发放 5TB/月，可结转，有效期 1 年"
            },
            {
              "id": "fusion-https-60TB-12",
              "class": "",
              "price": "10999",
              "originPrice": "17203",
              "save": "6204",
              "packageID": 0,
              "info": "请您再次确认所选的域名和规格<br />国内 HTTPS 全时段静态加速流量 60TB，按月发放 5TB/月，可结转，有效期 1 年"
            }
          ]
        },
        {
          "title": "国内全时段静态加速流量 120TB（按月结转）",
          "desc": "按月发放 10TB/月，可结转<br />有效期 1 年",
          "isNew": false,
          "durations": [
            {
              "value": "fusion-http-120TB-12",
              "text": "HTTP"
            },
            {
              "value": "fusion-https-120TB-12",
              "text": "HTTPS"
            }
          ],
          "sections": [
            {
              "id": "fusion-http-120TB-12",
              "class": "active",
              "price": "15999",
              "originPrice": "23347",
              "save": "7348",
              "packageID": 0,
              "info": "请您再次确认所选的域名和规格<br />国内 HTTP 全时段静态加速流量 120TB，按月发放 10TB/月，可结转，有效期 1 年"
            },
            {
              "id": "fusion-https-120TB-12",
              "class": "",
              "price": "19999",
              "originPrice": "28262",
              "save": "8263",
              "packageID": 0,
              "info": "请您再次确认所选的域名和规格<br />国内 HTTPS 全时段静态加速流量 120TB，按月发放 10TB/月，可结转，有效期 1 年"
            }
          ]
        },
        {
          "title": "国内全时段静态加速流量 240TB（按月结转）",
          "desc": "按月发放 20TB/月，可结转<br />有效期 1 年",
          "isNew": false,
          "durations": [
            {
              "value": "fusion-http-240TB-12",
              "text": "HTTP"
            },
            {
              "value": "fusion-https-240TB-12",
              "text": "HTTPS"
            }
          ],
          "sections": [
            {
              "id": "fusion-http-240TB-12",
              "class": "active",
              "price": "29999",
              "originPrice": "46694",
              "save": "16695",
              "packageID": 0,
              "info": "请您再次确认所选的域名和规格<br />国内 HTTP 全时段静态加速流量 240TB，按月发放 20TB/月，可结转，有效期 1 年"
            },
            {
              "id": "fusion-https-240TB-12",
              "class": "",
              "price": "36999",
              "originPrice": "56525",
              "save": "19526",
              "packageID": 0,
              "info": "请您再次确认所选的域名和规格<br />国内 HTTPS 全时段静态加速流量 240TB，按月发放 20TB/月，可结转，有效期 1 年"
            }
          ]
        },
        {
          "title": "国内全时段静态加速流量 480TB（按月结转）",
          "desc": "按月发放 40TB/月，可结转<br />有效期 1 年",
          "isNew": false,
          "durations": [
            {
              "value": "fusion-http-480TB-12",
              "text": "HTTP"
            },
            {
              "value": "fusion-https-480TB-12",
              "text": "HTTPS"
            }
          ],
          "sections": [
            {
              "id": "fusion-http-480TB-12",
              "class": "active",
              "price": "54999",
              "originPrice": "93389",
              "save": "38390",
              "packageID": 0,
              "info": "请您再次确认所选的域名和规格<br />国内 HTTP 全时段静态加速流量 480TB，按月发放 40TB/月，可结转，有效期 1 年"
            },
            {
              "id": "fusion-https-480TB-12",
              "class": "",
              "price": "63999",
              "originPrice": "113050",
              "save": "49051",
              "packageID": 0,
              "info": "请您再次确认所选的域名和规格<br />国内 HTTPS 全时段静态加速流量 480TB，按月发放 40TB/月，可结转，有效期 1 年"
            }
          ]
        },
        {
          "title": "国内全时段静态加速流量 1.2PB（按月结转）",
          "desc": "按月发放 102.4TB/月，可结转<br />有效期 1 年",
          "isNew": false,
          "durations": [
            {
              "value": "fusion-http-1dot2PB-12",
              "text": "HTTP"
            },
            {
              "value": "fusion-https-1dot2PB-12",
              "text": "HTTPS"
            }
          ],
          "sections": [
            {
              "id": "fusion-http-1dot2PB-12",
              "class": "active",
              "price": "125999",
              "originPrice": "239075",
              "save": "113076",
              "packageID": 0,
              "info": "请您再次确认所选的域名和规格<br />国内 HTTP 全时段静态加速流量 1.2PB，按月发放 102.4TB/月，可结转，有效期 1 年"
            },
            {
              "id": "fusion-https-1dot2PB-12",
              "class": "",
              "price": "150999",
              "originPrice": "289407",
              "save": "138408",
              "packageID": 0,
              "info": "请您再次确认所选的域名和规格<br />国内 HTTPS 全时段静态加速流量 1.2PB，按月发放 102.4TB/月，可结转，有效期 1 年"
            }
          ]
        }
      ]
    },
    "pili": {
      "pmList": [
        {
          "title": "直播云 1TB 全年包",
          "desc": "约 1000 人同时在线观看标清 (1Mbps) 直播 2 小时",
          "price": "186",
          "originPrice": "233",
          "save": "47",
          "packageID": 0,
          "info": "请您再次确认所选的规格<br />直播云 1TB 全年包"
        },
        {
          "title": "直播云 5TB 全年包",
          "desc": "约 5000 人同时在线观看标清 (2Mbps) 直播 12 小时",
          "price": "876",
          "originPrice": "1096",
          "save": "220",
          "packageID": 157,
          "info": "请您再次确认所选的规格<br />直播云 5TB 全年包"
        },
        {
          "title": "直播云 10TB 全年包",
          "desc": "约 1 万人同时在线观看标清 (2Mbps) 直播 24 小时",
          "price": "1736",
          "originPrice": "2170",
          "save": "434",
          "packageID": 0,
          "info": "请您再次确认所选的规格<br />直播云 10TB 全年包"
        }
      ],
      "socialList": [
        {
          "title": "直播云 10TB 全年包",
          "desc": "1 年有效，含上行及下行流量",
          "price": "1736",
          "originPrice": "2170",
          "save": "434",
          "packageID": 0,
          "info": "请您再次确认所选的规格<br />直播云 10TB 全年包"
        },
        {
          "title": "直播云 50TB 全年包",
          "desc": "1 年有效，含上行及下行流量",
          "price": "7124",
          "originPrice": "8906",
          "save": "1782",
          "packageID": 0,
          "info": "请您再次确认所选的规格<br />直播云 50TB 全年包"
        },
        {
          "title": "直播云 200TB 全年包",
          "desc": "1 年有效，含上行及下行流量",
          "price": "24659",
          "originPrice": "30824",
          "save": "6165",
          "packageID": 0,
          "info": "请您再次确认所选的规格<br />直播云 200TB 全年包"
        },
        {
          "title": "直播云 1PB 全年包",
          "desc": "1 年有效，含上行及下行流量",
          "price": "120356",
          "originPrice": "150445",
          "save": "30089",
          "packageID": 0,
          "info": "请您再次确认所选的规格<br />直播云 1PB 全年包"
        }
      ]
    },
    "sdk": {
      "table": [
        {
          "title": "短视频 SDK 一个月专业版",
          "tipClass": "orange",
          "tipText": "新人专享",
          "type": "专业版",
          "duration": "1 个月",
          "price": "0",
          "originPrice": "10000",
          "save": "10000",
          "btnText": "立即抢购",
          "btnClass": "orange",
          "packageID": 0,
          "info": "请您再次确认所选的规格<br />短视频 SDK 一个月专业版"
        },
        {
          "title": "短视频 SDK 全年精简版",
          "tipClass": "blue",
          "tipText": "双 12 狂欢",
          "type": "精简版",
          "duration": "1 年",
          "price": "1008",
          "originPrice": "2016",
          "save": "1008",
          "btnText": "立即抢购",
          "btnClass": "blue",
          "packageID": 0,
          "info": "请您再次确认所选的规格<br />短视频 SDK 全年精简版"
        },
        {
          "title": "短视频 SDK 全年基础版",
          "tipClass": "blue",
          "tipText": "双 12 狂欢",
          "type": "基础版",
          "duration": "1 年",
          "price": "4068",
          "originPrice": "8136",
          "save": "4068",
          "btnText": "立即抢购",
          "btnClass": "blue",
          "packageID": 141,
          "info": "请您再次确认所选的规格<br />短视频 SDK 全年基础版"
        },
        {
          "title": "短视频 SDK 全年进阶版",
          "tipClass": "blue",
          "tipText": "双 12 狂欢",
          "type": "进阶版",
          "duration": "1 年",
          "price": "30000",
          "originPrice": "60000",
          "save": "30000",
          "btnText": "立即抢购",
          "btnClass": "blue",
          "packageID": 0,
          "info": "请您再次确认所选的规格<br />短视频 SDK 全年进阶版"
        },
        {
          "title": "短视频 SDK 全年专业版",
          "tipClass": "blue",
          "tipText": "双 12 狂欢",
          "type": "专业版",
          "duration": "1 年",
          "price": "60000",
          "originPrice": "120000",
          "save": "60000",
          "btnText": "立即抢购",
          "btnClass": "blue",
          "packageID": 0,
          "info": "请您再次确认所选的规格<br />短视频 SDK 全年专业版"
        }
      ]
    },
    "qvm": {
      "list": [
        {
          "title": "云主机 突发性能型 T5",
          "desc": "新用户专享，低至 1 折",
          "isNew": true,
          "isEnt": false,
          "spec": [
            {
              "title": "带宽",
              "value": "1Mbps"
            },
            {
              "title": "规格",
              "value": "1C/1G/40G"
            },
            {
              "title": "时长",
              "value": "3 个月"
            }
          ],
          "price": "18",
          "originPrice": "170.25",
          "save": "152.25",
          "link": "/qvm/vm/instance/create?mode=DirectOrder&instance_type=ecs.t5-lc1m1.small&buymonth=3&eip=1&discount=ACTIVITY%2320191212%23SHOPPING_DAY_NEW_LIMITED"
        },
        {
          "title": "云主机 突发性能型 T5",
          "desc": "新用户专享，低至 1 折",
          "isNew": true,
          "isEnt": false,
          "spec": [
            {
              "title": "带宽",
              "value": "1Mbps"
            },
            {
              "title": "规格",
              "value": "2C/4G/40G"
            },
            {
              "title": "时长",
              "value": "3 个月"
            }
          ],
          "price": "39",
          "originPrice": "418.65",
          "save": "379.65",
          "link": "/qvm/vm/instance/create?mode=DirectOrder&instance_type=ecs.t5-c1m2.large&buymonth=3&eip=1&discount=ACTIVITY%2320191212%23SHOPPING_DAY_NEW_LIMITED"
        },
        {
          "title": "云主机 计算型 C5",
          "desc": "企业新用户专享，低至 3 折",
          "isNew": false,
          "isEnt": true,
          "spec": [
            {
              "title": "带宽",
              "value": "2Mbps"
            },
            {
              "title": "规格",
              "value": "2C/4G/40G"
            },
            {
              "title": "时长",
              "value": "3 个月"
            }
          ],
          "price": "196",
          "originPrice": "654.3",
          "save": "458.3",
          "link": "/qvm/vm/instance/create?mode=DirectOrder&instance_type=ecs.c5.large&buymonth=3&eip=2&discount=ACTIVITY%2320191212%23SHOPPING_DAY_NEW_ENT_LIMITED"
        },
        {
          "title": "云主机 计算型 C5",
          "desc": "企业新用户专享，低至 3 折",
          "isNew": false,
          "isEnt": true,
          "spec": [
            {
              "title": "带宽",
              "value": "5Mbps"
            },
            {
              "title": "规格",
              "value": "4C/8G/40G"
            },
            {
              "title": "时长",
              "value": "3 个月"
            }
          ],
          "price": "409",
          "originPrice": "1362.75",
          "save": "953.75",
          "link": "/qvm/vm/instance/create?mode=DirectOrder&instance_type=ecs.c5.xlarge&buymonth=3&eip=5&discount=ACTIVITY%2320191212%23SHOPPING_DAY_NEW_ENT_LIMITED"
        },
        {
          "title": "云主机 共享型 XN4",
          "desc": "全年包",
          "isNew": false,
          "isEnt": false,
          "spec": [
            {
              "title": "带宽",
              "value": "1Mbps"
            },
            {
              "title": "规格",
              "value": "1C/1G/40G"
            },
            {
              "title": "时长",
              "value": "1 年"
            }
          ],
          "price": "643",
          "originPrice": "908.05",
          "save": "265.05",
          "link": "/qvm/vm/instance/create?mode=DirectOrder&instance_type=ecs.xn4.small&buymonth=12&eip=1&discount=ACTIVITY%2320191212%23SHOPPING_DAY_LIMITED"
        },
        {
          "title": "云主机 共享型 MN4",
          "desc": "全年包",
          "isNew": false,
          "isEnt": false,
          "spec": [
            {
              "title": "带宽",
              "value": "2Mbps"
            },
            {
              "title": "规格",
              "value": "1C/4G/40G"
            },
            {
              "title": "时长",
              "value": "1 年"
            }
          ],
          "price": "1448",
          "originPrice": "2358",
          "save": "910",
          "link": "/qvm/vm/instance/create?mode=DirectOrder&instance_type=ecs.mn4.small&buymonth=12&eip=2&discount=ACTIVITY%2320191212%23SHOPPING_DAY_LIMITED"
        },
        {
          "title": "云主机 计算型 C5",
          "desc": "全年包",
          "isNew": false,
          "isEnt": false,
          "spec": [
            {
              "title": "带宽",
              "value": "2Mbps"
            },
            {
              "title": "规格",
              "value": "2C/4G/40G"
            },
            {
              "title": "时长",
              "value": "1 年"
            }
          ],
          "price": "1400",
          "originPrice": "2617",
          "save": "1217",
          "link": "/qvm/vm/instance/create?mode=DirectOrder&instance_type=ecs.c5.large&buymonth=12&eip=2&discount=ACTIVITY%2320191212%23SHOPPING_DAY_LIMITED"
        },
        {
          "title": "云主机 通用型 G5",
          "desc": "全年包",
          "isNew": false,
          "isEnt": false,
          "spec": [
            {
              "title": "带宽",
              "value": "3Mbps"
            },
            {
              "title": "规格",
              "value": "2C/8G/40G"
            },
            {
              "title": "时长",
              "value": "1 年"
            }
          ],
          "price": "2300",
          "originPrice": "3723",
          "save": "1423",
          "link": "/qvm/vm/instance/create?mode=DirectOrder&instance_type=ecs.g5.large&buymonth=12&eip=3&discount=ACTIVITY%2320191212%23SHOPPING_DAY_LIMITED"
        }
      ]
    },
    "sms": {
      "list": [
        {
          "title": "云短信 3000 条系统短信起跑包",
          "desc": "1 年有效，限系统短信，0.025/条",
          "price": "75",
          "originPrice": "129",
          "save": "54",
          "packageID": 104,
          "info": "请您再次确认所选的规格<br />云短信 3000 条系统短信起跑包"
        },
        {
          "title": "云短信 10000 条系统短信加速包",
          "desc": "1 年有效，限系统短信，0.024/条",
          "price": "240",
          "originPrice": "430",
          "save": "190",
          "packageID": 105,
          "info": "请您再次确认所选的规格<br />云短信 10000 条系统短信加速包"
        },
        {
          "title": "云短信 100000 条系统短信冲刺包",
          "desc": "1 年有效，限系统短信，0.023/条",
          "price": "2300",
          "originPrice": "4300",
          "save": "2000",
          "packageID": 106,
          "info": "请您再次确认所选的规格<br />云短信 100000 条系统短信冲刺包"
        },
        {
          "title": "云短信 3000 条推广短信起跑包",
          "desc": "1 年有效，限推广短信，0.034/条",
          "price": "102",
          "originPrice": "129",
          "save": "27",
          "packageID": 91,
          "info": "请您再次确认所选的规格<br />云短信 3000 条推广短信起跑包"
        },
        {
          "title": "云短信 10000 条推广短信加速包",
          "desc": "1 年有效，限推广短信，0.033/条",
          "price": "330",
          "originPrice": "430",
          "save": "100",
          "packageID": 0,
          "info": "请您再次确认所选的规格<br />云短信 10000 条推广短信加速包"
        },
        {
          "title": "云短信 100000 条推广短信冲刺包",
          "desc": "1 年有效，限推广短信，0.032/条",
          "price": "3200",
          "originPrice": "4300",
          "save": "1100",
          "packageID": 0,
          "info": "请您再次确认所选的规格<br />云短信 100000 条推广短信冲刺包"
        }
      ]
    }
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
