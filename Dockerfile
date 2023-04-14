FROM node:lts-alpine

WORKDIR /usr/src/client

COPY ./package.json ./

RUN npm install

COPY ./ ./

EXPOSE 3000

RUN npm build

CMD [ "npx", "serve", "-s", "build", "-l", "3000" ]