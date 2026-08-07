import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = [
  "#F59E0B",
  "#22C55E",
  "#8B5CF6",
  "#0EA5E9",
  "#EF4444",
  "#6B7280",
];

const VisitorChart = ({ dashboard }) => {
  const data = [
    {
      name: "Pending",
      value: Number(dashboard.pendingVisitors) || 0,
    },
    {
      name: "Approved",
      value: Number(dashboard.approvedVisitors) || 0,
    },
    {
      name: "Checked In",
      value: Number(dashboard.checkedInVisitors) || 0,
    },
    {
      name: "Checked Out",
      value: Number(dashboard.checkedOutVisitors) || 0,
    },
    {
      name: "Rejected",
      value: Number(dashboard.rejectedVisitors) || 0,
    },
    {
      name: "Cancelled",
      value: Number(dashboard.cancelledVisitors) || 0,
    },
  ];

  const hasData = data.some((item) => item.value > 0);

  return (
    <div className="chart-card">
      <div className="chart-header">
        <h5>Visitor Status</h5>
      </div>

      <div style={{ width: "100%", height: 340 }}>
        {hasData ? (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                outerRadius={110}
                innerRadius={60}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index]}
                  />
                ))}
              </Pie>

              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div
            style={{
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            No Visitor Data
          </div>
        )}
      </div>
    </div>
  );
};

export default VisitorChart;