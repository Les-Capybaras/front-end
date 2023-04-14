FROM node:lts-alpine

WORKDIR /usr/src/client

COPY ./package.json ./

RUN npm install

COPY ./ ./

EXPOSE 3000

RUN npm build

CMD [ "npm", "start" ]