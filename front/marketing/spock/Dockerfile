FROM aslan-spock-register.qiniu.io/spock-resources/marketing-nginx

ADD /dist /www/dist

# TODO start
# 接口联调成功后需要删除
RUN mkdir -p /www/dist/mock_data
ADD /api /www/dist/mock_data
# end

ADD /frontend.sh ./

EXPOSE 80

ENTRYPOINT ["./frontend.sh"]
