FROM node:18-alpine

WORKDIR /worker

COPY package*.json ./
RUN npm install

COPY . .

VOLUME ["/uploads"]

CMD ["npx", "ts-node", "src/worker.ts"]