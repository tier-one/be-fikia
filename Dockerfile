# Base image
FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND yarn.lock are copied
COPY package*.json yarn.lock ./

# Install app dependencies
RUN yarn install

# Bundle app source
COPY . .

# Creates a "dist" folder with the production build
RUN yarn run build

# Run migrations and seeds before starting the server
CMD yarn run migration:run && yarn run seed:run && node dist/main.js
