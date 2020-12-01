# jenkins 等 ci 环境配置 ssh private key，解决 yarn 安装私有 git 仓库的问题
# 目前的方案是，jenkins 提前将私钥放到本目录下，这里将本目录下的私钥文件配置到 container 里
if [ -f id_rsa_for_builder ]; then

  echo "make ssh dir"
  mkdir ~/.ssh

  echo "config ssh"
  echo "Host github.com" > ~/.ssh/config
  echo "IdentityFile ~/.ssh/id_rsa" >> ~/.ssh/config # 来自外部的 private key
  echo "ProxyCommand nc -x 10.200.20.61:1080 %h %p" >> ~/.ssh/config # cs 环境的 ssh 代理

  echo "prepare id_rsa"
  mv ./id_rsa_for_builder ~/.ssh/id_rsa

  echo "prepare nc"
  wget https://mirrors.163.com/.help/sources.list.jessie
  mv ./sources.list.jessie /etc/apt/sources.list
  apt-get update
  apt-get upgrade
  apt-get install netcat-openbsd

  echo "scan github.com for key"
  export http_proxy=http://10.200.20.60:8118/ # cs 环境的 http 代理
  export https_proxy=http://10.200.20.60:8118/ # cs 环境的 https 代理
  ssh-keyscan github.com >> ~/.ssh/known_hosts
  cat ~/.ssh/known_hosts

  echo "install deps"
  yarn
fi
