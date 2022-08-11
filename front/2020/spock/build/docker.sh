#<------------------------------------------------------------------------------->
## 当前可用环境变量如下，你可在构建脚本里进行引用使用
## WORKSPACE  工作目录
## IMAGE      输出镜像名称
## PKG_FILE   构建出的 tar 包名称
## DIST_DIR   构建出 tar 包的目的目录
## SERVICE    构建的服务名称
## README      构建信息文件
#<------------------------------------------------------------------------------->
#!/bin/bash

rm -rf $FRONTEND/spock/docker/dist
cp -r $FRONTEND/dist $FRONTEND/spock/docker
cd $FRONTEND/spock/docker

docker build --rm -t $IMAGE -f Dockerfile .
docker push $IMAGE
