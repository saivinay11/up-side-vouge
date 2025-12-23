# Build stage
FROM node:18 AS builder
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
RUN npm ci
COPY . .
RUN npx webpack --mode production


# Serve stage
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist/ /usr/share/nginx/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]