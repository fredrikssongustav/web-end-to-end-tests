# E2E Cypress tests made useful through kubernetes cronjobs 

This repo is made as a PoC for running cypress tests dockerized in kubernetes as prep work for prometheus alerting.

### Steps

1. `minikube start` to initiate Kubernetes
2. `eval $(minikube -p minikube docker-env)` to point your shell to minikube’s docker-daemon
3. `docker build -t test-runner-image:1.0.0 .` to create an image of our tests
4. `kubectl create -f ./.charts/local-development/namespaces.yaml` to create namespaces
5a. `kubectl create -f ./.charts/local-development/prometheus.yaml` to set up prometheus pushgateway
5b. Optional, set up proxy for the pushgateway dashboard to see logged events `kubectl port-forward -n monitoring-prometheus pushgateway-77f6754d4-6crx5 3000:9091`
6a. `kubectl create -f ./.charts/local-development/job.yaml` to set up cronjob
6b. Optional `kubectl create job --from cronjob/job job -n e2e-tests` to scheduele an ad hoc job
7. `kubectl get pods -n e2e-tests` to get the pods
8. Take the pod id from ☝️ and `kubectl logs -n e2e-tests job-16044` 

