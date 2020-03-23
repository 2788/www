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

  config.acc_host = 'https://acc.qbox.me'
  config.sso_host = 'https://sso.qiniu.com'
  config.www_host = 'https://www.qiniu.com'
  config.blog_host = 'https://blog.qiniu.com'
  config.career_host = 'https://career.qiniu.com'
  config.portal_host = 'https://portal.qiniu.com'
  config.gaea_admin_host = 'http://gaea-admin.qiniu.io'
  config.qvm_host = 'http://qvm-admin.qiniu.io'

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
    end_month: 2,
    end_date: 14
  }

  # 2020 年春季采购活动结束时间
  config.spring_sale = {
    end_year: 2020,
    end_month: 4,
    end_date: 20
  }

  config.double12_2019_comb_package = [{
    "type": "comb-pack-1",
    "title": "新手上路包",
    "durations": [{
      "value": 1,
      "text": "1个月"
    },{
      "value": 3,
      "text": "3个月"
    },{
      "value": 6,
      "text": "6个月"
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
      "value": 1,
      "text": "1个月"
    },{
      "value": 3,
      "text": "3个月"
    },{
      "value": 6,
      "text": "6个月"
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
      "value": 3,
      "text": "3个月"
    },{
      "value": 6,
      "text": "6个月"
    },{
      "value": 12,
      "text": "12个月"
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
      "value": 3,
      "text": "3个月"
    },{
      "value": 6,
      "text": "6个月"
    },{
      "value": 12,
      "text": "12个月"
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
          "z0http": 462,
          "z3http": 465,
          "z1http": 468,
          "z0https": 471,
          "z3https": 474,
          "z1https": 477
        }
      },
      "duration-3": {
        "price": "5556.6",
        "origin-price": "8074.77",
        "diff-price": "2518.17",
        "ids": {
          "z0http": 480,
          "z3http": 483,
          "z1http": 486,
          "z0https": 489,
          "z3https": 492,
          "z1https": 495
        }
      },
      "duration-6": {
        "price": "10886.4",
        "origin-price": "16149.54",
        "diff-price": "5263.14",
        "ids": {
          "z0http": 498,
          "z3http": 501,
          "z1http": 504,
          "z0https": 507,
          "z3https": 510,
          "z1https": 513
        }
      }
    },
    "comb-pack-2": {
      "duration-1": {
        "price": "1920",
        "origin-price": "2734.59",
        "diff-price": "814.59",
        "ids": {
          "z0http": 516,
          "z3http": 519,
          "z1http": 522,
          "z0https": 525,
          "z3https": 528,
          "z1https": 531
        }
      },
      "duration-3": {
        "price": "5646.6",
        "origin-price": "8203.77",
        "diff-price": "2557.17",
        "ids": {
          "z0http": 534,
          "z3http": 537,
          "z1http": 540,
          "z0https": 543,
          "z3https": 546,
          "z1https": 549
        }
      },
      "duration-6": {
        "price": "11066.4",
        "origin-price": "16407.54",
        "diff-price": "5341.14",
        "ids": {
          "z0http": 555,
          "z3http": 558,
          "z1http": 561,
          "z0https": 564,
          "z3https": 567,
          "z1https": 570
        }
      }
    },
    "comb-pack-3": {
      "duration-3": {
        "price": "19120.2",
        "origin-price": "32215.77",
        "diff-price": "13095.57",
        "ids": {
          "z0http": 573,
          "z3http": 576,
          "z1http": 579,
          "z0https": 582,
          "z3https": 585,
          "z1https": 591
        }
      },
      "duration-6": {
        "price": "31202.7",
        "origin-price": "56295.54",
        "diff-price": "25092.84",
        "ids": {
          "z0http": 594,
          "z3http": 597,
          "z1http": 600,
          "z0https": 603,
          "z3https": 606,
          "z1https": 609
        }
      },
      "duration-12": {
        "price": "45295.2",
        "origin-price": "104455.08",
        "diff-price": "59159.88",
        "ids": {
          "z0http": 612,
          "z3http": 615,
          "z1http": 618,
          "z0https": 621,
          "z3https": 624,
          "z1https": 627
        }
      }
    },
    "comb-pack-4": {
      "duration-3": {
        "price": "19540.2",
        "origin-price": "32860.77",
        "diff-price": "13320.57",
        "ids": {
          "z0http": 630,
          "z3http": 633,
          "z1http": 636,
          "z0https": 639,
          "z3https": 642,
          "z1https": 645
        }
      },
      "duration-6": {
        "price": "32042.7",
        "origin-price": "57585.54",
        "diff-price": "25542.84",
        "ids": {
          "z0http": 648,
          "z3http": 651,
          "z1http": 654,
          "z0https": 657,
          "z3https": 660,
          "z1https": 663
        }
      },
      "duration-12": {
        "price": "46975.2",
        "origin-price": "107035.08",
        "diff-price": "60059.88",
        "ids": {
          "z0http": 666,
          "z3http": 669,
          "z1http": 672,
          "z0https": 675,
          "z3https": 678,
          "z1https": 681
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
              "packageID": 357,
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
              "packageID": 354,
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
              "packageID": 360,
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
              "packageID": 414,
              "info": "请您再次确认所选的区域和规格<br />标准存储空间 500GB X 6 个月 - <span class='high-light'>华南地区</span>"
            },
            {
              "id": "kodo-south-500GB-12",
              "class": "",
              "price": "354",
              "originPrice": "582.12",
              "save": "228.12",
              "packageID": 426,
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
              "packageID": 417,
              "info": "请您再次确认所选的区域和规格<br />标准存储空间 1TB X 6 个月 - <span class='high-light'>华南地区</span>"
            },
            {
              "id": "kodo-south-1TB-12",
              "class": "",
              "price": "725",
              "originPrice": "1204.63",
              "save": "479.63",
              "packageID": 432,
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
              "packageID": 420,
              "info": "请您再次确认所选的区域和规格<br />标准存储空间 5TB X 6 个月 - <span class='high-light'>华南地区</span>"
            },
            {
              "id": "kodo-south-5TB-12",
              "class": "",
              "price": "3625",
              "originPrice": "6070.68",
              "save": "2445.68",
              "packageID": 435,
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
              "packageID": 423,
              "info": "请您再次确认所选的区域和规格<br />标准存储空间 10TB X 6 个月 - <span class='high-light'>华南地区</span>"
            },
            {
              "id": "kodo-south-10TB-12",
              "class": "",
              "price": "7250",
              "originPrice": "12153.24",
              "save": "4903.24",
              "packageID": 438,
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
              "packageID": 363,
              "info": "请您再次确认所选的区域和规格<br />标准存储空间 500GB X 6 个月 - <span class='high-light'>华东地区</span>"
            },
            {
              "id": "kodo-east-500GB-12",
              "class": "",
              "price": "444",
              "originPrice": "870.24",
              "save": "426.24",
              "packageID": 390,
              "info": "请您再次确认所选的区域和规格<br />标准存储空间 500GB X 12 个月 - <span class='high-light'>华东地区</span>"
            },
            {
              "id": "kodo-north-500GB-6",
              "class": "",
              "price": "246",
              "originPrice": "435.12",
              "save": "189.12",
              "packageID": 366,
              "info": "请您再次确认所选的区域和规格<br />标准存储空间 500GB X 6 个月 - <span class='high-light'>华北地区</span>"
            },
            {
              "id": "kodo-north-500GB-12",
              "class": "",
              "price": "444",
              "originPrice": "870.24",
              "save": "426.24",
              "packageID": 393,
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
              "packageID": 375,
              "info": "请您再次确认所选的区域和规格<br />标准存储空间 1TB X 6 个月 - <span class='high-light'>华东地区</span>"
            },
            {
              "id": "kodo-east-1TB-12",
              "class": "",
              "price": "909",
              "originPrice": "1800.86",
              "save": "891.86",
              "packageID": 399,
              "info": "请您再次确认所选的区域和规格<br />标准存储空间 1TB X 12 个月 - <span class='high-light'>华东地区</span>"
            },
            {
              "id": "kodo-north-1TB-6",
              "class": "",
              "price": "503",
              "originPrice": "900.43",
              "save": "397.43",
              "packageID": 369,
              "info": "请您再次确认所选的区域和规格<br />标准存储空间 1TB X 6 个月 - <span class='high-light'>华北地区</span>"
            },
            {
              "id": "kodo-north-1TB-12",
              "class": "",
              "price": "909",
              "originPrice": "1800.86",
              "save": "891.86",
              "packageID": 396,
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
              "packageID": 378,
              "info": "请您再次确认所选的区域和规格<br />标准存储空间 5TB X 6 个月 - <span class='high-light'>华东地区</span>"
            },
            {
              "id": "kodo-east-5TB-12",
              "class": "",
              "price": "4546",
              "originPrice": "8927.90",
              "save": "4381.9",
              "packageID": 402,
              "info": "请您再次确认所选的区域和规格<br />标准存储空间 5TB X 12 个月 - <span class='high-light'>华东地区</span>"
            },
            {
              "id": "kodo-north-5TB-6",
              "class": "",
              "price": "2519",
              "originPrice": "4463.95\"",
              "save": "1944.95",
              "packageID": 381,
              "info": "请您再次确认所选的区域和规格<br />标准存储空间 5TB X 6 个月 - <span class='high-light'>华北地区</span>"
            },
            {
              "id": "kodo-north-5TB-12",
              "class": "",
              "price": "4546",
              "originPrice": "8927.90",
              "save": "4381.9",
              "packageID": 405,
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
              "packageID": 387,
              "info": "请您再次确认所选的区域和规格<br />标准存储空间 10TB X 6 个月 - <span class='high-light'>华东地区</span>"
            },
            {
              "id": "kodo-east-10TB-12",
              "class": "",
              "price": "9093",
              "originPrice": "17836.70",
              "save": "8743.7",
              "packageID": 411,
              "info": "请您再次确认所选的区域和规格<br />标准存储空间 10TB X 12 个月 - <span class='high-light'>华东地区</span>"
            },
            {
              "id": "kodo-north-10TB-6",
              "class": "",
              "price": "5038",
              "originPrice": "8918.35",
              "save": "3880.35",
              "packageID": 384,
              "info": "请您再次确认所选的区域和规格<br />标准存储空间 10TB X 6 个月 - <span class='high-light'>华北地区</span>"
            },
            {
              "id": "kodo-north-10TB-12",
              "class": "",
              "price": "9093",
              "originPrice": "17836.70",
              "save": "8743.7",
              "packageID": 408,
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
              "packageID": 243,
              "info": "请您再次确认所选的域名和规格<br />国内 HTTP 全时段静态加速流量 100GB，有效期 6 个月"
            },
            {
              "id": "fusion-https-100GB-6",
              "class": "",
              "price": "8.8",
              "originPrice": "28",
              "save": "19.2",
              "packageID": 255,
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
              "packageID": 246,
              "info": "请您再次确认所选的域名和规格<br />国内 HTTP 全时段静态加速流量 1TB，有效期 6 个月"
            },
            {
              "id": "fusion-https-1TB-6",
              "class": "",
              "price": "88",
              "originPrice": "280",
              "save": "192",
              "packageID": 258,
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
              "packageID": 249,
              "info": "请您再次确认所选的域名和规格<br />国内 HTTP 全时段静态加速流量 10TB，有效期 6 个月"
            },
            {
              "id": "fusion-https-10TB-6",
              "class": "",
              "price": "888",
              "originPrice": "2800",
              "save": "1912",
              "packageID": 261,
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
              "packageID": 252,
              "info": "请您再次确认所选的域名和规格<br />国内 HTTP 全时段静态加速流量 50TB，有效期 6 个月"
            },
            {
              "id": "fusion-https-50TB-6",
              "class": "",
              "price": "4321",
              "originPrice": "14000",
              "save": "9679",
              "packageID": 264,
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
              "packageID": 267,
              "info": "请您再次确认所选的域名和规格<br />国内 HTTP 全时段静态加速流量 1.2TB，按月发放 102.4GB/月，可结转，有效期 1 年"
            },
            {
              "id": "fusion-https-1dot2TB-12",
              "class": "",
              "price": "299",
              "originPrice": "344",
              "save": "45",
              "packageID": 270,
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
              "packageID": 273,
              "info": "请您再次确认所选的域名和规格<br />国内 HTTP 全时段静态加速流量 6TB，按月发放 512GB/月，可结转，有效期 1 年"
            },
            {
              "id": "fusion-https-6TB-12",
              "class": "",
              "price": "1199",
              "originPrice": "1720",
              "save": "521",
              "packageID": 294,
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
              "packageID": 276,
              "info": "请您再次确认所选的域名和规格<br />国内 HTTP 全时段静态加速流量 12TB，按月发放 1TB/月，可结转，有效期 1 年"
            },
            {
              "id": "fusion-https-12TB-12",
              "class": "",
              "price": "2299",
              "originPrice": "3441",
              "save": "1142",
              "packageID": 297,
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
              "packageID": 279,
              "info": "请您再次确认所选的域名和规格<br />国内 HTTP 全时段静态加速流量 60TB，按月发放 5TB/月，可结转，有效期 1 年"
            },
            {
              "id": "fusion-https-60TB-12",
              "class": "",
              "price": "10999",
              "originPrice": "17203",
              "save": "6204",
              "packageID": 300,
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
              "packageID": 282,
              "info": "请您再次确认所选的域名和规格<br />国内 HTTP 全时段静态加速流量 120TB，按月发放 10TB/月，可结转，有效期 1 年"
            },
            {
              "id": "fusion-https-120TB-12",
              "class": "",
              "price": "19999",
              "originPrice": "28262",
              "save": "8263",
              "packageID": 303,
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
              "packageID": 285,
              "info": "请您再次确认所选的域名和规格<br />国内 HTTP 全时段静态加速流量 240TB，按月发放 20TB/月，可结转，有效期 1 年"
            },
            {
              "id": "fusion-https-240TB-12",
              "class": "",
              "price": "36999",
              "originPrice": "56525",
              "save": "19526",
              "packageID": 306,
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
              "packageID": 288,
              "info": "请您再次确认所选的域名和规格<br />国内 HTTP 全时段静态加速流量 480TB，按月发放 40TB/月，可结转，有效期 1 年"
            },
            {
              "id": "fusion-https-480TB-12",
              "class": "",
              "price": "63999",
              "originPrice": "113050",
              "save": "49051",
              "packageID": 309,
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
              "packageID": 291,
              "info": "请您再次确认所选的域名和规格<br />国内 HTTP 全时段静态加速流量 1.2PB，按月发放 102.4TB/月，可结转，有效期 1 年"
            },
            {
              "id": "fusion-https-1dot2PB-12",
              "class": "",
              "price": "150999",
              "originPrice": "289407",
              "save": "138408",
              "packageID": 312,
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
          "packageID": 441,
          "info": "请您再次确认所选的规格<br />直播云 1TB 全年包"
        },
        {
          "title": "直播云 5TB 全年包",
          "desc": "约 5000 人同时在线观看标清 (2Mbps) 直播 12 小时",
          "price": "876",
          "originPrice": "1096",
          "save": "220",
          "packageID": 318,
          "info": "请您再次确认所选的规格<br />直播云 5TB 全年包"
        },
        {
          "title": "直播云 10TB 全年包",
          "desc": "约 1 万人同时在线观看标清 (2Mbps) 直播 24 小时",
          "price": "1736",
          "originPrice": "2170",
          "save": "434",
          "packageID": 456,
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
          "packageID": 456,
          "info": "请您再次确认所选的规格<br />直播云 10TB 全年包"
        },
        {
          "title": "直播云 50TB 全年包",
          "desc": "1 年有效，含上行及下行流量",
          "price": "7124",
          "originPrice": "8906",
          "save": "1782",
          "packageID": 321,
          "info": "请您再次确认所选的规格<br />直播云 50TB 全年包"
        },
        {
          "title": "直播云 200TB 全年包",
          "desc": "1 年有效，含上行及下行流量",
          "price": "24659",
          "originPrice": "30824",
          "save": "6165",
          "packageID": 444,
          "info": "请您再次确认所选的规格<br />直播云 200TB 全年包"
        },
        {
          "title": "直播云 1PB 全年包",
          "desc": "1 年有效，含上行及下行流量",
          "price": "120356",
          "originPrice": "150445",
          "save": "30089",
          "packageID": 447,
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
          "packageID": 339,
          "info": "请您再次确认所选的规格<br />短视频 SDK 一个月专业版"
        },
        {
          "title": "短视频 SDK 全年精简版",
          "tipClass": "blue",
          "tipText": "新春特惠",
          "type": "精简版",
          "duration": "1 年",
          "price": "1008",
          "originPrice": "2016",
          "save": "1008",
          "btnText": "立即抢购",
          "btnClass": "blue",
          "packageID": 342,
          "info": "请您再次确认所选的规格<br />短视频 SDK 全年精简版"
        },
        {
          "title": "短视频 SDK 全年基础版",
          "tipClass": "blue",
          "tipText": "新春特惠",
          "type": "基础版",
          "duration": "1 年",
          "price": "4068",
          "originPrice": "8136",
          "save": "4068",
          "btnText": "立即抢购",
          "btnClass": "blue",
          "packageID": 345,
          "info": "请您再次确认所选的规格<br />短视频 SDK 全年基础版"
        },
        {
          "title": "短视频 SDK 全年进阶版",
          "tipClass": "blue",
          "tipText": "新春特惠",
          "type": "进阶版",
          "duration": "1 年",
          "price": "30000",
          "originPrice": "60000",
          "save": "30000",
          "btnText": "立即抢购",
          "btnClass": "blue",
          "packageID": 348,
          "info": "请您再次确认所选的规格<br />短视频 SDK 全年进阶版"
        },
        {
          "title": "短视频 SDK 全年专业版",
          "tipClass": "blue",
          "tipText": "新春特惠",
          "type": "专业版",
          "duration": "1 年",
          "price": "60000",
          "originPrice": "120000",
          "save": "60000",
          "btnText": "立即抢购",
          "btnClass": "blue",
          "packageID": 351,
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
          "packageID": 192,
          "info": "请您再次确认所选的规格<br />云短信 3000 条系统短信起跑包"
        },
        {
          "title": "云短信 10000 条系统短信加速包",
          "desc": "1 年有效，限系统短信，0.024/条",
          "price": "240",
          "originPrice": "430",
          "save": "190",
          "packageID": 195,
          "info": "请您再次确认所选的规格<br />云短信 10000 条系统短信加速包"
        },
        {
          "title": "云短信 100000 条系统短信冲刺包",
          "desc": "1 年有效，限系统短信，0.023/条",
          "price": "2300",
          "originPrice": "4300",
          "save": "2000",
          "packageID": 198,
          "info": "请您再次确认所选的规格<br />云短信 100000 条系统短信冲刺包"
        },
        {
          "title": "云短信 3000 条推广短信起跑包",
          "desc": "1 年有效，限推广短信，0.034/条",
          "price": "102",
          "originPrice": "129",
          "save": "27",
          "packageID": 324,
          "info": "请您再次确认所选的规格<br />云短信 3000 条推广短信起跑包"
        },
        {
          "title": "云短信 10000 条推广短信加速包",
          "desc": "1 年有效，限推广短信，0.033/条",
          "price": "330",
          "originPrice": "430",
          "save": "100",
          "packageID": 327,
          "info": "请您再次确认所选的规格<br />云短信 10000 条推广短信加速包"
        },
        {
          "title": "云短信 100000 条推广短信冲刺包",
          "desc": "1 年有效，限推广短信，0.032/条",
          "price": "3200",
          "originPrice": "4300",
          "save": "1100",
          "packageID": 330,
          "info": "请您再次确认所选的规格<br />云短信 100000 条推广短信冲刺包"
        }
      ]
    }
  }

  # 2020 年春季采购活动套餐包配置信息
  config.spring_sale_package = {
    "kodo": {
      "cdnstandard": [
        {
          "title": "标准存储",
          "size": "100G",
          "unit": "/月",
          "desc": "区域可选华东/华北/华南",
          "isNew": false,
          "durations": [
            "text": "12 个月",
            "value": "12 个月"
          ],
          "areas": [
            {
              "value": "kodo-south-100G",
              "text": "华南"
            }, {
              "value": "kodo-north-100G",
              "text": "华北"
            }, {
              "value": "kodo-east-100G",
              "text": "华东"
            }
          ],
          "sections": [
            {
              "id": "kodo-south-100G",
              "class": "active",
              "price": "90",
              "originPrice": "106.92",
              "save": "16.92",
              "packageID": 870,
              "info": "请您再次确认所选的区域和规格<br />标准存储空间 100G X 12 个月 - <span class='high-light'>华南地区</span>"
            },
            {
              "id": "kodo-north-100G",
              "class": "",
              "price": "114",
              "originPrice": "159.84",
              "save": "45.84",
              "packageID": 924,
              "info": "请您再次确认所选的区域和规格<br />标准存储空间 100G X 12 个月 - <span class='high-light'>华北地区</span>"
            },
            {
              "id": "kodo-east-100G",
              "class": "",
              "price": "114",
              "originPrice": "159.84",
              "save": "45.84",
              "packageID": 900,
              "info": "请您再次确认所选的区域和规格<br />标准存储空间 100G X 12 个月 - <span class='high-light'>华东地区</span>"
            }
          ]
        },
        {
          "title": "标准存储",
          "size": "500G",
          "unit": "/月",
          "desc": "区域可选华东/华北/华南",
          "isNew": false,
          "durations": [
            "text": "12 个月",
            "value": "12 个月"
          ],
          "areas": [
            {
              "value": "kodo-south-500G",
              "text": "华南"
            }, {
              "value": "kodo-north-500G",
              "text": "华北"
            }, {
              "value": "kodo-east-500G",
              "text": "华东"
            }
          ],
          "sections": [
            {
              "id": "kodo-south-500G",
              "class": "active",
              "price": "450",
              "originPrice": "582.12",
              "save": "132.12",
              "packageID": 891,
              "info": "请您再次确认所选的区域和规格<br />标准存储空间 500G X 12 个月 - <span class='high-light'>华南地区</span>"
            },
            {
              "id": "kodo-north-500G",
              "class": "",
              "price": "570",
              "originPrice": "870.24",
              "save": "300.24",
              "packageID": 927,
              "info": "请您再次确认所选的区域和规格<br />标准存储空间 500G X 12 个月 - <span class='high-light'>华北地区</span>"
            },
            {
              "id": "kodo-east-500G",
              "class": "",
              "price": "570",
              "originPrice": "870.24",
              "save": "300.24",
              "packageID": 903,
              "info": "请您再次确认所选的区域和规格<br />标准存储空间 500G X 12 个月 - <span class='high-light'>华东地区</span>"
            }
          ]
        },
        {
          "title": "标准存储",
          "size": "1T",
          "unit": "/月",
          "desc": "区域可选华东/华北/华南",
          "isNew": false,
          "durations": [
            "text": "12 个月",
            "value": "12 个月"
          ],
          "areas": [
            {
              "value": "kodo-south-1T",
              "text": "华南"
            }, {
              "value": "kodo-north-1T",
              "text": "华北"
            }, {
              "value": "kodo-east-1T",
              "text": "华东"
            }
          ],
          "sections": [
            {
              "id": "kodo-south-1T",
              "class": "active",
              "price": "921.6",
              "originPrice": "1204.63",
              "save": "283.03",
              "packageID": 879,
              "info": "请您再次确认所选的区域和规格<br />标准存储空间 1T X 12 个月 - <span class='high-light'>华南地区</span>"
            },
            {
              "id": "kodo-north-1T",
              "class": "",
              "price": "1167.36",
              "originPrice": "1800.86",
              "save": "633.5",
              "packageID": 930,
              "info": "请您再次确认所选的区域和规格<br />标准存储空间 1T X 12 个月 - <span class='high-light'>华北地区</span>"
            },
            {
              "id": "kodo-east-1T",
              "class": "",
              "price": "1167.36",
              "originPrice": "1800.86",
              "save": "633.5",
              "packageID": 906,
              "info": "请您再次确认所选的区域和规格<br />标准存储空间 1T X 12 个月 - <span class='high-light'>华东地区</span>"
            }
          ]
        },
        {
          "title": "标准存储",
          "size": "2T",
          "unit": "/月",
          "desc": "区域可选华东/华北/华南",
          "isNew": false,
          "durations": [
            "text": "12 个月",
            "value": "12 个月"
          ],
          "areas": [
            {
              "value": "kodo-south-2T",
              "text": "华南"
            }, {
              "value": "kodo-north-2T",
              "text": "华北"
            }, {
              "value": "kodo-east-2T",
              "text": "华东"
            }
          ],
          "sections": [
            {
              "id": "kodo-south-2T",
              "class": "active",
              "price": "1843.2",
              "originPrice": "2421.14",
              "save": "577.94",
              "packageID": 888,
              "info": "请您再次确认所选的区域和规格<br />标准存储空间 2T X 12 个月 - <span class='high-light'>华南地区</span>"
            },
            {
              "id": "kodo-north-2T",
              "class": "",
              "price": "2334.72",
              "originPrice": "3582.62",
              "save": "1247.9",
              "packageID": 933,
              "info": "请您再次确认所选的区域和规格<br />标准存储空间 2T X 12 个月 - <span class='high-light'>华北地区</span>"
            },
            {
              "id": "kodo-east-2T",
              "class": "",
              "price": "2334.72",
              "originPrice": "3582.62",
              "save": "1247.9",
              "packageID": 909,
              "info": "请您再次确认所选的区域和规格<br />标准存储空间 2T X 12 个月 - <span class='high-light'>华东地区</span>"
            }
          ]
        },
        {
          "title": "标准存储",
          "size": "5T",
          "unit": "/月",
          "desc": "区域可选华东/华北/华南",
          "isNew": false,
          "durations": [
            "text": "12 个月",
            "value": "12 个月"
          ],
          "areas": [
            {
              "value": "kodo-south-5T",
              "text": "华南"
            }, {
              "value": "kodo-north-5T",
              "text": "华北"
            }, {
              "value": "kodo-east-5T",
              "text": "华东"
            }
          ],
          "sections": [
            {
              "id": "kodo-south-5T",
              "class": "active",
              "price": "4608",
              "originPrice": "6070.68",
              "save": "1462.68",
              "packageID": 897,
              "info": "请您再次确认所选的区域和规格<br />标准存储空间 5T X 12 个月 - <span class='high-light'>华南地区</span>"
            },
            {
              "id": "kodo-north-5T",
              "class": "",
              "price": "5836.8",
              "originPrice": "8927.9",
              "save": "3091.1",
              "packageID": 939,
              "info": "请您再次确认所选的区域和规格<br />标准存储空间 5T X 12 个月 - <span class='high-light'>华北地区</span>"
            },
            {
              "id": "kodo-east-5T",
              "class": "",
              "price": "5836.8",
              "originPrice": "8927.9",
              "save": "3091.1",
              "packageID": 912,
              "info": "请您再次确认所选的区域和规格<br />标准存储空间 5T X 12 个月 - <span class='high-light'>华东地区</span>"
            }
          ]
        },
        {
          "title": "标准存储",
          "size": "10T",
          "unit": "/月",
          "desc": "区域可选华东/华北/华南",
          "isNew": false,
          "durations": [
            "text": "12 个月",
            "value": "12 个月"
          ],
          "areas": [
            {
              "value": "kodo-south-10T",
              "text": "华南"
            }, {
              "value": "kodo-north-10T",
              "text": "华北"
            }, {
              "value": "kodo-east-10T",
              "text": "华东"
            }
          ],
          "sections": [
            {
              "id": "kodo-south-10T",
              "class": "active",
              "price": "9216",
              "originPrice": "12153.2",
              "save": "2937.2",
              "packageID": 876,
              "info": "请您再次确认所选的区域和规格<br />标准存储空间 10T X 12 个月 - <span class='high-light'>华南地区</span>"
            },
            {
              "id": "kodo-north-10T",
              "class": "",
              "price": "11673.6",
              "originPrice": "17836.7",
              "save": "6163.1",
              "packageID": 936,
              "info": "请您再次确认所选的区域和规格<br />标准存储空间 10T X 12 个月 - <span class='high-light'>华北地区</span>"
            },
            {
              "id": "kodo-east-10T",
              "class": "",
              "price": "11673.6",
              "originPrice": "17836.7",
              "save": "6163.1",
              "packageID": 915,
              "info": "请您再次确认所选的区域和规格<br />标准存储空间 10T X 12 个月 - <span class='high-light'>华东地区</span>"
            }
          ]
        },
        {
          "title": "标准存储",
          "size": "20T",
          "unit": "/月",
          "desc": "区域可选华东/华北/华南",
          "isNew": false,
          "durations": [
            "text": "12 个月",
            "value": "12 个月"
          ],
          "areas": [
            {
              "value": "kodo-south-20T",
              "text": "华南"
            }, {
              "value": "kodo-north-20T",
              "text": "华北"
            }, {
              "value": "kodo-east-20T",
              "text": "华东"
            }
          ],
          "sections": [
            {
              "id": "kodo-south-20T",
              "class": "active",
              "price": "18432",
              "originPrice": "24318.4",
              "save": "5886.4",
              "packageID": 885,
              "info": "请您再次确认所选的区域和规格<br />标准存储空间 20T X 12 个月 - <span class='high-light'>华南地区</span>"
            },
            {
              "id": "kodo-north-20T",
              "class": "",
              "price": "23347.2",
              "originPrice": "35654.3",
              "save": "12307.1",
              "packageID": 942,
              "info": "请您再次确认所选的区域和规格<br />标准存储空间 20T X 12 个月 - <span class='high-light'>华北地区</span>"
            },
            {
              "id": "kodo-east-20T",
              "class": "",
              "price": "23347.2",
              "originPrice": "35654.3",
              "save": "12307.1",
              "packageID": 918,
              "info": "请您再次确认所选的区域和规格<br />标准存储空间 20T X 12 个月 - <span class='high-light'>华东地区</span>"
            }
          ]
        },
        {
          "title": "标准存储",
          "size": "50T",
          "unit": "/月",
          "desc": "区域可选华东/华北/华南",
          "isNew": false,
          "durations": [
            "text": "12 个月",
            "value": "12 个月"
          ],
          "areas": [
            {
              "value": "kodo-south-50T",
              "text": "华南"
            }, {
              "value": "kodo-north-50T",
              "text": "华北"
            }, {
              "value": "kodo-east-50T",
              "text": "华东"
            }
          ],
          "sections": [
            {
              "id": "kodo-south-50T",
              "class": "active",
              "price": "46080",
              "originPrice": "60813.7",
              "save": "14733.7",
              "packageID": 894,
              "info": "请您再次确认所选的区域和规格<br />标准存储空间 50T X 12 个月 - <span class='high-light'>华南地区</span>"
            },
            {
              "id": "kodo-north-50T",
              "class": "",
              "price": "58368",
              "originPrice": "89107.1",
              "save": "30739.1",
              "packageID": 945,
              "info": "请您再次确认所选的区域和规格<br />标准存储空间 50T X 12 个月 - <span class='high-light'>华北地区</span>"
            },
            {
              "id": "kodo-east-50T",
              "class": "",
              "price": "58368",
              "originPrice": "89107.1",
              "save": "30739.1",
              "packageID": 921,
              "info": "请您再次确认所选的区域和规格<br />标准存储空间 50T X 12 个月 - <span class='high-light'>华东地区</span>"
            }
          ]
        }
      ],
      "cdnin": [
        {
          "title": "CDN 回源流量",
          "size": "500G",
          "unit": "/年",
          "duration": "1 年",
          "zone": "国内任意区域",
          "desc": "1 年内任意月用完即止",
          "sections": [
            {
              "id": "",
              "class": "active",
              "price": "75",
              "packageID": 957,
              "info": "请您再次确认所选的区域和规格<br />CDN 回源流量 500G X 1 年"
            }
          ]
        },
        {
          "title": "CDN 回源流量",
          "size": "2T",
          "unit": "/年",
          "duration": "1 年",
          "zone": "国内任意区域",
          "desc": "1 年内任意月用完即止",
          "sections": [
            {
              "id": "",
              "class": "active",
              "price": "307.2",
              "packageID": 954,
              "info": "请您再次确认所选的区域和规格<br />CDN 回源流量 2T X 1 年"
            }
          ]
        },
        {
          "title": "CDN 回源流量",
          "size": "5T",
          "unit": "/年",
          "duration": "1 年",
          "zone": "国内任意区域",
          "desc": "1 年内任意月用完即止",
          "sections": [
            {
              "id": "",
              "class": "active",
              "price": "768",
              "packageID": 948,
              "info": "请您再次确认所选的区域和规格<br />CDN 回源流量 5T X 1 年"
            }
          ]
        },
        {
          "title": "CDN 回源流量",
          "size": "20T",
          "unit": "/年",
          "duration": "1 年",
          "zone": "国内任意区域",
          "desc": "1 年内任意月用完即止",
          "sections": [
            {
              "id": "",
              "class": "active",
              "price": "3072",
              "packageID": 951,
              "info": "请您再次确认所选的区域和规格<br />CDN 回源流量 20T X 1 年"
            }
          ]
        }
      ],
      "cdnout": [
        {
          "title": "外网流出流量",
          "size": "50G",
          "unit": "/月",
          "duration": "12 个月",
          "zone": "国内任意区域",
          "desc": "特惠体验，不可结转， 限购一个(体验包)",
          "sections": [
            {
              "id": "",
              "class": "active",
              "price": "144",
              "packageID": 726,
              "info": "请您再次确认所选的区域和规格<br />外网流出流量 50G X 12 月"
            }
          ]
        },
        {
          "title": "外网流出流量",
          "size": "100G",
          "unit": "/月",
          "duration": "12 个月",
          "zone": "国内任意区域",
          "desc": "不可结转",
          "sections": [
            {
              "id": "",
              "class": "active",
              "price": "348",
              "packageID": 738,
              "info": "请您再次确认所选的区域和规格<br />外网流出流量 100G X 12 月"
            }
          ]
        },
        {
          "title": "外网流出流量",
          "size": "500G",
          "unit": "/月",
          "duration": "12 个月",
          "zone": "国内任意区域",
          "desc": "不可结转",
          "sections": [
            {
              "id": "",
              "class": "active",
              "price": "1740",
              "packageID": 750,
              "info": "请您再次确认所选的区域和规格<br />外网流出流量 500G X 12 月"
            }
          ]
        },
        {
          "title": "外网流出流量",
          "size": "1T",
          "unit": "/月",
          "duration": "12 个月",
          "zone": "国内任意区域",
          "desc": "不可结转",
          "sections": [
            {
              "id": "",
              "class": "active",
              "price": "3563.52",
              "packageID": 762,
              "info": "请您再次确认所选的区域和规格<br />外网流出流量 1T X 12 月"
            }
          ]
        }
      ]
    },
    "fusion": {
      "products": [
        {
          "title": "复工采购季-国内HTTP流量 ",
          "size": "100GB",
          "duration": "12 个月",
          "protocol": "http",
          "desc": "一次性发放",
          "sections": [
            {
              "id": "kodo-south-500GB-6",
              "class": "active",
              "price": "8.8",
              "originPrice": "21.6",
              "save": "12.8",
              "packageID": 243,
              "info": "请您再次确认所选的区域和规格<br />复工采购季-国内HTTP流量 100GB X 12 个月 - <span class='high-light'>国内</span>"
            }
          ]
        },
        {
          "title": "复工采购季-国内HTTP流量 ",
          "size": "1TB",
          "duration": "12 个月",
          "protocol": "http",
          "desc": "一次性发放",
          "sections": [
            {
              "id": "kodo-south-500GB-6",
              "class": "active",
              "price": "88",
              "originPrice": "243.36",
              "save": "155.36",
              "packageID": 246,
              "info": "请您再次确认所选的区域和规格<br />复工采购季-国内HTTP流量 1T X 12 个月 - <span class='high-light'>国内</span>"
            }
          ]
        },
        {
          "title": "复工采购季-国内HTTPS流量 ",
          "size": "100GB",
          "duration": "12 个月",
          "protocol": "https",
          "desc": "一次性发放",
          "sections": [
            {
              "id": "kodo-south-500GB-6",
              "class": "active",
              "price": "9.9",
              "originPrice": "25.2",
              "save": "15.3",
              "packageID": 255,
              "info": "请您再次确认所选的区域和规格<br />复工采购季-国内HTTPS流量 100GB X 12 个月 - <span class='high-light'>国内</span>"
            }
          ]
        },
        {
          "title": "复工采购季-国内HTTPS流量 ",
          "size": "1TB",
          "duration": "12 个月",
          "protocol": "https",
          "desc": "一次性发放",
          "sections": [
            {
              "id": "kodo-south-500GB-6",
              "class": "active",
              "price": "99",
              "originPrice": "283.92",
              "save": "184.92",
              "packageID": 258,
              "info": "请您再次确认所选的区域和规格<br />标准存储空间 复工采购季-国内HTTPS流量 1T X 12 个月 - <span class='high-light'>国内</span>"
            }
          ]
        }
      ]
    },
    "pili": {
      "products": [
        {
          "title": "直播流量包",
          "size": "500GB",
          "desc": "(1 年有效期)",
          "subDesc": "约 500 人同时在线观看标清（1Mbps）直播 2 小时",
          "sections": [
            {
              "id": "kodo-south-500GB-6",
              "class": "active",
              "price": "88",
              "originPrice": "92",
              "save": "4",
              "packageID": 975,
              "info": "请您再次确认所选的区域和规格<br />直播流量包 500GB"
            }
          ]
        },
        {
          "title": "直播流量包",
          "size": "1TB",
          "desc": "(1 年有效期)",
          "subDesc": "约 1000 人同时在线观看标清（1Mbps）直播 2 小时",
          "sections": [
            {
              "id": "kodo-south-500GB-6",
              "class": "active",
              "price": "168",
              "originPrice": "186",
              "save": "18",
              "packageID": 978,
              "info": "请您再次确认所选的区域和规格<br />直播流量包 1T"
            }
          ]
        },
        {
          "title": "直播流量包",
          "size": "5TB",
          "desc": "(1 年有效期)",
          "subDesc": "约 5000 人同时在线观看高清（2Mbps）直播 2 小时",
          "sections": [
            {
              "id": "kodo-south-500GB-6",
              "class": "active",
              "price": "688",
              "originPrice": "876",
              "save": "188",
              "packageID": 981,
              "info": "请您再次确认所选的区域和规格<br />直播流量包 5T"
            }
          ]
        },
        {
          "title": "直播流量包",
          "size": "10TB",
          "desc": "(1 年有效期)",
          "subDesc": "约 10000 人同时在线观看高清（2Mbps）直播 2 小时",
          "sections": [
            {
              "id": "kodo-south-500GB-6",
              "class": "active",
              "price": "1268",
              "originPrice": "1736",
              "save": "468",
              "packageID": 984,
              "info": "请您再次确认所选的区域和规格<br />直播流量包 10T"
            }
          ]
        }
      ]
    },
    "dora": {
      "h264": {
        "title": "H.264 普通转码包",
        "tabs": [
          {
            "id": "h264-sd480",
            "class": "active",
            "text": "SD480"
          },
          {
            "id": "h264-sd720",
            "class": "",
            "text": "SD720"
          },
          {
            "id": "h264-hd1080",
            "class": "",
            "text": "HD1080"
          }
        ]
      },
      "h265": {
        "title": "H.265 普通转码包",
        "tabs": [
          {
            "id": "h265-sd480",
            "class": "active",
            "text": "SD480"
          },
          {
            "id": "h265-sd720",
            "class": "",
            "text": "SD720"
          },
          {
            "id": "h265-hd1080",
            "class": "",
            "text": "HD1080"
          }
        ]
      },
      "packages264": [
        {
          "title": "精简版",
          "spec": "5 千分钟/半年",
          "sections": [
            {
              "id": "",
              "class": "h264-sd480 active",
              "price": "29.16",
              "originPrice": "36",
              "save": "6.84",
              "packageID": 990,
              "info": "请您再次确认所选的区域和规格<br />H.264普通转码包 SD480 5 千分钟/半年"
            },
            {
              "id": "",
              "class": "h264-sd720",
              "price": "76.55",
              "originPrice": "94.5",
              "save": "17.95",
              "packageID": 1002,
              "info": "请您再次确认所选的区域和规格<br />H.264普通转码包 SD720 5 千分钟/半年"
            },
            {
              "id": "",
              "class": "h264-hd1080",
              "price": "131.22",
              "originPrice": "162",
              "save": "30.78",
              "packageID": 1014,
              "info": "请您再次确认所选的区域和规格<br />H.264普通转码包 HD1080 5 千分钟/半年"
            }
          ]
        },
        {
          "title": "基础版",
          "spec": "2 万分钟/半年",
          "sections": [
            {
              "id": "",
              "class": "h264-sd480 active",
              "price": "116.64",
              "originPrice": "144",
              "save": "27.36",
              "packageID": 993,
              "info": "请您再次确认所选的区域和规格<br />H.264普通转码包 SD480 2 万分钟/半年"
            },
            {
              "id": "",
              "class": "h264-sd720",
              "price": "306.18",
              "originPrice": "378",
              "save": "71.82",
              "packageID": 1005,
              "info": "请您再次确认所选的区域和规格<br />H.264普通转码包 SD720 2 万分钟/半年"
            },
            {
              "id": "",
              "class": "h264-hd1080",
              "price": "524.88",
              "originPrice": "648",
              "save": "123.12",
              "packageID": 1017,
              "info": "请您再次确认所选的区域和规格<br />H.264普通转码包 HD1080 2 万分钟/半年"
            }
          ]
        },
        {
          "title": "进阶版",
          "spec": "10 万分钟/半年",
          "sections": [
            {
              "id": "",
              "class": "h264-sd480 active",
              "price": "583.2",
              "originPrice": "720",
              "save": "136.8",
              "packageID": 996,
              "info": "请您再次确认所选的区域和规格<br />H.264普通转码包 SD480 10 万分钟/半年"
            },
            {
              "id": "",
              "class": "h264-sd720",
              "price": "1530.9",
              "originPrice": "1890",
              "save": "359.1",
              "packageID": 1008,
              "info": "请您再次确认所选的区域和规格<br />H.264普通转码包 SD720 10 万分钟/半年"
            },
            {
              "id": "",
              "class": "h264-hd1080",
              "price": "2624.4",
              "originPrice": "3240",
              "save": "615.6",
              "packageID": 1020,
              "info": "请您再次确认所选的区域和规格<br />H.264普通转码包 HD1080 10 万分钟/半年"
            }
          ]
        },
        {
          "title": "进阶版",
          "spec": "30 万分钟/半年",
          "sections": [
            {
              "id": "",
              "class": "h264-sd480 active",
              "price": "1749.6",
              "originPrice": "2160",
              "save": "410.4",
              "packageID": 999,
              "info": "请您再次确认所选的区域和规格<br />H.264普通转码包 SD480 30 万分钟/半年"
            },
            {
              "id": "",
              "class": "h264-sd720",
              "price": "4592.7",
              "originPrice": "5670",
              "save": "1077.3",
              "packageID": 1011,
              "info": "请您再次确认所选的区域和规格<br />H.264普通转码包 SD720 30 万分钟/半年"
            },
            {
              "id": "",
              "class": "h264-hd1080",
              "price": "7873.2",
              "originPrice": "9720",
              "save": "1846.8",
              "packageID": 1023,
              "info": "请您再次确认所选的区域和规格<br />H.264普通转码包 HD1080 30 万分钟/半年"
            }
          ]
        }
      ],
      "packages265": [
        {
          "title": "精简版",
          "spec": "5 千分钟/半年",
          "sections": [
            {
              "id": "",
              "class": "h265-sd480 active",
              "price": "145.8",
              "originPrice": "180",
              "save": "34.2",
              "packageID": 1026,
              "info": "请您再次确认所选的区域和规格<br />H.265普通转码包 SD480 5 千分钟/半年"
            },
            {
              "id": "",
              "class": "h265-sd720",
              "price": "382.73",
              "originPrice": "472.5",
              "save": "89.77",
              "packageID": 1038,
              "info": "请您再次确认所选的区域和规格<br />H.265普通转码包 SD720 5 千分钟/半年"
            },
            {
              "id": "",
              "class": "h265-hd1080",
              "price": "656.1",
              "originPrice": "810",
              "save": "153.9",
              "packageID": 1050,
              "info": "请您再次确认所选的区域和规格<br />H.265普通转码包 HD1080 5 千分钟/半年"
            }
          ]
        },
        {
          "title": "基础版",
          "spec": "2 万分钟/半年",
          "sections": [
            {
              "id": "",
              "class": "h265-sd480 active",
              "price": "583.2",
              "originPrice": "720",
              "save": "136.8",
              "packageID": 1029,
              "info": "请您再次确认所选的区域和规格<br />H.265普通转码包 SD480 2 万分钟/半年"
            },
            {
              "id": "",
              "class": "h265-sd720",
              "price": "1530.9",
              "originPrice": "1890",
              "save": "359.1",
              "packageID": 1041,
              "info": "请您再次确认所选的区域和规格<br />H.265普通转码包 SD720 2 万分钟/半年"
            },
            {
              "id": "",
              "class": "h265-hd1080",
              "price": "2624.4",
              "originPrice": "3240",
              "save": "615.6",
              "packageID": 1053,
              "info": "请您再次确认所选的区域和规格<br />H.265普通转码包 HD1080 2 万分钟/半年"
            }
          ]
        },
        {
          "title": "进阶版",
          "spec": "10 万分钟/半年",
          "sections": [
            {
              "id": "",
              "class": "h265-sd480 active",
              "price": "2916",
              "originPrice": "3600",
              "save": "684",
              "packageID": 1032,
              "info": "请您再次确认所选的区域和规格<br />H.265普通转码包 SD480 10 万分钟/半年"
            },
            {
              "id": "",
              "class": "h265-sd720",
              "price": "7654.5",
              "originPrice": "9450",
              "save": "1795.5",
              "packageID": 1044,
              "info": "请您再次确认所选的区域和规格<br />H.265普通转码包 SD720 10 万分钟/半年"
            },
            {
              "id": "",
              "class": "h265-hd1080",
              "price": "13122",
              "originPrice": "16200",
              "save": "3078",
              "packageID": 1056,
              "info": "请您再次确认所选的区域和规格<br />H.265普通转码包 HD1080 10 万分钟/半年"
            }
          ]
        },
        {
          "title": "进阶版",
          "spec": "30 万分钟/半年",
          "sections": [
            {
              "id": "",
              "class": "h265-sd480 active",
              "price": "8748",
              "originPrice": "10800",
              "save": "2052",
              "packageID": 1035,
              "info": "请您再次确认所选的区域和规格<br />H.265普通转码包 SD480 30 万分钟/半年"
            },
            {
              "id": "",
              "class": "h265-sd720",
              "price": "22963.5",
              "originPrice": "28350",
              "save": "5386.5",
              "packageID": 1047,
              "info": "请您再次确认所选的区域和规格<br />H.265普通转码包 SD720 30 万分钟/半年"
            },
            {
              "id": "",
              "class": "h265-hd1080",
              "price": "39366",
              "originPrice": "48600",
              "save": "9234",
              "packageID": 1059,
              "info": "请您再次确认所选的区域和规格<br />H.265普通转码包 HD1080 30 万分钟/半年"
            }
          ]
        }
      ],
      "tables": [
        {
          "type": "音视频元信息",
          "duration": "100 千次/半年",
          "discount": "8 折",
          "price": "8",
          "packageID": 1062,
          "info": "请您再次确认所选的区域和规格<br />音视频元信息 - avinfo 100 千次/半年"
        },
        {
          "type": "视频截图",
          "duration": "400 千次/半年",
          "discount": "8 折",
          "price": "32",
          "packageID": 1065,
          "info": "请您再次确认所选的区域和规格<br />视频截图 - vframe 400 千次/半年"
        },
        {
          "type": "锐智转码 SD720",
          "duration": "500 分钟/半年",
          "discount": "8 折",
          "price": "32",
          "packageID": 1068,
          "info": "请您再次确认所选的区域和规格<br />锐智转码 SD720 500 分钟/半年"
        },
        {
          "type": "图片瘦身",
          "duration": "500 千次/半年",
          "discount": "8 折",
          "price": "40",
          "packageID": 1071,
          "info": "请您再次确认所选的区域和规格<br />图片瘦身 500 千次/半年"
        }
      ]
    },
    "sdk": {
      "table": [
        {
          "title": "短视频 SDK 一个月专业版",
          "tipClass": "red",
          "tipText": "新用户专享",
          "type": "专业版",
          "duration": "1 个月",
          "price": "0",
          "originPrice": "10000",
          "save": "10000",
          "btnText": "立即抢购",
          "btnClass": "orange",
          "packageID": 960,
          "info": "请您再次确认所选的规格<br />短视频 SDK 一个月专业版"
        },
        {
          "title": "短视频 SDK 全年精简版",
          "tipClass": "red",
          "tipText": "新春特惠",
          "type": "精简版",
          "duration": "1 年",
          "price": "1512",
          "originPrice": "2016",
          "save": "504",
          "btnText": "立即抢购",
          "btnClass": "blue",
          "packageID": 963,
          "info": "请您再次确认所选的规格<br />短视频 SDK 全年精简版"
        },
        {
          "title": "短视频 SDK 全年基础版",
          "tipClass": "red",
          "tipText": "新春特惠",
          "type": "基础版",
          "duration": "1 年",
          "price": "6102",
          "originPrice": "8136",
          "save": "2034",
          "btnText": "立即抢购",
          "btnClass": "orange",
          "packageID": 966,
          "info": "请您再次确认所选的规格<br />短视频 SDK 全年基础版"
        },
        {
          "title": "短视频 SDK 全年进阶版",
          "tipClass": "red",
          "tipText": "新春特惠",
          "type": "进阶版",
          "duration": "1 年",
          "price": "45000",
          "originPrice": "60000",
          "save": "15000",
          "btnText": "立即抢购",
          "btnClass": "blue",
          "packageID": 969,
          "info": "请您再次确认所选的规格<br />短视频 SDK 全年进阶版"
        },
        {
          "title": "短视频 SDK 全年专业版",
          "tipClass": "red",
          "tipText": "新春特惠",
          "type": "专业版",
          "duration": "1 年",
          "price": "90000",
          "originPrice": "120000",
          "save": "30000",
          "btnText": "立即抢购",
          "btnClass": "orange",
          "packageID": 972,
          "info": "请您再次确认所选的规格<br />短视频 SDK 全年专业版"
        }
      ]
    },
    "qvm": {
      "rebatesQvm": [
        {
          "title": "突发性能型 ",
          "size": "T5",
          "spec": "1C/1G/40G",
          "wide": "1Mbps",
          "desc": "买 6 个月送 6 个月",
          "sections": [
            {
              "id": "",
              "class": "active",
              "price": "329",
              "originPrice": "681",
              "save": "352",
              "packageID": 0,
              "info": "请您再次确认所选的区域和规格<br />突发性能型 T5 1C/1G/40G 1Mbps X 12 个月",
              "url": "https://portal.qiniu.com/qvm/vm/instance/create?mode=DirectOrder&instance_type=ecs.t5-lc1m1.small&buymonth=12&eip=1"
            }
          ]
        },
        {
          "title": "突发性能型 ",
          "size": "T5",
          "spec": "2C/4G/40G",
          "wide": "1Mbps",
          "desc": "买 6 个月送 6 个月",
          "sections": [
            {
              "id": "",
              "class": "active",
              "price": "837",
              "originPrice": "1674.6",
              "save": "837.6",
              "packageID": 0,
              "info": "请您再次确认所选的区域和规格<br />突发性能型 T5 2C/4G/40G 1Mbps X 12 个月",
              "url": "https://portal.qiniu.com/qvm/vm/instance/create?mode=DirectOrder&instance_type=ecs.t5-c1m2.large&buymonth=12&eip=1"
            }
          ]
        }
      ],
      "products": [
        {
          "title": "突发性能型 ",
          "size": "T5",
          "spec": "1C/1G/40G",
          "wide": "1Mbps",
          "durations": [
            {
              "text": "1 个月",
              "value": "qvm-1c-t5-1m"
            },
            {
              "text": "12 个月",
              "value": "qvm-1c-t5-12m"
            },
            {
              "text": "36 个月",
              "value": "qvm-1c-t5-36m"
            }
          ],
          "sections": [
            {
              "id": "qvm-1c-t5-1m",
              "class": "active",
              "price": "47.7",
              "originPrice": "56.7",
              "save": "9",
              "packageID": 0,
              "info": "请您再次确认所选的区域和规格<br />突发性能型 T5 1C/1G/40G 1Mbps X 1 个月",
              "url": "https://portal.qiniu.com/qvm/vm/instance/create?mode=DirectOrder&instance_type=ecs.t5-lc1m1.small&buymonth=1&eip=1"
            },
            {
              "id": "qvm-1c-t5-12m",
              "class": "",
              "price": "492.3",
              "originPrice": "681",
              "save": "188.7",
              "packageID": 0,
              "info": "请您再次确认所选的区域和规格<br />突发性能型 T5 1C/1G/40G 1Mbps X 12 个月",
              "url": "https://portal.qiniu.com/qvm/vm/instance/create?mode=DirectOrder&instance_type=ecs.t5-lc1m1.small&buymonth=12&eip=1"
            },
            {
              "id": "qvm-1c-t5-36m",
              "class": "",
              "price": "1192.26",
              "originPrice": "2041.2",
              "save": "848.94",
              "packageID": 0,
              "info": "请您再次确认所选的区域和规格<br />突发性能型 T5 1C/1G/40G 1Mbps X 36 个月",
              "url": "https://portal.qiniu.com/qvm/vm/instance/create?mode=DirectOrder&instance_type=ecs.t5-lc1m1.small&buymonth=36&eip=1"
            }
          ] 
        },
        {
          "title": "突发性能型 ",
          "size": "T5",
          "spec": "2C/2G/40G",
          "wide": "1Mbps",
          "durations": [
            {
              "text": "1 个月",
              "value": "qvm-2c-t5-1m"
            },
            {
              "text": "12 个月",
              "value": "qvm-2c-t5-12m"
            },
            {
              "text": "36 个月",
              "value": "qvm-2c-t5-36m"
            }
          ],
          "sections": [
            {
              "id": "qvm-2c-t5-1m",
              "class": "active",
              "price": "92.28",
              "originPrice": "109.9",
              "save": "17.62",
              "packageID": 0,
              "info": "请您再次确认所选的区域和规格<br />突发性能型 T5 2C/2G/40G 1Mbps X 1 个月",
              "url": "https://portal.qiniu.com/qvm/vm/instance/create?mode=DirectOrder&instance_type=ecs.t5-c1m1.large&buymonth=1&eip=1"
            },
            {
              "id": "qvm-2c-t5-12m",
              "class": "",
              "price": "924.65",
              "originPrice": "1318.2",
              "save": "393.55",
              "packageID": 0,
              "info": "请您再次确认所选的区域和规格<br />突发性能型 T5 2C/2G/40G 1Mbps X 12 个月",
              "url": "https://portal.qiniu.com/qvm/vm/instance/create?mode=DirectOrder&instance_type=ecs.t5-c1m1.large&buymonth=12&eip=1"
            },
            {
              "id": "qvm-2c-t5-36m",
              "class": "",
              "price": "2089.44",
              "originPrice": "3956.4",
              "save": "1866.96",
              "packageID": 0,
              "info": "请您再次确认所选的区域和规格<br />突发性能型 T5 2C/2G/40G 1Mbps X 36 个月",
              "url": "https://portal.qiniu.com/qvm/vm/instance/create?mode=DirectOrder&instance_type=ecs.t5-c1m1.large&buymonth=36&eip=1"
            }
          ] 
        },
        {
          "title": "共享型云服务器 ",
          "size": "XN4",
          "spec": "1C/1G/40G",
          "wide": "1Mbps",
          "durations": [
            {
              "text": "1 个月",
              "value": "qvm-xn4-1c-1m"
            },
            {
              "text": "12 个月",
              "value": "qvm-xn4-1c-12m"
            },
            {
              "text": "36 个月",
              "value": "qvm-xn4-1c-36m"
            }
          ],
          "sections": [
            {
              "id": "qvm-xn4-1c-1m",
              "class": "active",
              "price": "63.5",
              "originPrice": "75.6",
              "save": "12.1",
              "packageID": 0,
              "info": "请您再次确认所选的区域和规格<br />共享型云服务器 XN4 1C/1G/40G 1Mbps X 1 个月",
              "url": "https://portal.qiniu.com/qvm/vm/instance/create?mode=DirectOrder&instance_type=ecs.xn4.small&buymonth=1&eip=1"
            },
            {
              "id": "qvm-xn4-1c-12m",
              "class": "",
              "price": "646.2",
              "originPrice": "743",
              "save": "96.8",
              "packageID": 0,
              "info": "请您再次确认所选的区域和规格<br />共享型云服务器 XN4 1C/1G/40G 1Mbps X 12 个月",
              "url": "https://portal.qiniu.com/qvm/vm/instance/create?mode=DirectOrder&instance_type=ecs.xn4.small&buymonth=12&eip=1"
            },
            {
              "id": "qvm-xn4-1c-36m",
              "class": "",
              "price": "1511.59",
              "originPrice": "2721.6",
              "save": "1210.01",
              "packageID": 0,
              "info": "请您再次确认所选的区域和规格<br />共享型云服务器 XN4 1C/1G/40G 1Mbps X 36 个月",
              "url": "https://portal.qiniu.com/qvm/vm/instance/create?mode=DirectOrder&instance_type=ecs.xn4.small&buymonth=36&eip=1"
            }
          ] 
        },
        {
          "title": "共享型云服务器 ",
          "size": "C5",
          "spec": "1C/1G/40G",
          "wide": "1Mbps",
          "durations": [
            {
              "text": "1 个月",
              "value": "qvm-c5-1c-1m"
            },
            {
              "text": "12 个月",
              "value": "qvm-c5-1c-12m"
            },
            {
              "text": "36 个月",
              "value": "qvm-c5-1c-36m"
            }
          ],
          "sections": [
            {
              "id": "qvm-c5-1c-1m",
              "class": "active",
              "price": "164.8",
              "originPrice": "196.2",
              "save": "31.4",
              "packageID": 0,
              "info": "请您再次确认所选的区域和规格<br />共享型云服务器 C5 1C/1G/40G 1Mbps X 1 个月",
              "url": "https://portal.qiniu.com/qvm/vm/instance/create?mode=DirectOrder&instance_type=ecs.c5.large&buymonth=1&eip=1"
            },
            {
              "id": "qvm-c5-1c-12m",
              "class": "",
              "price": "1628",
              "originPrice": "2355",
              "save": "727",
              "packageID": 0,
              "info": "请您再次确认所选的区域和规格<br />共享型云服务器 C5 1C/1G/40G 1Mbps X 12 个月",
              "url": "https://portal.qiniu.com/qvm/vm/instance/create?mode=DirectOrder&instance_type=ecs.c5.large&buymonth=12&eip=1"
            },
            {
              "id": "qvm-c5-1c-36m",
              "class": "",
              "price": "3549.25",
              "originPrice": "7063.2",
              "save": "3513.95",
              "packageID": 0,
              "info": "请您再次确认所选的区域和规格<br />共享型云服务器 C5 1C/1G/40G 1Mbps X 36 个月",
              "url": "https://portal.qiniu.com/qvm/vm/instance/create?mode=DirectOrder&instance_type=ecs.c5.large&buymonth=36&eip=1"
            }
          ] 
        },
        {
          "title": "计算网络增强型 ",
          "size": "SN1NE",
          "spec": "2C/4G/40G",
          "wide": "2Mbps",
          "durations": [
            {
              "text": "3 个月",
              "value": "qvm-sn1ne-2c-3m"
            },
            {
              "text": "12 个月",
              "value": "qvm-sn1ne-2c-12m"
            },
            {
              "text": "36 个月",
              "value": "qvm-sn1ne-2c-36m"
            }
          ],
          "sections": [
            {
              "id": "qvm-sn1ne-2c-3m",
              "class": "active",
              "price": "590.5",
              "originPrice": "702.93",
              "save": "112.43",
              "packageID": 0,
              "info": "请您再次确认所选的区域和规格<br />计算网络增强型 SN1NE 2C/4G/40G 2Mbps X 3 个月",
              "url": "https://portal.qiniu.com/qvm/vm/instance/create?mode=DirectOrder&instance_type=ecs.sn1ne.large&buymonth=3&eip=2"
            },
            {
              "id": "qvm-sn1ne-2c-12m",
              "class": "",
              "price": "1956.7",
              "originPrice": "2811.72",
              "save": "855.02",
              "packageID": 0,
              "info": "请您再次确认所选的区域和规格<br />计算网络增强型 SN1NE 2C/4G/40G 2Mbps X 12 个月",
              "url": "https://portal.qiniu.com/qvm/vm/instance/create?mode=DirectOrder&instance_type=ecs.sn1ne.large&buymonth=12&eip=2"
            },
            {
              "id": "qvm-sn1ne-2c-36m",
              "class": "",
              "price": "4413.2",
              "originPrice": "8345.16",
              "save": "3931.9",
              "packageID": 0,
              "info": "请您再次确认所选的区域和规格<br />计算网络增强型 SN1NE 2C/4G/40G 2Mbps X 36 个月",
              "url": "https://portal.qiniu.com/qvm/vm/instance/create?mode=DirectOrder&instance_type=ecs.sn1ne.large&buymonth=36&eip=2"
            }
          ] 
        },
        {
          "title": "共享型云服务器 ",
          "size": "C5",
          "spec": "2C/4G/40G",
          "wide": "2Mbps",
          "durations": [
            {
              "text": "3 个月",
              "value": "qvm-c5-2c-2mps-3m"
            },
            {
              "text": "12 个月",
              "value": "qvm-c5-2c-2mps-12m"
            },
            {
              "text": "36 个月",
              "value": "qvm-c5-2c-2mps-36m"
            }
          ],
          "sections": [
            {
              "id": "qvm-c5-2c-2mps-3m",
              "class": "active",
              "price": "549.6",
              "originPrice": "654.3",
              "save": "104.7",
              "packageID": 0,
              "info": "请您再次确认所选的区域和规格<br />共享型云服务器 C5 2C/4G/40G 2Mbps X 3 个月",
              "url": "https://portal.qiniu.com/qvm/vm/instance/create?mode=DirectOrder&instance_type=ecs.c5.large&buymonth=3&eip=2"
            },
            {
              "id": "qvm-c5-2c-2mps-12m",
              "class": "",
              "price": "1825",
              "originPrice": "2108",
              "save": "283",
              "packageID": 0,
              "info": "请您再次确认所选的区域和规格<br />共享型云服务器 C5 2C/4G/40G 2Mbps X 12 个月",
              "url": "https://portal.qiniu.com/qvm/vm/instance/create?mode=DirectOrder&instance_type=ecs.c5.large&buymonth=12&eip=2"
            },
            {
              "id": "qvm-c5-2c-2mps-36m",
              "class": "",
              "price": "4139.5",
              "originPrice": "7851.6",
              "save": "3712.1",
              "packageID": 0,
              "info": "请您再次确认所选的区域和规格<br />共享型云服务器 C5 2C/4G/40G 2Mbps X 36 个月",
              "url": "https://portal.qiniu.com/qvm/vm/instance/create?mode=DirectOrder&instance_type=ecs.c5.large&buymonth=36&eip=2"
            }
          ] 
        },
        {
          "title": "共享型云服务器 ",
          "size": "C5",
          "spec": "4C/8G/40G",
          "wide": "5Mbps",
          "durations": [
            {
              "text": "3 个月",
              "value": "qvm-c5-4c-5mps-3m"
            },
            {
              "text": "12 个月",
              "value": "qvm-c5-4c-5mps-12m"
            },
            {
              "text": "36 个月",
              "value": "qvm-c5-4c-5mps-36m"
            }
          ],
          "sections": [
            {
              "id": "qvm-c5-4c-5mps-3m",
              "class": "active",
              "price": "1144.7",
              "originPrice": "1362.75",
              "save": "218.05",
              "packageID": 0,
              "info": "请您再次确认所选的区域和规格<br />共享型云服务器 C5 4C/8G/40G 5Mbps X 3 个月",
              "url": "https://portal.qiniu.com/qvm/vm/instance/create?mode=DirectOrder&instance_type=ecs.c5.xlarge&buymonth=3&eip=5"
            },
            {
              "id": "qvm-c5-4c-5mps-12m",
              "class": "",
              "price": "3812",
              "originPrice": "4401",
              "save": "589",
              "packageID": 0,
              "info": "请您再次确认所选的区域和规格<br />共享型云服务器 C5 4C/8G/40G 5Mbps X 12 个月",
              "url": "https://portal.qiniu.com/qvm/vm/instance/create?mode=DirectOrder&instance_type=ecs.c5.xlarge&buymonth=12&eip=5"
            },
            {
              "id": "qvm-c5-4c-5mps-36m",
              "class": "",
              "price": "8888",
              "originPrice": "16353",
              "save": "7465",
              "packageID": 0,
              "info": "请您再次确认所选的区域和规格<br />共享型云服务器 C5 4C/8G/40G 5Mbps X 36 个月",
              "url": "https://portal.qiniu.com/qvm/vm/instance/create?mode=DirectOrder&instance_type=ecs.c5.xlarge&buymonth=36&eip=1"
            }
          ] 
        },
        {
          "title": "共享计算型 ",
          "size": "N4",
          "spec": "4C/8G/40G",
          "wide": "5Mbps",
          "durations": [
            {
              "text": "3 个月",
              "value": "qvm-n4-4c-5mps-3m"
            },
            {
              "text": "12 个月",
              "value": "qvm-n4-4c-5mps-12m"
            },
            {
              "text": "36 个月",
              "value": "qvm-n4-4c-5mps-36m"
            }
          ],
          "sections": [
            {
              "id": "qvm-n4-4c-5mps-3m",
              "class": "active",
              "price": "1258",
              "originPrice": "1497.76",
              "save": "239.76",
              "packageID": 0,
              "info": "请您再次确认所选的区域和规格<br />共享计算型 N4 4C/8G/40G 5Mbps X 3 个月",
              "url": "https://portal.qiniu.com/qvm/vm/instance/create?mode=DirectOrder&instance_type=ecs.n4.xlarge&buymonth=3&eip=5"
            },
            {
              "id": "qvm-n4-4c-5mps-12m",
              "class": "",
              "price": "4178.45",
              "originPrice": "5991",
              "save": "1812.55",
              "packageID": 0,
              "info": "请您再次确认所选的区域和规格<br />共享计算型 N4 4C/8G/40G 5Mbps X 12 个月",
              "url": "https://portal.qiniu.com/qvm/vm/instance/create?mode=DirectOrder&instance_type=ecs.n4.xlarge&buymonth=12&eip=5"
            },
            {
              "id": "qvm-n4-4c-5mps-36m",
              "class": "",
              "price": "9648",
              "originPrice": "17971.12",
              "save": "8323.12",
              "packageID": 0,
              "info": "请您再次确认所选的区域和规格<br />共享计算型 N4 4C/8G/40G 5Mbps X 36 个月",
              "url": "https://portal.qiniu.com/qvm/vm/instance/create?mode=DirectOrder&instance_type=ecs.n4.xlarge&buymonth=36&eip=5"
            }
          ] 
        }
      ]
    },
    "sms": {
      "products": [
        {
          "title": "云短信-系统短信",
          "size": "3000 条",
          "desc": "一次发放，一年有效，低至 0.034 元/条",
          "sections": [
            {
              "id": "kodo-south-500GB-6",
              "class": "active",
              "price": "96",
              "originPrice": "129",
              "save": "33",
              "packageID": 192,
              "info": "请您再次确认所选的区域和规格<br />云短信-系统短信 3000 条，一年有效"
            }
          ]
        },
        {
          "title": "云短信-系统短信",
          "size": "10000 条",
          "desc": "一次发放，一年有效，低至 0.033 元/条",
          "sections": [
            {
              "id": "kodo-south-500GB-6",
              "class": "active",
              "price": "330",
              "originPrice": "430",
              "save": "100",
              "packageID": 195,
              "info": "请您再次确认所选的区域和规格<br />云短信-系统短信 10000 条，一年有效"
            }
          ]
        },
        {
          "title": "云短信-系统短信",
          "size": "100000 条",
          "desc": "一次发放，一年有效，低至 0.031 元/条",
          "sections": [
            {
              "id": "kodo-south-500GB-6",
              "class": "active",
              "price": "3100",
              "originPrice": "4300",
              "save": "1200",
              "packageID": 198,
              "info": "请您再次确认所选的区域和规格<br />云短信-系统短信 100000 条，一年有效"
            }
          ]
        },
        {
          "title": "云短信-营销短信",
          "size": "3000 条",
          "desc": "一次发放，一年有效，低至 0.038 元/条",
          "sections": [
            {
              "id": "kodo-south-500GB-6",
              "class": "active",
              "price": "114",
              "originPrice": "129",
              "save": "15",
              "packageID": 324,
              "info": "请您再次确认所选的区域和规格<br />云短信-营销短信 3000 条，一年有效"
            }
          ]
        },
        {
          "title": "云短信-营销短信",
          "size": "10000 条",
          "desc": "一次发放，一年有效，低至 0.037 元/条",
          "sections": [
            {
              "id": "kodo-south-500GB-6",
              "class": "active",
              "price": "370",
              "originPrice": "430",
              "save": "60",
              "packageID": 327,
              "info": "请您再次确认所选的区域和规格<br />云短信-营销短信 10000 条，一年有效"
            }
          ]
        },
        {
          "title": "云短信-营销短信",
          "size": "100000 条",
          "desc": "一次发放，一年有效，低至 0.036 元/条",
          "sections": [
            {
              "id": "kodo-south-500GB-6",
              "class": "active",
              "price": "3600",
              "originPrice": "4300",
              "save": "700",
              "packageID": 330,
              "info": "请您再次确认所选的区域和规格<br />云短信-营销短信 100000 条，一年有效"
            }
          ]
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
