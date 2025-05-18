# Stage 1: Build the Angular application
FROM node:20-alpine as builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Serve the application using Node.js
FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY server.js ./

# Install only production dependencies
RUN npm ci --only=production

# Copy built application from builder stage
COPY --from=builder /app/dist /app/dist

# Use non-root user
USER node

EXPOSE 80

CMD ["node", "server.js"]