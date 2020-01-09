FROM node:latest
WORKDIR /usr/src/
COPY app/ ./
RUN npm install