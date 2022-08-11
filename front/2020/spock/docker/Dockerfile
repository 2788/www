# TODO: 测试环境先借来用用（内容为 https://github.com/qbox/qmall/blob/develop/front-www/spock.d/dockerfiles/qmall-nginx-node-20200806/Dockerfile）
FROM aslan-spock-register.qiniu.io/spock-resources/qmall-nginx-node:20200806

ADD /dist /front-www

ADD /entrypoint.sh ./
RUN chmod a+x ./entrypoint.sh

EXPOSE 80

ENTRYPOINT ["./entrypoint.sh"]
