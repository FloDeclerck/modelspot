# Use an official Node runtime as a parent image
FROM node:latest

# Install Directory to Server App
RUN mkdir -p /app

# Set the working directory to /usr/src/app
WORKDIR /app

# Install Nodemon
RUN npm install -g nodemon

RUN npm install

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Run "npm start" when the container launches
CMD [ "npm", "start" ]