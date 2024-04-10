# Use the official Node.js image as a base image
FROM node:14 as build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the remaining source code to the container
COPY . .

# Build the React app
RUN npm run build

# Use nginx image as a production server
FROM nginx:alpine

# Copy the built React app from the build stage to the nginx public directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 to the outside world
EXPOSE 80

# Start nginx server when the container starts
CMD ["nginx", "-g", "daemon off;"]
