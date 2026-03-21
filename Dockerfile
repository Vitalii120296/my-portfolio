# build stage
FROM node:22-alpine as build

WORKDIR /app

COPY ./package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# production stage
FROM nginx:alpine

# видаляємо дефолтний конфіг
RUN rm /etc/nginx/conf.d/default.conf

# копіюємо наш конфіг
COPY nginx.conf /etc/nginx/conf.d

# копіюємо білд
COPY --from=build /app/build/client /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]