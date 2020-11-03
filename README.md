# E2E Cypress tests made useful through kubernetes cronjobs 

This repo is made as a PoC for running cypress tests dockerized in kubernetes as prep work for prometheus alerting.

### Steps

1. `minikube start` to initiate Kubernetes
2. `eval $(minikube -p minikube docker-env)` to point your shell to minikube’s docker-daemon, run:
3. `docker build -t cypress-test-image:1.0.0 .` to create an image of our tests
4. `kubectl create -f ./.charts/namespace.yaml && kubectl create -f ./.charts/cronjob.yaml` to create the e2e namespace and scheduele cronjob
5. `kubectl get pods -n e2e-tests` to get the pods(wait one minute due to the cronjob schedule)
6. Take the pod id from ☝️ and `kubectl logs -n e2e-tests job-1604401440-v6477` 

