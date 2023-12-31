node_version:=$(shell node -v)
yarn_version:=$(shell npx yarn -v)
timeStamp:=$(shell date +%Y%m%d%H%M%S)

.DEFAULT_GOAL := build

.PHONY: install build archive test clean

show:
	@ echo Timestamp: "$(timeStamp)"
	@ echo Node Version: $(node_version)
	@ echo yarn_version: $(yarn_version)

node_modules:
#	@ npx yarn install
	@ npm install

build: node_modules
	@ npx ng build --configuration=production --build-optimizer --aot --output-hashing=all --vendor-chunk

install: build

docker:
	docker build . -t docker.io/iabsis/hcw-admin .

podman:
	@ podman build -t docker.io/iabsis/hcw-admin .

archive:
	@ tar -czvf "dosetup-$(timeStamp).tar.gz" dist

test:
	echo "test the app"
#	@ npx yarn run test

clean:
	@ echo "cleaning the dist directory"
	@ rm -rf node_modules

INFO := @bash -c '\
  printf $(YELLOW); \
  echo "=> $$1"; \
printf $(NC)' SOME_VALUE
