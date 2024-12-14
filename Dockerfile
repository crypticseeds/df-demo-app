# Use Node.js LTS (Long Term Support) as the base image
FROM node:20-slim

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application files
COPY src/ ./src/

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]
