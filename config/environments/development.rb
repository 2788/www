Rails.application.configure do
  # Settings specified here will take precedence over those in config/application.rb.

  # In the development environment your application's code is reloaded on
  # every request. This slows down response time but is perfect for development
  # since you don't have to restart the web server when you make code changes.
  config.cache_classes = false

  # Do not eager load code on boot.
  config.eager_load = false

  # Show full error reports.
  config.consider_all_requests_local = false

  # Enable/disable caching. By default caching is disabled.
  if Rails.root.join('tmp/caching-dev.txt').exist?
    config.action_controller.perform_caching = true

    config.cache_store = :memory_store
    config.public_file_server.headers = {
      'Cache-Control' => 'public, max-age=172800'
    }
  else
    config.action_controller.perform_caching = false

    config.cache_store = :null_store
  end

  # Don't care if the mailer can't send.
  config.action_mailer.raise_delivery_errors = false

  config.action_mailer.perform_caching = false

  # Print deprecation notices to the Rails logger.
  config.active_support.deprecation = :log

  # Debug mode disables concatenation and preprocessing of assets.
  # This option may cause significant delays in view rendering with a large
  # number of complex assets.
  config.assets.debug = true

  # Suppress logger output for asset requests.
  config.assets.quiet = true

  # Raises error for missing translations
  # config.action_view.raise_on_missing_translations = true

  # Use an evented file watcher to asynchronously detect changes in source code,
  # routes, locales, etc. This feature depends on the listen gem.
  config.file_watcher = ActiveSupport::EventedFileUpdateChecker

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

  # 2019 年 1212 活动页面 package 配置信息
  # 区分测试环境和线上 pakcageID 信息
  config.double12_2019_package = {
    "kodo": {
      "table": [
        {
          "title": "存储空间 100GB X 6 个月",
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
              "info": "存储空间 100GB X 6 个月 - 华东地区"
            },
            {
              "id": "kodo-south-100GB-6",
              "class": "",
              "price": "0.01",
              "originPrice": "79.92",
              "save": "79.91",
              "btnText": "立即抢购",
              "btnClass": "orange",
              "packageID": 0,
              "info": "存储空间 100GB X 6 个月 - 华南地区"
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
              "info": "存储空间 100GB X 6 个月 - 华北地区"
            }
          ]
        }
      ],
      "southList": [
        {
          "title": "云存储 500GB/月",
          "desc": "可选购存储半年/全年包，华南地区专享",
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
              "info": "存储空间 500GB X 6 个月 - 华南地区"
            },
            {
              "id": "kodo-south-500GB-12",
              "class": "",
              "price": "354",
              "originPrice": "582.12",
              "save": "228.12",
              "packageID": 0,
              "info": "存储空间 500GB X 12 个月 - 华南地区"
            }
          ]
        },
        {
          "title": "云存储 1TB/月",
          "desc": "可选购存储半年/全年包，华南地区专享",
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
              "info": "存储空间 1TB X 6 个月 - 华南地区"
            },
            {
              "id": "kodo-south-1TB-12",
              "class": "",
              "price": "725",
              "originPrice": "1204.63",
              "save": "479.63",
              "packageID": 0,
              "info": "存储空间 1TB X 12 个月 - 华南地区"
            }
          ]
        },
        {
          "title": "云存储 5TB/月",
          "desc": "可选购存储半年/全年包，华南地区专享",
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
              "info": "存储空间 5TB X 6 个月 - 华南地区"
            },
            {
              "id": "kodo-south-5TB-12",
              "class": "",
              "price": "3625",
              "originPrice": "6070.68",
              "save": "2445.68",
              "packageID": 0,
              "info": "存储空间 5TB X 12 个月 - 华南地区"
            }
          ]
        },
        {
          "title": "云存储 10TB/月",
          "desc": "可选购存储半年/全年包，华南地区专享",
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
              "info": "存储空间 10TB X 12 个月 - 华南地区"
            },
            {
              "id": "kodo-south-10TB-12",
              "class": "",
              "price": "7250",
              "originPrice": "12153.24",
              "save": "4903.24",
              "packageID": 0,
              "info": "存储空间 10TB X 12 个月 - 华南地区"
            }
          ]
        }
      ],
      "list": [
        {
          "title": "云存储 500GB/月",
          "desc": "可选购存储半年/全年包，华东/华北地区",
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
              "packageID": 0,
              "info": "存储空间 500GB X 6 个月 - 华东地区"
            },
            {
              "id": "kodo-east-500GB-12",
              "class": "",
              "price": "444",
              "originPrice": "870.24",
              "save": "426.24",
              "packageID": 0,
              "info": "存储空间 500GB X 12 个月 - 华东地区"
            },
            {
              "id": "kodo-north-500GB-6",
              "class": "",
              "price": "246",
              "originPrice": "435.12",
              "save": "189.12",
              "packageID": 0,
              "info": "存储空间 500GB X 6 个月 - 华北地区"
            },
            {
              "id": "kodo-north-500GB-12",
              "class": "",
              "price": "444",
              "originPrice": "870.24",
              "save": "426.24",
              "packageID": 0,
              "info": "存储空间 500GB X 12 个月 - 华北地区"
            }
          ]
        },
        {
          "title": "云存储 1TB/月",
          "desc": "可选购存储半年/全年包，华东/华北地区",
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
              "info": "存储空间 1TB X 6 个月 - 华东地区"
            },
            {
              "id": "kodo-east-1TB-12",
              "class": "",
              "price": "909",
              "originPrice": "1800.86",
              "save": "891.86",
              "packageID": 0,
              "info": "存储空间 1TB X 12 个月 - 华东地区"
            },
            {
              "id": "kodo-north-1TB-6",
              "class": "",
              "price": "503",
              "originPrice": "900.43",
              "save": "397.43",
              "packageID": 0,
              "info": "存储空间 1TB X 6 个月 - 华北地区"
            },
            {
              "id": "kodo-north-1TB-12",
              "class": "",
              "price": "909",
              "originPrice": "1800.86",
              "save": "891.86",
              "packageID": 0,
              "info": "存储空间 1TB X 12 个月 - 华北地区"
            }
          ]
        },
        {
          "title": "云存储 5TB/月",
          "desc": "可选购存储半年/全年包，华东/华北地区",
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
              "info": "存储空间 5TB X 6 个月 - 华东地区"
            },
            {
              "id": "kodo-east-5TB-12",
              "class": "",
              "price": "4546",
              "originPrice": "8927.90",
              "save": "4381.9",
              "packageID": 0,
              "info": "存储空间 5TB X 12 个月 - 华东地区"
            },
            {
              "id": "kodo-north-5TB-6",
              "class": "",
              "price": "2519",
              "originPrice": "4463.95\"",
              "save": "1944.95",
              "packageID": 0,
              "info": "存储空间 5TB X 6 个月 - 华北地区"
            },
            {
              "id": "kodo-north-5TB-12",
              "class": "",
              "price": "4546",
              "originPrice": "8927.90",
              "save": "4381.9",
              "packageID": 0,
              "info": "存储空间 5TB X 6 个月 - 华北地区"
            }
          ]
        },
        {
          "title": "云存储 10TB/月",
          "desc": "可选购存储半年/全年包，华东/华北地区",
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
              "info": "存储空间 10TB X 6 个月 - 华东地区"
            },
            {
              "id": "kodo-east-10TB-12",
              "class": "",
              "price": "9093",
              "originPrice": "17836.70",
              "save": "8743.7",
              "packageID": 0,
              "info": "存储空间 10TB X 12 个月 - 华东地区"
            },
            {
              "id": "kodo-north-10TB-6",
              "class": "",
              "price": "5038",
              "originPrice": "8918.35",
              "save": "3880.35",
              "packageID": 0,
              "info": "存储空间 10TB X 6 个月 - 华北地区"
            },
            {
              "id": "kodo-north-10TB-12",
              "class": "",
              "price": "9093",
              "originPrice": "17836.70",
              "save": "8743.7",
              "packageID": 0,
              "info": "存储空间 10TB X 12 个月 - 华北地区"
            }
          ]
        }
      ]
    },
    "fusion": {
      "list": [
        {
          "title": "国内全时段静态加速流量 1200GB（按月结转）",
          "desc": "按月发放 100GB/月，可结转",
          "isNew": true,
          "durations": [
            {
              "value": "fusion-http-100GB-12",
              "text": "HTTP"
            },
            {
              "value": "fusion-https-100GB-12",
              "text": "HTTPS"
            }
          ],
          "sections": [
            {
              "id": "fusion-http-100GB-12",
              "class": "active",
              "price": "7.7",
              "originPrice": "24",
              "save": "16.3",
              "packageID": 0,
              "info": "国内 HTTP 全时段静态加速流量 1200GB，按月发放 100GB/月，可结转"
            },
            {
              "id": "fusion-https-100GB-12",
              "class": "",
              "price": "8.8",
              "originPrice": "28",
              "save": "19.2",
              "packageID": 0,
              "info": "国内 HTTPS 全时段静态加速流量 1200GB，按月发放 100GB/月，可结转"
            }
          ]
        },
        {
          "title": "国内全时段静态加速流量 12TB（按月结转）",
          "desc": "按月发放 1TB/月，可结转",
          "isNew": true,
          "durations": [
            {
              "value": "fusion-http-1TB-12",
              "text": "HTTP"
            },
            {
              "value": "fusion-https-1TB-12",
              "text": "HTTPS"
            }
          ],
          "sections": [
            {
              "id": "fusion-http-1TB-12",
              "class": "active",
              "price": "77",
              "originPrice": "240",
              "save": "163",
              "packageID": 0,
              "info": "国内 HTTP 全时段静态加速流量 12TB，按月发放 1TB/月，可结转"
            },
            {
              "id": "fusion-https-1TB-12",
              "class": "",
              "price": "88",
              "originPrice": "280",
              "save": "192",
              "packageID": 0,
              "info": "国内 HTTPS 全时段静态加速流量 12TB，按月发放 1TB/月，可结转"
            }
          ]
        },
        {
          "title": "国内全时段静态加速流量 120TB（按月结转）",
          "desc": "按月发放 10TB/月，可结转",
          "isNew": true,
          "durations": [
            {
              "value": "fusion-http-10TB-12",
              "text": "HTTP"
            },
            {
              "value": "fusion-https-10TB-12",
              "text": "HTTPS"
            }
          ],
          "sections": [
            {
              "id": "fusion-http-10TB-12",
              "class": "active",
              "price": "777",
              "originPrice": "2400",
              "save": "1623",
              "packageID": 0,
              "info": "国内 HTTP 全时段静态加速流量 120TB，按月发放 10TB/月，可结转"
            },
            {
              "id": "fusion-https-10TB-12",
              "class": "",
              "price": "888",
              "originPrice": "2800",
              "save": "1912",
              "packageID": 0,
              "info": "国内 HTTPS 全时段静态加速流量 120TB，按月发放 10TB/月，可结转"
            }
          ]
        },
        {
          "title": "国内全时段静态加速流量 600TB（按月结转）",
          "desc": "按月发放 50TB/月，可结转",
          "isNew": true,
          "durations": [
            {
              "value": "fusion-http-50TB-12",
              "text": "HTTP"
            },
            {
              "value": "fusion-https-50TB-12",
              "text": "HTTPS"
            }
          ],
          "sections": [
            {
              "id": "fusion-http-50TB-12",
              "class": "active",
              "price": "3777",
              "originPrice": "12000",
              "save": "8223",
              "packageID": 0,
              "info": "国内 HTTP 全时段静态加速流量 600TB，按月发放 50TB/月，可结转"
            },
            {
              "id": "fusion-https-50TB-12",
              "class": "",
              "price": "4321",
              "originPrice": "14000",
              "save": "9679",
              "packageID": 0,
              "info": "国内 HTTPS 全时段静态加速流量 600TB，按月发放 50TB/月，可结转"
            }
          ]
        },
        {
          "title": "国内全时段静态加速流量 1.2TB（按月结转）",
          "desc": "按月发放 102.4GB/月，可结转",
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
              "price": "184",
              "originPrice": "295",
              "save": "111",
              "packageID": 0,
              "info": "国内 HTTP 全时段静态加速流量 1.2TB，按月发放 102.4GB/月，可结转"
            },
            {
              "id": "fusion-https-1dot2TB-12",
              "class": "",
              "price": "231",
              "originPrice": "344",
              "save": "113",
              "packageID": 0,
              "info": "国内 HTTPS 全时段静态加速流量 1.2TB，按月发放 102.4GB/月，可结转"
            }
          ]
        },
        {
          "title": "国内全时段静态加速流量 6TB（按月结转）",
          "desc": "按月发放 512GB/月，可结转",
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
              "price": "903",
              "originPrice": "1475",
              "save": "572",
              "packageID": 0,
              "info": "国内 HTTP 全时段静态加速流量 6TB，按月发放 512GB/月，可结转"
            },
            {
              "id": "fusion-https-6TB-12",
              "class": "",
              "price": "1130",
              "originPrice": "1720",
              "save": "590",
              "packageID": 0,
              "info": "国内 HTTPS 全时段静态加速流量 6TB，按月发放 512GB/月，可结转"
            }
          ]
        },
        {
          "title": "国内全时段静态加速流量 12TB（按月结转）",
          "desc": "按月发放 1TB/月，可结转",
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
              "price": "1720",
              "originPrice": "2949",
              "save": "1229",
              "packageID": 0,
              "info": "国内 HTTP 全时段静态加速流量 12TB，按月发放 1TB/月，可结转"
            },
            {
              "id": "fusion-https-12TB-12",
              "class": "",
              "price": "2212",
              "originPrice": "3441",
              "save": "1229",
              "packageID": 0,
              "info": "国内 HTTPS 全时段静态加速流量 12TB，按月发放 1TB/月，可结转"
            }
          ]
        },
        {
          "title": "国内全时段静态加速流量 60TB（按月结转）",
          "desc": "按月发放 5TB/月，可结转",
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
              "price": "7987",
              "originPrice": "14746",
              "save": "6759",
              "packageID": 0,
              "info": "国内 HTTP 全时段静态加速流量 60TB，按月发放 5TB/月，可结转"
            },
            {
              "id": "fusion-https-60TB-12",
              "class": "",
              "price": "10629",
              "originPrice": "17203",
              "save": "6574",
              "packageID": 0,
              "info": "国内 HTTPS 全时段静态加速流量 60TB，按月发放 5TB/月，可结转"
            }
          ]
        },
        {
          "title": "国内全时段静态加速流量 120TB（按月结转）",
          "desc": "按月发放 10TB/月，可结转",
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
              "price": "11796",
              "originPrice": "23347",
              "save": "11551",
              "packageID": 0,
              "info": "国内 HTTP 全时段静态加速流量 120TB，按月发放 10TB/月，可结转"
            },
            {
              "id": "fusion-https-120TB-12",
              "class": "",
              "price": "14746",
              "originPrice": "28262",
              "save": "13516",
              "packageID": 0,
              "info": "国内 HTTPS 全时段静态加速流量 120TB，按月发放 10TB/月，可结转"
            }
          ]
        },
        {
          "title": "国内全时段静态加速流量 240TB（按月结转）",
          "desc": "按月发放 20TB/月，可结转",
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
              "price": "23593",
              "originPrice": "46694",
              "save": "23101",
              "packageID": 0,
              "info": "国内 HTTP 全时段静态加速流量 240TB，按月发放 20TB/月，可结转"
            },
            {
              "id": "fusion-https-240TB-12",
              "class": "",
              "price": "29491",
              "originPrice": "56525",
              "save": "27034",
              "packageID": 0,
              "info": "国内 HTTPS 全时段静态加速流量 240TB，按月发放 20TB/月，可结转"
            }
          ]
        },
        {
          "title": "国内全时段静态加速流量 480TB（按月结转）",
          "desc": "按月发放 40TB/月，可结转",
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
              "price": "42467",
              "originPrice": "93389",
              "save": "50922",
              "packageID": 0,
              "info": "国内 HTTP 全时段静态加速流量 480TB，按月发放 40TB/月，可结转"
            },
            {
              "id": "fusion-https-480TB-12",
              "class": "",
              "price": "53084",
              "originPrice": "113050",
              "save": "59966",
              "packageID": 0,
              "info": "国内 HTTPS 全时段静态加速流量 480TB，按月发放 40TB/月，可结转"
            }
          ]
        },
        {
          "title": "国内全时段静态加速流量 1200TB（按月结转）",
          "desc": "按月发放 100TB/月，可结转",
          "isNew": false,
          "durations": [
            {
              "value": "fusion-http-1200TB-12",
              "text": "HTTP"
            },
            {
              "value": "fusion-https-1200TB-12",
              "text": "HTTPS"
            }
          ],
          "sections": [
            {
              "id": "fusion-http-1200TB-12",
              "class": "active",
              "price": "101167",
              "originPrice": "239075",
              "save": "137908",
              "packageID": 0,
              "info": "国内 HTTP 全时段静态加速流量 1200TB，按月发放 100TB/月，可结转"
            },
            {
              "id": "fusion-https-1200TB-12",
              "class": "",
              "price": "120796",
              "originPrice": "289407",
              "save": "168611",
              "packageID": 0,
              "info": "国内 HTTPS 全时段静态加速流量 1200TB，按月发放 100TB/月，可结转"
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
          "price": "186.4",
          "originPrice": "233",
          "save": "46.6",
          "packageID": 0
        },
        {
          "title": "直播云 5TB 全年包",
          "desc": "约 5000 人同时在线观看标清 (2Mbps) 直播 12 小时",
          "price": "876.8",
          "originPrice": "1096",
          "save": "219.2",
          "packageID": 0
        },
        {
          "title": "直播云 10TB 全年包",
          "desc": "约 1 万人同时在线观看标清 (2Mbps) 直播 24 小时",
          "price": "1736",
          "originPrice": "2170",
          "save": "434",
          "packageID": 0
        }
      ],
      "socialList": [
        {
          "title": "直播云 10TB 全年包",
          "desc": "1 年有效，含上行及下行流量",
          "price": "1736",
          "originPrice": "2170",
          "save": "434",
          "packageID": 0
        },
        {
          "title": "直播云 50TB 全年包",
          "desc": "1 年有效，含上行及下行流量",
          "price": "7124.8",
          "originPrice": "8906",
          "save": "1781.2",
          "packageID": 0
        },
        {
          "title": "直播云 200TB 全年包",
          "desc": "1 年有效，含上行及下行流量",
          "price": "24659.2",
          "originPrice": "30824",
          "save": "6164.8",
          "packageID": 0
        },
        {
          "title": "直播云 1PB 全年包",
          "desc": "1 年有效，含上行及下行流量",
          "price": "120356",
          "originPrice": "150445",
          "save": "30089",
          "packageID": 0
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
          "packageID": 0
        },
        {
          "title": "短视频 SDK 全年精简版",
          "tipClass": "orange",
          "tipText": "新人专享",
          "type": "精简版",
          "duration": "1 年",
          "price": "201.6",
          "originPrice": "2016",
          "save": "1814.4",
          "btnText": "立即抢购",
          "btnClass": "blue",
          "packageID": 0
        },
        {
          "title": "短视频 SDK 全年基础版",
          "tipClass": "orange",
          "tipText": "新人专享",
          "type": "基础版",
          "duration": "1 年",
          "price": "813.6",
          "originPrice": "8136",
          "save": "7322.4",
          "btnText": "立即抢购",
          "btnClass": "blue",
          "packageID": 0
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
          "packageID": 0
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
          "packageID": 0
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
          "packageID": 0
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
          "packageID": 0
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
          "link": "/qvm/vm/instance/create?mode%3DDirectOrder%26instance_type%3Decs.t5-lc1m1.small%26buymonth%3D3%26eip%3D1"
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
          "link": "/qvm/vm/instance/create?mode%3DDirectOrder%26instance_type%3Decs.t5-c1m2.large%26buymonth%3D3%26eip%3D1"
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
          "link": "/qvm/vm/instance/create?mode%3DDirectOrder%26instance_type%3Decs.c5.large%26buymonth%3D3%26eip%3D2"
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
          "link": "/qvm/vm/instance/create?mode%3DDirectOrder%26instance_type%3Decs.c5.xlarge%26buymonth%3D3%26eip%3D5"
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
          "price": "643.05",
          "originPrice": "908.05",
          "save": "265",
          "link": "/qvm/vm/instance/create?mode%3DDirectOrder%26instance_type%3Decs.xn4.small%26buymonth%3D12%26eip%3D1"
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
          "link": "/qvm/vm/instance/create?mode%3DDirectOrder%26instance_type%3Decs.mn4.small%26buymonth%3D12%26eip%3D2"
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
          "link": "/qvm/vm/instance/create?mode%3DDirectOrder%26instance_type%3Decs.c5.large%26buymonth%3D12%26eip%3D2"
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
          "link": "/qvm/vm/instance/create?mode%3DDirectOrder%26instance_type%3Decs.g5.large%26buymonth%3D12%26eip%3D3"
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
          "packageID": 0
        },
        {
          "title": "云短信 10000 条系统短信加速包",
          "desc": "1 年有效，限系统短信，0.024/条",
          "price": "240",
          "originPrice": "430",
          "save": "190",
          "packageID": 0
        },
        {
          "title": "云短信 100000 条系统短信冲刺包",
          "desc": "1 年有效，限系统短信，0.023/条",
          "price": "2300",
          "originPrice": "4300",
          "save": "2000",
          "packageID": 0
        },
        {
          "title": "云短信 3000 条推广短信起跑包",
          "desc": "1 年有效，限推广短信，0.034/条",
          "price": "102",
          "originPrice": "129",
          "save": "27",
          "packageID": 0
        },
        {
          "title": "云短信 10000 条推广短信加速包",
          "desc": "1 年有效，限推广短信，0.033/条",
          "price": "330",
          "originPrice": "430",
          "save": "100",
          "packageID": 0
        },
        {
          "title": "云短信 100000 条系统短信冲刺包",
          "desc": "1 年有效，限推广短信，0.032/条",
          "price": "3200",
          "originPrice": "4300",
          "save": "1100",
          "packageID": 0
        }
      ]
    }
  }

  config.img_audit_host = 'http://ai.qiniuapi.com/v3/image/censor'
  config.video_audit_host = 'http://ai.qiniuapi.com/v3/video/censor'
  config.video_jobs_host = 'http://ai.qiniuapi.com/v3/jobs/video'
end
