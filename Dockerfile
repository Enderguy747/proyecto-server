FROM node:16.14.2

WORKDIR /app/server

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run" , "start"]