def generate_graph(pods, anomalies):

    nodes = []
    edges = []

    spacing_x = 250
    start_x = 100

    anomaly_pods = []

    for anomaly in anomalies:
        anomaly_pods.append(anomaly["pod"])

    for index, pod in enumerate(pods):

        is_anomaly = pod["name"] in anomaly_pods

        background_color = "#0f172a"
        border_color = "#334155"

        if is_anomaly:
            background_color = "#7f1d1d"
            border_color = "#ef4444"

        node = {
            "id": str(index + 1),

            "position": {
                "x": start_x + (index * spacing_x),
                "y": 100
            },

            "data": {
                "label": pod["name"]
            },

            "style": {
                "background": background_color,
                "color": "white",
                "border": f"2px solid {border_color}",
                "borderRadius": "16px",
                "padding": 12,
                "width": 180,
                "textAlign": "center",
                "fontWeight": "bold",
                "boxShadow": (
                    "0 0 20px rgba(239,68,68,0.7)"
                    if is_anomaly else
                    "0 0 0 rgba(0,0,0,0)"
                )
            }
        }

        nodes.append(node)

    for i in range(len(nodes) - 1):

        edge = {
            "id": f"e{i+1}-{i+2}",
            "source": str(i + 1),
            "target": str(i + 2),
            "animated": True,

            "style": {
                "stroke": "#38bdf8",
                "strokeWidth": 2
            }
        }

        edges.append(edge)

    return {
        "nodes": nodes,
        "edges": edges
    }