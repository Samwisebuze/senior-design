# Step 1: Build static files
FROM node:12.16.1-alpine3.9 as builder

WORKDIR /app
ENV NODE_ENV=production

COPY package.json yarn.lock gatsby-config.js ./

RUN yarn install

COPY ./ ./

RUN yarn build


# Step 2: Copy static files for nginx server
# Runs static files on nginx, resulting in
# a very small image size.
# https://github.com/gatsbyjs/gatsby-docker
FROM nginx:1.17.9-alpine

COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder app/public/ /usr/share/nginx/html/

EXPOSE 80
