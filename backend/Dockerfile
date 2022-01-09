FROM node:16.13

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

EXPOSE 5083

CMD ["npm", "start"]