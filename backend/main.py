from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from collectors.pod_collector import get_pods
from collectors.metrics_collector import get_pod_metrics

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