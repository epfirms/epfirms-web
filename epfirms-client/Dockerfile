FROM node:16-alpine

WORKDIR /home/node/client

COPY package*.json ./

RUN npm install --legacy-peer-deps

RUN npm install -g @angular/cli

COPY . ./