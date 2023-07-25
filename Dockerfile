FROM node:latest AS main

WORKDIR /app

RUN apt-get update
RUN apt-get upgrade -y

