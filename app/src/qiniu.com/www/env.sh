# suppose we are at /go/src/qiniu.com/www
# command below will set gopath to /go
export GOPATH=$(dirname $(dirname $(dirname $(pwd))))
echo Set GOPATH: $GOPATH