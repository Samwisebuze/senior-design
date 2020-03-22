# Virtuoso: Development Guide

# Requirements

- [Docker CE](https://docs.docker.com/v17.09/engine/installation/) (`brew cask install docker-for-mac`)

# Quick Start

## Clone Microservices and `docker build`

TODO: automate this in a way that makes sense

```sh
$ cd web \
  && yarn install \
  && docker build -t virtuoso-web . \
  && cd ../../../ \
  && git clone git@github.com:Samwisebuze/virtuoso-auth.git \
  && cd virtuoso-auth \
  && docker build -t virtuoso-auth . \
  && cd .. \
  && git clone git@github.com:Samwisebuze/virtuoso-gateway.git \
  && cd virtuoso-gateway \
  && docker build -t virtuoso-api-gateway . \
  && cd .. \
  && git clone git@github.com:koreyhuskonen/containeroso.git \
  && cd containeroso \
  && docker build -t virtuoso-container . \
  && cd .. \
  && git clone git@github.com:Samwisebuze/virtuoso-network.git \
  && cd virtuoso-network \
  && docker build -t virtuoso-network . \
  && cd ..
```

Then, come back to this directory and run:

```sh
$ docker-compose up
# (use ^c to stop)
```

Check health and get a list of available services in the API Gateway:

```sh
$ curl --request GET --url http://localhost:8001/status
$ curl --request GET --url http://localhost:8001/services | json_pp
```

Example API call through the API Gateway (this example creates a new user):

```sh
$ curl --request POST \
  --url http://localhost:8000/api/v1/register \
  --header 'content-type: application/json' \
  --header 'host: host.docker.internal:4000' \
  --data '{
	"username": "foo@example.com",
	"password": "bar"
}'
```
