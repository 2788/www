FROM ubuntu:14.04

RUN cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime

RUN sed -i s:archive.ubuntu.com:mirrors.aliyun.com:g /etc/apt/sources.list

RUN apt-get clean && apt-get update && apt-get install -y ca-certificates

WORKDIR /admin-backend

COPY www-admin-api /admin-backend/

COPY admin-backend.sh /admin-backend/

ENTRYPOINT ["/admin-backend/admin-backend.sh"]
