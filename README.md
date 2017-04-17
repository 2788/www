# 新官网

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