# 新官网

www.qiniu.com, blog.qiniu.com, career.qiniu.com 这三个域名走的都是这一套代码

## start

```bash
bundle install # 安装依赖
rails server # 启动
```

## 数据库

注意：数据库配置的一些敏感信息（如 username, password 等）在提 PR 的时候不能暴露出来，测试环境和线上环境都要采用变量渲染的方式注入这些敏感信息（具体方法可以参考 deploy 库里已有的示例）

```bash
本地需要启动 MySQL，创建名为 `mars` 的数据库，MySQL 数据库主要保存博客文章和招聘职位数据
MySQL 数据库本地的配置文件为 /config/database.yml
线上 MySQL 数据库配置为 deploy/floy/mars-www/_package/www_database.yml

本地需要启动 Mongo，创建名为 `mars` 的数据库，Mongo 数据库主要保存反馈信息数据
Mongo 数据库本地的配置文件为 /config/mongoid.yml
线上 Mongo 数据库配置为 deploy/floy/mars-www/_package/www_mongoid.yml
```

## 配置文件

```bash
# 本地配置
/config/environments/development.rb
# 测试环境配置，本地开发用不到
/config/environments/test.rb
# 线上环境配置，本地开发用不到
/config/environments/production.rb

# 保存页面读取的文案、SEO 等信息的配置文件为
# 中文版页面
/config/locales/zh-CN.yml
# 英文版页面
/config/locales/en.yml

# 保存页面路由信息的配置文件为
/config/routes.rb

# 保存 cookie_secret, client_id, ak, sk 等信息的配置文件为
# 本地
/config/secrets.yml
# 线上
deploy/floy/mars-www/_package/www_secrets.yml

注意：cookie_secret, client_id, ak, sk 等敏感信息在提 PR 的时候不能暴露出来，测试环境和线上环境都要采用变量渲染的方式注入这些敏感信息（具体方法可以参考 deploy 库里已有的示例）
```

## 官网代码组织结构

```bash
app
├── assets # 保存页面用到的 js, css, images 文件等
│   ├── config
│   ├── images # 图片，一般一个新页面用到的图片要创建一个子文件夹进行保存。除非特殊需要，建议使用 jpg 格式的图片
│   ├── javascripts # js 文件，如果一个页面有特殊的逻辑进行处理，创建一个与该页面同名的 coffeejs 文件，在 application.coffee 文件顶部引入
│   └── stylesheets # css 文件，如果一个页面有特殊的样式，创建一个与该页面同名的 scss 文件，在 application.scss 文件顶部引入
├── channels
├── controllers # controllers 后台和页面交互
├── helpers # helpers 对页面直接引用的变量进行校验
├── jobs
├── mailers
├── models # models
└── views # 页面 html 文件
    ├── blog # 博客文章
    ├── career # 招聘信息
    ├── cooperations # 市场合作
    ├── errors # 404, 500 页面
    ├── events # 活动
    ├── feedbacks # 反馈
    ├── layouts # 页面框架，包括页面的 head, foot, 侧边悬浮框都在这里
    ├── niudays # 小牛汇共享日
    ├── prices # 价格
    ├── products # 产品落地页
    ├── solutions # 解决方案落地页
    ├── recommendations # 客户推荐
    ├── resources
    └── welcome # 其他页面，包括 index 首页等
```

## 官网开发规范

1. 实现 ```<img> <video> <a>``` 标签的时候，使用 ruby on rails 的 ```image_tag video_tag link_to``` 标签，在使用 ```image_tag``` 标签添加图片的时候，一定要把图片的后缀名加上，否则打包后会出现图片无法加载的情况

2. *.scss 文件中不要使用 ```url()``` 引入图片，要使用 ```image-url()```，否则打包后会出现图片无法加载的情况

3. *.scss 文件中定义宽度、高度、字体大小等样式的时候，尽量使用 ```rem```，```rem``` 是和 ```html``` 的 ```font-size``` 相关联的，当页面宽度 <= 768px 的时候，```html``` 的 ```font-size``` 为 70px，当页面宽度 > 768px 的时候，```html``` 的 ```font-size``` 为 100px

4. 页面文案，汉字和英文字母之间加一个空格，例如：测试 test 测试；汉字和数字之间加一个空格，例如：测试 1 测试；数字和英文之间不用加空格，例如：测试 1test 测试

5. 如何添加一个页面：例如要添加一个名为 ```test``` 的页面，路由为：```/products/test```，需要添加以下内容
    - 在 ```routes.rb``` 文件中开放路由，写法类似：```get '/products/test', to: 'products#test'```
    - 在 ```views/products/``` 中添加 ```test.html.erb``` 文件，如果页面路由是开放在 ```/events/``` 下的，就在 ```views/events/``` 中添加 ```test.html.erb``` 文件
    - 在 ```controllers/products_controller.rb``` 文件中添加相应的定义，写法可以仿照现有的写法，如果页面路由开放在 ```/events/``` 下，就在 ```controllers/events_controller.rb``` 中添加相应定义
    - 如果有需要，在 ```config/locales/zh-CN.yml``` 文件和 ```config/locales/en.yml``` 文件中添加配置项，在本例中，```test``` 页面的配置项应该是 ```zh-CN.views.products``` 下的第一级子项。如果没有在 ```en.yml``` 文件中添加配置项，则英文站页面会出现 404 的情况
    - 如果有需要，在 ```assets/images``` 中新建名为 ```test``` 的文件夹，保存该页面中所有用到的图片
    - 如果有需要，在 ```assets/javascripts``` 中新建 ```test.coffee``` 文件，用于处理该页面的交互逻辑，并且在 ```application.coffee``` 文件顶部引入该文件
    - 如果有需要，在 ```assets/stylesheets``` 中新建 ```test.scss``` 文件，用于处理该页面的样式，并且在 ```application.scss``` 文件顶部引入该文件

6. 页面里所有的样式类名，不要出现以其他页面为标识的命名，例如：```kodo``` 页面中不应该出现带有 ```pili``` 标识的类名，样式类名应该用 ```kodo``` 进行标识，比如：```features-kodo```

7. 开发新页面前可以参考一下官网现有页面的写法，相似的模块（例如 ```banner```，应用场景等）可以直接套用现有的实现方法，以此减少工作量

## nginx config
```
#################### WORKS API SERVICE ####################
upstream www_backend {
  server unix:/tmp/unicorn.www.sock fail_timeout=0;
}

server {
  listen 80 default_server;
  server_name localhost www.qiniu.io;
  client_max_body_size 20M;
  root /home/qboxserver/mars-www/_package/www/public;

  location ~* ^(/assets|/favicon.ico) {
    access_log        off;
    expires           max;
  }

  location / {
    proxy_redirect     off;
    proxy_set_header   Host $host;
    proxy_set_header   X-Forwarded-Host $host;
    proxy_set_header   X-Forwarded-Server $host;
    proxy_set_header   X-Real-IP        $remote_addr;
    proxy_set_header   X-Forwarded-For  $proxy_add_x_forwarded_for;
    proxy_buffering    on;
    proxy_pass         http://www_backend;
  }
}
```

## unicorn
```
# start
unicorn_rails -D -c config/unicorn.rb -E production

# restart
kill -USR2 `cat tmp/pids/unicorn.pid`

# stop
kill -9 `cat tmp/pids/unicorn.pid`
```