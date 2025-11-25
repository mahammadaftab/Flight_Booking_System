FROM node:18-alpine as build

# Install additional packages for crypto support
RUN apk add --no-cache python3 make g++

WORKDIR /app

# Set environment variables to fix crypto issues
ENV NODE_OPTIONS=--openssl-legacy-provider

COPY package.json .
COPY package-lock.json .

# Install all dependencies including the new ones
RUN npm install

COPY . .

# Build the application
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy the built application to nginx
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]