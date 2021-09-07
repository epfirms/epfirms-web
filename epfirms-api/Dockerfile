FROM node:14-alpine as base

WORKDIR /home/node/api

COPY package*.json ./

RUN npm i

COPY . .