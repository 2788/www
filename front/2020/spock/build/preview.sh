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

FRONTEND=$WORKSPACE/www/front/2020

cd $FRONTEND
cp .env.preview .env.local

. $FRONTEND/spock/build/base.sh

echo "deploy start"
date
cd $FRONTEND
node ./deploy.js $DEPLOY_AK $DEPLOY_SK www-2020-preview
date
echo "deploy end"

# . $FRONTEND/spock/build/docker.sh

. $FRONTEND/spock/build/pkg.sh
