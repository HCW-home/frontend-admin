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
	@ npx yarn install
	@# npm install

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

build-podman:
	podman build . -t docker.io/iabsis/hcw-admin
	@ V=$$(cat .version) ; podman tag docker.io/iabsis/hcw-admin:latest docker.io/iabsis/hcw-admin:$$V
	@ podman tag docker.io/iabsis/hcw-admin:latest docker.io/iabsis/hcw-admin:5
	@ V=$$(cat .version) ; echo "Publish podman now with:\n podman push docker.io/iabsis/hcw-admin:$$V\n podman push docker.io/iabsis/hcw-admin:latest\n podman push docker.io/iabsis/hcw-admin:5"

do-git-release:
	@ git add debian/changelog redhat/hcw-athome-admin.spec .version
	@ V=$$(cat .version) ; git tag $$V
	@ V=$$(cat .version) ; echo "Publish git now with:\n git commit -m \"New release $$V\"\n git push --tag"

update-redhat-release:
	@ V=$$(cat .version) ; sed -i "s/Version:.*/Version: $$V/" redhat/hcw-athome-admin.spec

create-debian-release:
	@ gbp dch  --ignore-branch
	@ sed -i 's/UNRELEASED/focal/' debian/changelog
	@ head -n 1 debian/changelog| cut -d' ' -f2 | sed 's/[\(\)]*//g' > .version
	@ V=$$(cat .version) ; echo "Release: $$V"

do-release-all: create-debian-release update-redhat-release do-git-release build-podman


clean:
	@ echo "cleaning the dist directory"
	@ rm -rf node_modules

INFO := @bash -c '\
  printf $(YELLOW); \
  echo "=> $$1"; \
printf $(NC)' SOME_VALUE
