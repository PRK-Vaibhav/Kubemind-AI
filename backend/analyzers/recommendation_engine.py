def generate_recommendations(anomalies):

    recommendations = []

    for anomaly in anomalies:

        recommendation = {
            "pod": anomaly["pod"],
            "issue": anomaly["type"],
            "severity": anomaly["severity"]
        }

        # CPU Recommendations

        if anomaly["type"] == "High CPU Usage":

            recommendation["recommendation"] = (
                "Increase CPU limits or scale replicas."
            )

            recommendation["reason"] = (
                "CPU usage exceeded safe operational threshold."
            )

        # Memory Recommendations

        elif anomaly["type"] == "High Memory Usage":

            recommendation["recommendation"] = (
                "Increase memory allocation or investigate memory leaks."
            )

            recommendation["reason"] = (
                "Memory consumption is abnormally high."
            )

        else:

            recommendation["recommendation"] = (
                "Investigate pod behavior."
            )

            recommendation["reason"] = (
                "Unknown anomaly detected."
            )

        recommendations.append(recommendation)

    return recommendations