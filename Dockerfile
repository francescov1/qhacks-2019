FROM node:8

# Create app directory
WORKDIR /usr/src/app

# TODO: change nodeenv to prod during docker build
RUN sed -i "s/^NODE_ENV.*/NODE_ENV=production/" .env
RUN cat .env

# Install app dependencies
COPY package*.json ./

RUN npm install --only=production && npm install -g pm2

# Bundle app source
COPY . .

EXPOSE 3000

CMD [ "pm2-runtime", "start", "index.js" ]
