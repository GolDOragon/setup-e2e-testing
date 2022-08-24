FROM node:16.16.0-alpine3.15

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci
RUN npm prune --production

COPY . .

CMD npm run dev:container
