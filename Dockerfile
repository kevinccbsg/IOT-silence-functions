FROM node:10.4

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY ./server-project/package*.json ./

RUN npm install

# Bundle app source
COPY ./server-project .

EXPOSE 3000

ENTRYPOINT [ "npm", "start" ]
