import { useEffect, useState } from "react"
import MetricsChart from "./components/MetricsChart"
import DependencyGraph from "./components/DependencyGraph"
import AIInsights from "./components/AIInsights"

function App() {

  const [pods, setPods] = useState([])
  const [metrics, setMetrics] = useState([])
  const [anomalies, setAnomalies] = useState([])
  const [graph, setGraph] = useState({
  nodes: [],
  edges: []
})
  const [recommendations, setRecommendations] = useState([])

  useEffect(() => {

    const socket = new WebSocket("ws://127.0.0.1:8000/ws")

    socket.onopen = () => {
      console.log("WebSocket Connected")
    }

    socket.onmessage = (event) => {

      const data = JSON.parse(event.data)

      console.log("RAW WS DATA:", data)

      console.log("Live Data:", data)

      setMetrics(data.metrics || [])

      setAnomalies(data.anomalies || [])

      setPods(data.pods || [])

      setGraph(data.graph || {
        nodes: [],
        edges: []
      })

      setRecommendations(data.recommendations || [])
    }

    socket.onerror = (error) => {
      console.error("WebSocket Error:", error)
    }

    socket.onclose = () => {
      console.log("WebSocket Disconnected")
    }

    return () => socket.close()

  }, [])

  return (

    <div className="min-h-screen bg-slate-950 text-white p-6">

      {/* Header */}

      <h1 className="text-5xl font-bold mb-2">
        KubeMind AI
      </h1>

      <p className="text-slate-400 mb-8">
        AI-powered Kubernetes Intelligence Platform
      </p>

      {/* Summary Cards */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h2 className="text-slate-400 text-sm">
            Total Pods
          </h2>

          <p className="text-4xl font-bold mt-2">
            {pods.length}
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h2 className="text-slate-400 text-sm">
            Active Metrics
          </h2>

          <p className="text-4xl font-bold mt-2">
            {metrics.length}
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h2 className="text-slate-400 text-sm">
            Cluster Status
          </h2>

          <p className="text-2xl font-bold text-green-400 mt-2">
            Healthy
          </p>
        </div>

      </div>

      {/* Metrics Chart */}

      <div className="mb-8">
        <MetricsChart metrics={metrics} />
      </div>

      <DependencyGraph graph={graph} />

      {/* AI Anomaly Section */}

      <div className="mb-8">

        <h2 className="text-3xl font-bold mb-4 text-red-400">
          AI Anomaly Detection
        </h2>

        {
          anomalies.length === 0 ? (

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <p className="text-green-400 font-semibold">
                No anomalies detected
              </p>
            </div>

          ) : (

            anomalies.map((anomaly, index) => (

              <div
                key={index}
                className="bg-red-950 border border-red-800 rounded-2xl p-6 mb-4"
              >

                <p className="text-xl font-bold text-red-400">
                  {anomaly.type}
                </p>

                <p className="mt-2">
                  <span className="font-semibold">Pod:</span> {anomaly.pod}
                </p>

                <p>
                  <span className="font-semibold">Severity:</span> {anomaly.severity}
                </p>

                <p className="mt-2 text-slate-300">
                  {anomaly.message}
                </p>

              </div>

            ))

          )
        }

      </div>

      <AIInsights recommendations={recommendations} />

      {/* Pod Metrics Table */}

      <div className="border border-slate-800 rounded-2xl overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-900">

            <tr>
              <th className="text-left p-4">Pod Name</th>
              <th className="text-left p-4">Namespace</th>
              <th className="text-left p-4">Status</th>
              <th className="text-left p-4">Node</th>
              <th className="text-left p-4">CPU</th>
              <th className="text-left p-4">Memory</th>
            </tr>

          </thead>

          <tbody>

            {pods.map((pod, index) => (

              <tr
                key={index}
                className="border-t border-slate-800 hover:bg-slate-900 transition"
              >

                <td className="p-4">
                  {pod.name}
                </td>

                <td className="p-4">
                  {pod.namespace}
                </td>

                <td className="p-4">

                  <span
                    className={
                      pod.status === "Running"
                        ? "text-green-400 font-semibold"
                        : "text-red-400 font-semibold"
                    }
                  >
                    {pod.status}
                  </span>

                </td>

                <td className="p-4">
                  {pod.node}
                </td>

                <td className="p-4">
                  {metrics[index]?.cpu || metrics[index]?.cpu_usage || "N/A"}
                </td>

                <td className="p-4">
                  {metrics[index]?.memory || metrics[index]?.memory_usage || "N/A"}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  )
}

export default App