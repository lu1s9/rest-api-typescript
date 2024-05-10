FROM node:20.12.2-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci 

USER node

COPY src/ .

CMD ["node", "dist/index.js"]