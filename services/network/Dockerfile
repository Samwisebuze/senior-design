FROM node:10-alpine as builder

# set our node environment, either development or production
# defaults to production, compose overrides this to development on build and run
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

# install dependencies first, in a different location for easier app bind mounting for local development
# due to default /opt permissions we have to create the dir with root and change perms
RUN mkdir /opt/app && chown node:node /opt/app
WORKDIR /opt/app

## Intall Dependencies
RUN apk add --no-cache python make g++
RUN apk add yarn

USER node

COPY package.json package-lock.json* ./
RUN yarn install --no-optional && yarn cache clean --force

ENV PATH /opt/app/node_modules/.bin:$PATH

FROM node:10-alpine as final

COPY --from=builder /opt/app/node_modules .

COPY ./build .

ENTRYPOINT ["node", "index.js"]