import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

function convertCpu(cpu) {

  if (cpu.endsWith("n")) {
    return parseInt(cpu.replace("n", "")) / 1000000
  }

  if (cpu.endsWith("m")) {
    return parseInt(cpu.replace("m", ""))
  }

  return parseInt(cpu)
}

function MetricsChart({ metrics }) {

  const chartData = metrics.map((item) => ({
    name: item.name.substring(0, 10),
    cpu: convertCpu(item.cpu),
  }))

  return (

    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

      <h2 className="text-3xl font-bold mb-6">
        Pod CPU Usage
      </h2>

      <div className="h-96">

        <ResponsiveContainer width="100%" height="100%">

          <BarChart data={chartData}>

            <XAxis
              dataKey="name"
              stroke="#94a3b8"
            />

            <YAxis stroke="#94a3b8" />

            <Tooltip />

            <Bar
              dataKey="cpu"
              fill="#3b82f6"
              radius={[8, 8, 0, 0]}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>
  )
}

export default MetricsChart