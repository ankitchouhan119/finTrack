# Use Node.js 18 Alpine for small image size
FROM node:18-alpine

WORKDIR /app

# Copy package files first (better caching)
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project files
COPY . .

# Build production-ready frontend
RUN npm run build

# Install "serve" to host production build
RUN npm install -g serve

# Expose port 3000
EXPOSE 3000

# Run the production build with serve
CMD ["serve", "-s", "build", "-l", "3000"]
