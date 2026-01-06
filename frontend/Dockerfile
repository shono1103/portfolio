# build stage
FROM node:20-slim AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# nginx stage
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
