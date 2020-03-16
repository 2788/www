#!/bin/bash
./janusd  -conf ./janus.yml 2>&1 | rotatelogs -e -l -f ./run/janus.log-%Y%m%d 500M
