FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 8181

CMD ["npm", "run", "preview", "--", "--port", "8181"]
