# 先复用 portal 的 image & nginx 配置（只是测试环境用，问题不大）
# TODO: 以后换成 admin 自己的
FROM aslan-spock-register.qiniu.io/spock-resources/portalv4-nginx

ADD /dist /portalv4/dist

ADD /cmd.sh ./

EXPOSE 80

ENTRYPOINT ["./cmd.sh"]