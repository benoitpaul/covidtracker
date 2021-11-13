import React, { FC } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { format } from "date-fns";
import {
  ProvinceTimeseriesAvaccine,
  ProvinceTimeseriesCvaccine,
} from "../../types";

interface CummulativeVaccinesChartProps {
  avaccine: ProvinceTimeseriesAvaccine[];
  cvaccine: ProvinceTimeseriesCvaccine[];
}

const CummulativeVaccinesChart: FC<CummulativeVaccinesChartProps> = ({
  avaccine,
  cvaccine,
}) => {
  const merged = avaccine.map((a) => {
    const index = cvaccine.findIndex(
      (c) =>
        c.date.toString() === a.date.toString() && c.province === a.province
    );
    const c = index !== -1 ? cvaccine[index] : null;
    return {
      ...a,
      ...(c ? c : {}),
      atLeastOneDose: c
        ? a.cumulativeAvaccine - c.cumulativeCvaccine
        : a.cumulativeAvaccine,
    };
  });
  console.log({ merged });

  return (
    <>
      <h3>Cumulative vaccines chart</h3>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={merged}>
          <XAxis
            dataKey="date"
            tickFormatter={(value) => format(value, "MMM d")}
          />
          <YAxis
            tickFormatter={(value) =>
              new Intl.NumberFormat("en", {
                notation: "compact",
                compactDisplay: "short",
              }).format(value)
            }
          />
          <CartesianGrid stroke="#eee" strokeDasharray="3 3" />
          <Area
            type="monotone"
            dataKey="atLeastOneDose"
            stroke="var(--clr-at-least-one-dose)"
            strokeWidth={1}
            fill="var(--clr-at-least-one-dose)"
            isAnimationActive={false}
          />
          <Area
            type="monotone"
            dataKey="cumulativeCvaccine"
            stroke="var(--clr-fully-vaccinated)"
            strokeWidth={1}
            fill="var(--clr-fully-vaccinated)"
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </>
  );
};

export default CummulativeVaccinesChart;
