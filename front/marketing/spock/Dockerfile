FROM aslan-spock-register.qiniu.io/spock-resources/marketing-nginx

ADD /dist /www/dist

# TODO 接口联调成功后需要删除
ADD /api /www/dist/mock_data

ADD /frontend.sh ./

EXPOSE 80

ENTRYPOINT ["./frontend.sh"]
