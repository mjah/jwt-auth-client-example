# ---
# Build
# ---
FROM node:12-alpine as build
ENV NODE_ENV production
WORKDIR /app
COPY . .
RUN yarn install --production=false && yarn run build

# ---
# Serve
# ---
FROM nginx:stable-alpine as serve
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# Maintainer
LABEL maintainer "Muhammad Abdul Hafiz <moe@moejay.com>"
