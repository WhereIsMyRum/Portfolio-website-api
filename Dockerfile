FROM node:latest
COPY /.aws/  /root/.aws/
WORKDIR /usr/src/
COPY package*.json ./
RUN npm install