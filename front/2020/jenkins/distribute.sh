#!/bin/bash

cd ${WORKSPACE}/deploy-test && source env.sh && cd $WORKSPACE

HOST="jumpbox"

dist_pkg ${HOST} ${PACKAGE_NAME} ${PACKAGE_NAME}
upload_qstack_pkg ${PACKAGE_NAME} "fusion" "adminv2-frontend/FEC" # TODO: 参数
