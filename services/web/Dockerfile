# Step 1: Build static files
FROM node:lts as builder

WORKDIR /app
ENV NODE_ENV=production

COPY . .

RUN yarn install --silent

RUN yarn build

# Step 2: Copy static files for nginx server
# Runs static files on nginx, resulting in
# a very small image size.
# https://github.com/gatsbyjs/gatsby-docker
FROM nginx:1.17.9-alpine

COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder app/public/ /usr/share/nginx/html/

EXPOSE 80
