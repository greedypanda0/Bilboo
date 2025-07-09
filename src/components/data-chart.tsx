"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type DataPoint = {
  year: string;
  value: number;
};

export default function DataChart({ data }: { data: DataPoint[] }) {
  return (
    <div className="shadow">
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#8884d8"
            fill="rgba(136, 132, 216, 0.2)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
