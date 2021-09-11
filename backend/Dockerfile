FROM node:16.9.0-slim

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

EXPOSE 5083

CMD ["npm", "start"]