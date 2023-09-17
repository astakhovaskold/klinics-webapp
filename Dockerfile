# Base image
FROM node:18.14.0-alpine

WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY . .

# Install app dependencies
RUN npm install -g pnpm@8.7.0
RUN pnpm install --frozen-lockfile

RUN pnpm run build

CMD ["pnpm", "run", "start:prod"]
