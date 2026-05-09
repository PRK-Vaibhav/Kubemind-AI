import { useEffect, useState } from "react"
import { fetchPods, fetchMetrics } from "./services/api"
import MetricsChart from "./components/MetricsChart"

function App() {

  const [pods, setPods] = useState([])
  const [metrics, setMetrics] = useState([])

  useEffect(() => {

    loadPods()

    const interval = setInterval(() => {
      loadPods()
    }, 5000)

    return () => clearInterval(interval)

  }, [])

  async function loadPods() {

    const podData = await fetchPods()
    const metricsData = await fetchMetrics()

    console.log(metricsData)

    setPods(podData)
    setMetrics(metricsData)
  }

  return (

    <div className="min-h-screen bg-slate-950 text-white p-6">

      <h1 className="text-5xl font-bold mb-2">
        KubeMind AI
      </h1>

      <p className="text-slate-400 mb-8">
        AI-powered Kubernetes Intelligence Platform
      </p>

      {/* Summary Cards */}

      <div className="grid grid-cols-3 gap-4 mb-8">

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

      {/* Chart */}

      <div className="mb-8">
        <MetricsChart metrics={metrics} />
      </div>

      {/* Table */}

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
                  {metrics[index]?.cpu || "N/A"}
                </td>

                <td className="p-4">
                  {metrics[index]?.memory || "N/A"}
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