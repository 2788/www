#<------------------------------------------------------------------------------->
## 当前可用环境变量如下，你可在构建脚本里进行引用使用
## WORKSPACE  工作目录
## IMAGE      输出镜像名称
## PKG_FILE   构建出的 tar 包名称
## DIST_DIR   构建出 tar 包的目的目录
## SERVICE    构建的服务名称
## README     构建信息文件
#<------------------------------------------------------------------------------->
#!/bin/bash
set -e

BUILDER_VERSION="1.16.1"
WORK_DIR_PATH=$WORKSPACE/www/front/marketing
PKG_PATH=$WORKSPACE/www/_package
MARKETING_DIST_PATH=$WORK_DIR_PATH/dist
MARKETING_FRONTEND_SPOCK_PATH=$WORK_DIR_PATH/spock

cd $WORK_DIR_PATH && yarn install

docker pull aslan-spock-register.qiniu.io/fec-builder:$BUILDER_VERSION

docker run \
  -e "BUILD_ENV=production" \
  -v $WORK_DIR_PATH:/fec/input \
  --rm aslan-spock-register.qiniu.io/fec-builder:$BUILDER_VERSION

mkdir -p $PKG_PATH

# for mock data
# TODO 接口联调完成后，需要移除这部分
# start
MARKETING_API_PATH=$WORK_DIR_PATH/api
cp -r $MARKETING_API_PATH $MARKETING_DIST_PATH
# end

# run build-version.sh
# start
sh build-version.sh $MARKETING_DIST_PATH/static
# end

cp -r $MARKETING_DIST_PATH $PKG_PATH
cp -r $MARKETING_DIST_PATH $MARKETING_FRONTEND_SPOCK_PATH

cd $MARKETING_FRONTEND_SPOCK_PATH
docker build --rm -t $IMAGE -f Dockerfile .
docker push $IMAGE

cd $MARKETING_DIST_PATH && tar -czf ../dist.tar.gz ./*

mv ../dist.tar.gz $DIST_DIR/$PKG_FILE
