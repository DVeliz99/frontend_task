# Etapa 1: Compilación Angular
FROM node:18-alpine AS builder

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build -- --configuration=production

# Etapa 2: Servidor Nginx para producción
FROM nginx:stable-alpine

COPY --from=builder /app/dist/frontend-task /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
