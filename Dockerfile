FROM node:16.14.2

WORKDIR /usr/src/app/server

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["node" , "/src/server.js"]