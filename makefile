include .envrc

init:
	yarn
.PHONY: init

build: init
	rm -rf dist
	webpack
.PHONY: build

offline: build
	sls offline
.PHONY: offline

package: build
	sls package
.PHONY: package

deploy: build
	sls deploy
.PHONY: deploy

swagger: build
	rm -rf openapi.json
	npx nestia swagger
.PHONY: swagger
