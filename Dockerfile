# Stage 1: Build the Vite app
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json if present
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files from current directory to working directory
COPY . .

# Build the Vite app
RUN npm run build

# Stage 2: Serve the app with Node.js
FROM node:18-alpine AS serve

# Set working directory
WORKDIR /app

# Copy the build output from the previous stage
COPY --from=build /app/dist /app/dist

# Install a simple HTTP server to serve the app
RUN npm install -g serve

# Expose port 80
EXPOSE 80

# Start the app using the "serve" package
CMD ["serve", "-s", "dist", "-l", "80"]
