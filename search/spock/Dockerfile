FROM ubuntu:14.04

RUN cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime

RUN sed -i s:archive.ubuntu.com:mirrors.aliyun.com:g /etc/apt/sources.list

RUN apt-get clean && apt-get update && apt-get install -y ca-certificates

WORKDIR /search

RUN mkdir -p /search/run/auditlog/search

COPY search /search/

COPY ./search.sh /search/

ENTRYPOINT ["/search/search.sh"]
