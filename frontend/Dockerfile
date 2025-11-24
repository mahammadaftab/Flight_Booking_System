FROM node:18-alpine

# Install additional packages for crypto support
RUN apk add --no-cache python3 make g++

WORKDIR /app

# Set environment variables to fix crypto issues
ENV NODE_OPTIONS=--openssl-legacy-provider

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "preview"]