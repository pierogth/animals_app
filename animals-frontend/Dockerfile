# Use the official Node.js image as a parent image
FROM node:18

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json into the working directory
COPY ./package*.json ./

# Install any needed packages
RUN npm install

# Copy the rest of the application code into the working directory
COPY . .

# Expose port 4200 to the host machine
EXPOSE 4200

# Start the Angular application
#CMD ["npm", "start"]