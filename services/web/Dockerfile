# # Builds static files
# FROM node:12.16.1-alpine3.9 as builder

# COPY yarn.lock .
# COPY package.json .

# RUN yarn install

# COPY ./ .

# RUN yarn build

# Runs static files on nginx, resulting in
# a very small image size.
# https://github.com/gatsbyjs/gatsby-docker
FROM gatsbyjs/gatsby:onbuild as build

# COPY --from=builder public/ public/
