# Use Node.js 18 Alpine for small image size
FROM node:18-alpine

WORKDIR /app

# Copy package files first (better caching)
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project files
COPY . .

# Build production-ready frontend (without env vars - injected at runtime)
RUN npm run build

# Install "serve" to host production build
RUN npm install -g serve

# Copy runtime env injection script
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

# Expose port 3000
EXPOSE 3000

# Use entrypoint to inject env vars at runtime
ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["serve", "-s", "build", "-l", "3000"]