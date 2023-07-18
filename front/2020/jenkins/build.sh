#!/bin/bash

# TODO: 只是个草稿
# 地址：https://jenkins.qiniu.io/view/WWW/job/www-frontend-production/

## spock
## WORKSPACE  工作目录
## IMAGE      输出镜像名称
## PKG_FILE   构建出的 tar 包名称
## DIST_DIR   构建出 tar 包的目的目录
## SERVICE    构建的服务名称
## README      构建信息文件

set -ex


cd ${WORKSPACE}/deploy-test && source env.sh



# TODO: 缓存复用/清空？




WORKSPACE=TODO
DEPLOY_AK=TODO
DEPLOY_SK=TODO
DIST_DIR=TODO
PKG_FILE=TODO



# TODO: 在哪个步骤做？如何拉 tag
# WWW_2020_BRANCH=2020
# git checkout origin/${FUSION_ADMIN_BRANCH}
git checkout origin/2020





# 注意：加代理可能导致 docker push 失败
# export http_proxy=http://10.200.20.61:8118
# export https_proxy=http://10.200.20.61:8118
# export http_proxy=
# export https_proxy=

pwd

node -v
npm -v
yarn -v

# cd $WORKSPACE/www/front/2020/spock/build







FRONTEND=$WORKSPACE/www/front/2020

cd $FRONTEND
cp .env.prod .env.local




# . $FRONTEND/spock/build/base.sh


cd $FRONTEND

yarn install --ignore-engines

# 加代理可能导致 docker push 失败等
export http_proxy=
export https_proxy=

# echo "git log"
# git log | head -n 100

echo "prepare env config start"
cat .env.local
echo "prepare env config end"

echo "build start"
date
yarn build
date
echo "build end"

cp ./.env.local ./dist

# 这个文件夹的内容会随着构建次数的增加越来越多，需要清理之，否则工作流的缓存文件会越来越大
# TODO: 貌似还有别的缓存…
rm -rf ./node_modules/.cache/terser-webpack-plugin

# 打印当前的文件夹体积情况，方便在构建目录体积膨胀时排查原因
pwd && du -h --max-depth=1
cd $WORKSPACE/www && pwd && du -h --max-depth=1 # TODO: 检查是否生效




echo "deploy start"
date
cd $FRONTEND
node ./deploy.js $DEPLOY_AK $DEPLOY_SK www-2020
date
echo "deploy end"




# TODO: 还需要这个？
# . $FRONTEND/spock/build/pkg.sh


cd $FRONTEND/dist
tar -czf ../dist.tar.gz ./* .[!.]* # 包含点开头的隐藏文件
mv ../dist.tar.gz $DIST_DIR/$PKG_FILE




# TODO: tarball？
if [ -f *.tar.gz ];then
    rm *.tar.gz
fi
cp -r ${WORK_DIR_PATH}/dist/* ./
tar czf $PACKAGE_NAME ./index.html ./static
