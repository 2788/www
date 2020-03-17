FROM aslan-spock-register.qiniu.io/spock-resources/portalv4-nginx

ADD /dist /www/dist

ADD /frontend.sh ./

EXPOSE 80

ENTRYPOINT ["./frontend.sh"]
