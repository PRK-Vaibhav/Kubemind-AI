from kubernetes import client, config

config.load_kube_config()

v1 = client.CoreV1Api()

def get_pods():

    pods = v1.list_pod_for_all_namespaces(watch=False)

    pod_data = []

    for pod in pods.items:
        pod_data.append({
            "name": pod.metadata.name,
            "namespace": pod.metadata.namespace,
            "status": pod.status.phase,
            "node": pod.spec.node_name
        })

    return pod_data