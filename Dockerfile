FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN ls -R /usr/src/app

RUN export OPENSSL_CONF='/etc/ssl/'
ENV OPENSSL_CONF='/etc/ssl/'

EXPOSE 3000

CMD ["node", "dist/index.js"]