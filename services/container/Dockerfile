FROM node:12.14-alpine

RUN mkdir /shared

COPY ./shared/ /shared

WORKDIR /app

# install dependencies
COPY ./container/yarn.lock ./container/package.json ./
RUN yarn

# copy over the rest of the files
COPY ./container/ .

RUN ls -la /shared

# build typescript
# then, remove dev dependencies (no longer need because typescript it built)
RUN yarn build && npm prune --production

# run
CMD ["node", "dist/index.js"]
