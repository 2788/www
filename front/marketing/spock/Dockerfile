FROM aslan-spock-register.qiniu.io/spock-resources/marketing-nginx

ADD /dist /www/dist

ADD /frontend.sh ./

EXPOSE 80

ENTRYPOINT ["./frontend.sh"]
