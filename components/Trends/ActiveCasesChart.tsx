import React, { FC } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { format } from "date-fns";
import { ProvinceTimeseriesActive } from "../../types";
import styled from "styled-components";

interface ActiveCasesChartProps {
  active: ProvinceTimeseriesActive[];
}

const ActiveCasesChart: FC<ActiveCasesChartProps> = ({ active }) => {
  return (
    <Wrapper>
      <h3>Active cases chart</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={active}>
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
          <Line
            type="monotone"
            dataKey="activeCases"
            stroke="var(--clr-cases)"
            strokeWidth={3}
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export default ActiveCasesChart;
