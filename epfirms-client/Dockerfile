FROM node:14-alpine

WORKDIR /home/node/client

COPY package*.json ./

RUN npm install

RUN npm install -g @angular/cli

COPY . ./