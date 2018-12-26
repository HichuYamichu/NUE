FROM node:8-alpine

LABEL maintainer "Hichu-Yamichu"

WORKDIR /usr/src/nue

COPY package.json yarn.lock ./

RUN apk add --update \
&& apk add --no-cache ca-certificates ffmpeg \
&& apk add --no-cache --virtual .build-deps git curl build-base python g++ make \
&& yarn install \
&& apk del .build-deps

COPY . .

ENV TOKEN= \
		PREFIX=

CMD ["node", "src/nue.js"]


