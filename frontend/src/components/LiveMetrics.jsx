import { useEffect, useState } from "react";

export default function LiveMetrics() {

    const [data, setData] = useState({
        metrics: [],
        anomalies: []
    });

    useEffect(() => {

        const socket = new WebSocket("ws://127.0.0.1:8000/ws");

        socket.onmessage = (event) => {

            const parsedData = JSON.parse(event.data);

            setData(parsedData);
        };

        return () => socket.close();

    }, []);

    return (
        <div className="p-6 text-white">

            <h1 className="text-3xl font-bold mb-6">
                KubeMind AI Dashboard
            </h1>

            <div className="mb-8">
                <h2 className="text-2xl mb-4">Live Metrics</h2>

                {
                    data.metrics.map((pod, index) => (
                        <div
                            key={index}
                            className="bg-gray-900 p-4 rounded-xl mb-3"
                        >
                            <p><strong>Pod:</strong> {pod.name}</p>
                            <p><strong>CPU:</strong> {pod.cpu_usage}%</p>
                            <p><strong>Memory:</strong> {pod.memory_usage}%</p>
                        </div>
                    ))
                }
            </div>

            <div>
                <h2 className="text-2xl mb-4 text-red-400">
                    AI Anomalies
                </h2>

                {
                    data.anomalies.length === 0 ? (
                        <p>No anomalies detected</p>
                    ) : (
                        data.anomalies.map((anomaly, index) => (
                            <div
                                key={index}
                                className="bg-red-900 p-4 rounded-xl mb-3"
                            >
                                <p><strong>Pod:</strong> {anomaly.pod}</p>
                                <p><strong>Issue:</strong> {anomaly.type}</p>
                                <p><strong>Severity:</strong> {anomaly.severity}</p>
                                <p>{anomaly.message}</p>
                            </div>
                        ))
                    )
                }
            </div>

        </div>
    );
}