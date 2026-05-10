def detect_anomalies(metrics):
    anomalies = []

    for pod in metrics:
        cpu = pod.get("cpu_usage", 0)
        memory = pod.get("memory_usage", 0)

        if cpu > 80:
            anomalies.append({
                "pod": pod["name"],
                "type": "High CPU Usage",
                "severity": "critical",
                "message": f"CPU usage is {cpu}%"
            })

        if memory > 500:
            anomalies.append({
                "pod": pod["name"],
                "type": "High Memory Usage",
                "severity": "warning",
                "message": f"Memory usage is {memory}%"
            })

    return anomalies