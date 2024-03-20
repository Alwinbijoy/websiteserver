# Use official Node.js image as base
FROM node:14-alpine

# Set working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the backend source code to container
COPY . .

# Expose port 5000
EXPOSE 5000

# Command to run the backend app
CMD ["node", "server.js"]
