FROM node:8.11.3

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# Install npm dependencies using yarn
RUN yarn

# Bundle app source
COPY . .

# Expose port 8080
EXPOSE 8080

# Webpack build
# CMD ["yarn", "run", "build:server"]

# Start the server
CMD [ "yarn", "server" ]
