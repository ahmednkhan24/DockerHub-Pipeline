FROM node:12

WORKDIR /node-api

COPY package*.json /node-api/

RUN npm install

COPY ./src /node-api/src

CMD ["npm", "start"]
