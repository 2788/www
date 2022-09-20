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

cd $FRONTEND

yarn install

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
rm -rf ./node_modules/.cache/terser-webpack-plugin

# 打印当前的文件夹体积情况，方便在构建目录体积膨胀时排查原因
pwd && du -h --max-depth=1
cd $WORKSPACE/www && pwd && du -h --max-depth=1
