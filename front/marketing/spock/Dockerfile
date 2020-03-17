FROM reg.qiniu.com/spock-resources/portalv4-nginx

ADD /dist /www/dist

ADD /frontend.sh ./

EXPOSE 80

ENTRYPOINT ["./frontend.sh"]
