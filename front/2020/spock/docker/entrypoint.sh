#!/bin/bash

nginx

cd /front-www
NODE_ENV=production node server/index.js -p 4000
