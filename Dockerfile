FROM node:latest
WORKDIR /opt/duckworth
COPY package.json .
RUN npm install --quiet
COPY . .
