from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from collectors.pod_collector import get_pods
from collectors.metrics_collector import get_pod_metrics
from analyzers.anomaly_detector import detect_anomalies
from fastapi import WebSocket
from ws.socket_manager import manager
import asyncio
from analyzers.graph_generator import generate_graph
from analyzers.recommendation_engine import generate_recommendations

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {
        "message": "KubeMind AI Backend Running"
    }

@app.get("/health")
def health():
    return {
        "status": "healthy"
    }

@app.get("/pods")
def pods():
    return get_pods()

@app.get("/metrics")
def metrics():
    return get_pod_metrics()

@app.get("/anomalies")
def anomalies():
    metrics = get_pod_metrics()
    return detect_anomalies(metrics)

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):

    await manager.connect(websocket)

    try:
        while True:

            pods = get_pods()

            metrics = get_pod_metrics()

            anomalies = detect_anomalies(metrics)

            recommendations = generate_recommendations(anomalies)

            graph = generate_graph(pods, anomalies)

            data = {
                "pods": pods,
                "metrics": metrics,
                "anomalies": anomalies,
                "recommendations": recommendations,
                "graph": graph
            }

            await manager.broadcast(data)

            await asyncio.sleep(5)

    except Exception as e:
        manager.disconnect(websocket)