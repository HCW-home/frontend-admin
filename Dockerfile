FROM mirror.gcr.io/library/node:20 AS builder
ENV VERSION=0.5.14
WORKDIR /usr/src/app
COPY package*.json ./
RUN yarn
COPY . .
RUN npx ng build --configuration=production --build-optimizer --aot --output-hashing=all --vendor-chunk

FROM mirror.gcr.io/nginxinc/nginx-unprivileged:latest
COPY --from=builder /usr/src/app/dist/hug-at-home-admin/ /usr/share/nginx/html/
COPY nginx-docker.conf.template /etc/nginx/templates/default.conf.template
COPY nginx.conf /etc/nginx/nginx.conf
