FROM node:8

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install --only=production && npm install -g pm2

# Bundle app source
COPY . .

EXPOSE 3000

CMD [ "pm2-runtime", "start", "index.js" ]
