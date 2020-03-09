# 为了使 jenkins 支持以 git+https 方式获取私有仓库并安装，
# 在运行 builder 时增加了 $NETRC_LOGIN, $NETRC_PWD 这两个环境变量，然后将其写入 .netrc 文件
if [ "$NETRC_LOGIN"x != ""x ] && [ "$NETRC_PWD"x != ""x ]; then
  echo "machine github.com\n\
    login $NETRC_LOGIN\n\
    password $NETRC_PWD" > ~/.netrc
fi
# jenkins 等 ci 环境配置 ssh private key，解决 yarn 安装私有 git 仓库的问题
# 目前的方案是，jenkins 提前将私钥放到本目录下，这里将本目录下的私钥文件配置到 container 里
if [ -f id_rsa_for_builder ]; then
  mkdir ~/.ssh
  echo "Host github.com\n\
    IdentityFile ~/.ssh/id_rsa" > ~/.ssh/config
  mv ./id_rsa_for_builder ~/.ssh/id_rsa
  ssh-keyscan github.com >> ~/.ssh/known_hosts
fi

if [ "$BUILD_ENV"x != "development"x ]; then
  yarn
fi
