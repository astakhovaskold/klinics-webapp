# Base image
FROM node:18.14.0-alpine

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package.json ./
COPY pnpm-lock.yaml ./

# Install app dependencies
RUN npm install -g pnpm@7.27.0
RUN pnpm install --frozen-lockfile

# Bundle app source
COPY . .
