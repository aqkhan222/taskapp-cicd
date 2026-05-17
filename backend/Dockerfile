# Stage 1: Builder
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files and install dependencies (including dev deps for potential build steps)
COPY package*.json ./
RUN npm ci

# Copy source code
COPY . .

# Stage 2: Production
FROM node:18-alpine

WORKDIR /app

# Copy only needed files from builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/src ./src
COPY --from=builder /app/package*.json ./

# Expose the port
EXPOSE 3001

# Health check (optional but good)
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3001/api/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Start the app
CMD ["node", "src/index.js"]