Demo instructions
=================

- Download and extract Istio

      curl -L https://github.com/istio/istio/releases/download/1.18.1/istio-1.18.1-linux-amd64.tar.gz | tar -xz

- Start minikube

      minikube start
      kubectl get namespaces

- Install Istio and show installed Kubernetes resources

      istio-1.18.1/bin/istioctl install --set profile=demo -y
      kubectl get namespaces
      kubectl --namespace=istio-system get pods

- Install addons for monitoring

      kubectl apply -f istio-1.18.1/samples/addons/prometheus.yaml
      kubectl apply -f istio-1.18.1/samples/addons/kiali.yaml

- Show Kiali

      istio-1.18.1/bin/istioctl dashboard kiali

- Source enviornment variables for Istio ingress

      source istio_ingress_envs

- Take a look at the [demo app source code](https://github.com/istio/istio/tree/master/samples/bookinfo/src)
    - Show setting of the `end-user` header in [productpage.py](https://github.com/istio/istio/blob/master/samples/bookinfo/src/productpage/productpage.py#L183)

- Showw the demo application Kubernetes resources

      less istio-1.18.1/samples/bookinfo/platform/kube/bookinfo.yaml
      less istio-1.18.1/samples/bookinfo/networking/bookinfo-gateway.yaml

- Install example project and make it accessible from the outside

      kubectl apply -f istio-1.18.1/samples/bookinfo/platform/kube/bookinfo.yaml
      kubectl apply -f istio-1.18.1/samples/bookinfo/networking/bookinfo-gateway.yaml

- Open this in the web browser and check it works

      xdg-open ${PRODUCT_PAGE_URL}

- Show that there are currently no sidecar containers

      kubectl describe pod productpage-v1

- Use Istio analyze to debug the problem

      istio-1.18.1/bin/istioctl analyze

- Enable sidecar injection. Check the dashboard to see nothing has changed

      kubectl label namespace default istio-injection=enabled
      kubectl describe pod productpage-v1
      istio-1.18.1/bin/istioctl analyze

- Redeploy project to get pods with injected sidecars

      kubectl rollout restart -f istio-1.18.1/samples/bookinfo/platform/kube/bookinfo.yaml -l app,version
      kubectl describe pod productpage-v1
      istio-1.18.1/bin/istioctl analyze

- Show that we still route to all three versions of the review service

- Shift all traffic to version 1

      kubectl apply -f traffic_shifting_v1.yaml

- Show that we now allways send requests to version 1

- Change the subset to version 3

      kubectl apply -f traffic_shifting_v3.yaml

- Show that we now allways send requests to version 3

- Add a second destination and apply weights

      kubectl apply -f traffic_shifting_v1_v3.yaml

- Show that we now have apprx. 50% v1 and 50% v2

- Force traffic to version 3 if the user is `tester`

      kubectl apply -f traffic_shifting_header_value.yaml
