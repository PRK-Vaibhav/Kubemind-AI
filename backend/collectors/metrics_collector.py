from kubernetes import client, config

config.load_kube_config()

custom = client.CustomObjectsApi()

def get_pod_metrics():

    metrics = custom.list_cluster_custom_object(
        group="metrics.k8s.io",
        version="v1beta1",
        plural="pods"
    )

    pod_metrics = []

    for item in metrics["items"]:

        containers = item["containers"]

        cpu_usage = containers[0]["usage"]["cpu"]
        memory_usage = containers[0]["usage"]["memory"]

        pod_metrics.append({
            "name": item["metadata"]["name"],
            "namespace": item["metadata"]["namespace"],
            "cpu": cpu_usage,
            "memory": memory_usage
        })

    return pod_metrics