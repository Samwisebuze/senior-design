# Virtuoso: Development Guide

# Requirements

- [Docker CE](https://docs.docker.com/v17.09/engine/installation/) (`brew cask install docker-for-mac`)
- [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/) (`brew install kubernetes-cli`)
- [minikube](https://minikube.sigs.k8s.io/docs/start/) + [a hypervisor of your choice](https://minikube.sigs.k8s.io/docs/reference/drivers/) for macOS, linux, or windows
	- Hypervisor options: VirtualBox (all platforms), Hyper-V (windows only), VMWare Fusion (macOS only), or HyperKit (macOS only), or KVM (linux only) 

# Quick Start

```sh
$ docker-compose up
```

