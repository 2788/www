# 新官网

## start

```bash
bundle install # 安装依赖
rails server # 启动
```

本地需要启动 MySQL，创建名为 `mars` 的数据库。

配置文件:

```bash
/config/environments/development.rb # 本地配置
/config/environments/test.rb # 测试环境配置，用不到
/config/environments/production.rb # 线上环境配置，用不到
```

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