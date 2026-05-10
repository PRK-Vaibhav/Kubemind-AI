export default function AIInsights({ recommendations }) {

  return (

    <div className="mb-8">

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

        <h2 className="text-3xl font-bold text-cyan-400 mb-6">
          AI Recommendations
        </h2>

        {
          recommendations.length === 0 ? (

            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">

              <p className="text-green-400 font-semibold">
                No recommendations required
              </p>

            </div>

          ) : (

            recommendations.map((rec, index) => (

              <div
                key={index}
                className="bg-slate-950 border border-cyan-800 rounded-xl p-5 mb-4"
              >

                <p className="text-xl font-bold text-cyan-400">
                  {rec.issue}
                </p>

                <p className="mt-2">
                  <span className="font-semibold">
                    Pod:
                  </span> {rec.pod}
                </p>

                <p>
                  <span className="font-semibold">
                    Severity:
                  </span> {rec.severity}
                </p>

                <p className="mt-4 text-white">
                  <span className="font-semibold text-cyan-400">
                    Recommendation:
                  </span>
                  {" "}
                  {rec.recommendation}
                </p>

                <p className="mt-2 text-slate-400">
                  {rec.reason}
                </p>

              </div>

            ))

          )
        }

      </div>

    </div>
  )
}