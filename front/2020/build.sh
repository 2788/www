#!/bin/bash

set -ex

npm run clean

NODE_ENV=production NODE_OPTIONS="--max_old_space_size=4096" npx next build

mkdir ./dist
cd ./dist

cp ../package.json .
cp ../next.config.js .
cp -r ../server .
cp -r ../.next .
cp -r ../node_modules .
cp -r ../public .
rm ./public/_README.md
cp -r ../pages . # for sitemap

cd ..
npm run build:externals
