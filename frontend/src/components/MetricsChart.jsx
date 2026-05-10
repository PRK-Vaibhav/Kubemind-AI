import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts"

export default function MetricsChart({ metrics }) {

  const chartData = metrics.map((metric) => ({
    name: metric.name?.slice(0, 10) || "unknown",
    cpu: metric.cpu_usage || 0
  }))

  return (

    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

      <h2 className="text-2xl font-bold mb-6 text-white">
        Pod CPU Usage
      </h2>

      <div style={{ width: "100%", height: 300 }}>

        <ResponsiveContainer width="100%" height="100%">

          <BarChart data={chartData}>

            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip />

            <Bar dataKey="cpu" fill="#3b82f6" />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>
  )
}