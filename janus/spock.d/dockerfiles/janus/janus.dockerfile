#对应image: aslan-spock-register.qiniu.io/qa/bo:pay20191012
FROM aslan-spock-register.qiniu.io/qa/bo:pay20191012

RUN ln -s /usr/bin/python2.7 /usr/bin/python

RUN mkdir -p /janus/run/auditlog/janus

ADD ./entrypoint.sh ./janusd /janus/

EXPOSE 11009

WORKDIR /janus

ENTRYPOINT ["/janus/entrypoint.sh"]
