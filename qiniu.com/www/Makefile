
.PHONY: all
all: build


.PHONY: build
build:
	cd app;go build -o  www-marketingd

.PHONY: run
run: build
	cd app; ./www-marketingd -conf ../env/config.yml