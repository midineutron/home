# Use an official Node.js image.
FROM node:14

RUN npm install -g nodemon

# Create app directory
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files
COPY package*.json ./
# Install dependencies
RUN npm install

# Copy app source code
COPY . .

# Expose the port that the app will run on
EXPOSE 3000

# Start the app using Node
CMD ["node", "server.js"]
