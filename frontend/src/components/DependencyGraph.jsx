import React from "react"
import ReactFlow from "reactflow"
import "reactflow/dist/style.css"

export default function DependencyGraph({ graph }) {

  return (

    <div className="mb-8">

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">

        <div className="p-6 border-b border-slate-800">

          <h2 className="text-3xl font-bold text-white">
            Dependency Intelligence Graph
          </h2>

          <p className="text-slate-400 mt-2">
            Live Kubernetes topology visualization
          </p>

        </div>

        <div style={{ width: "100%", height: "500px" }}>

          <ReactFlow
            nodes={graph?.nodes || []}
            edges={graph?.edges || []}
            fitView
          />

        </div>

      </div>

    </div>
  )
}