# Base image
FROM node:16-alpine

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND yarn.lock are copied
COPY package*.json yarn.lock ./

# Install app dependencies
RUN yarn install

RUN yarn global add ts-node

# Bundle app source
COPY . .

# Creates a "dist" folder with the production build
RUN yarn run build

# Run migrations and seeds before starting the server
RUN yarn run migration:run
RUN yarn run seed:run

CMD node dist/main.js
