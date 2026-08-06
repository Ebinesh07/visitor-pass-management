import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = [
  "#2563EB",
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
      value: dashboard.pendingVisitors,
    },
    {
      name: "Approved",
      value: dashboard.approvedVisitors,
    },
    {
      name: "Checked In",
      value: dashboard.checkedInVisitors,
    },
    {
      name: "Checked Out",
      value: dashboard.checkedOutVisitors,
    },
    {
      name: "Rejected",
      value: dashboard.rejectedVisitors,
    },
    {
      name: "Cancelled",
      value: dashboard.cancelledVisitors,
    },
  ];

  return (
    <div className="chart-card">

      <div className="chart-header">

        <h5>Visitor Status</h5>

      </div>

      <ResponsiveContainer
        width="100%"
        height={340}
      >

        <PieChart>

          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={115}
            innerRadius={65}
            paddingAngle={3}
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

    </div>
  );
};

export default VisitorChart;