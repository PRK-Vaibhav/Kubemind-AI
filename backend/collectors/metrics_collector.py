from kubernetes import client, config

config.load_kube_config()

custom_api = client.CustomObjectsApi()


def get_pod_metrics():

    metrics = custom_api.list_cluster_custom_object(
        group="metrics.k8s.io",
        version="v1beta1",
        plural="pods"
    )

    pod_metrics = []

    for item in metrics["items"]:

        pod_name = item["metadata"]["name"]

        namespace = item["metadata"]["namespace"]

        total_cpu = 0
        total_memory = 0

        for container in item["containers"]:

            cpu_raw = container["usage"]["cpu"]
            memory_raw = container["usage"]["memory"]

            # CPU Conversion

            if cpu_raw.endswith("n"):
                cpu_value = int(cpu_raw.replace("n", "")) / 1000000

            elif cpu_raw.endswith("m"):
                cpu_value = int(cpu_raw.replace("m", ""))

            else:
                cpu_value = 0

            # Memory Conversion

            if memory_raw.endswith("Ki"):
                memory_value = int(memory_raw.replace("Ki", "")) / 1024

            elif memory_raw.endswith("Mi"):
                memory_value = int(memory_raw.replace("Mi", ""))

            else:
                memory_value = 0

            total_cpu += cpu_value
            total_memory += memory_value

        pod_metrics.append({
            "name": pod_name,
            "namespace": namespace,
            "cpu_usage": round(total_cpu, 2),
            "memory_usage": round(total_memory, 2)
        })

    return pod_metrics