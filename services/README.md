# Virtuoso: Development Guide

# Requirements

- [Docker CE](https://docs.docker.com/v17.09/engine/installation/) (`brew cask install docker-for-mac`)

# Quick Start

## Clone Microservices and `docker build`

```sh
$ git clone --recurse-submodules git@github.com:Samwisebuze/senior-design.git
$ cd senior-design
$ docker-compose up
# (use ^c to stop)
```

Or, if you already have the repository cloned, pull in the submodules with:

```sh
$ git submodule update --init
```

Pull in all changes from submodules:

```sh
$ git submodule update --remote
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
