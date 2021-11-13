import React, { ChangeEvent, FC, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { format } from "date-fns";
import { ProvinceTimeseriesActive } from "../../types";
import StyledSwitchField from "../../styles/StyledSwitchField";

export type CumulativeSpreadChartDataKey =
  | "cases"
  | "deaths"
  | "recovered"
  | "combined";

interface CumulativeSpreadChartProps {
  active: ProvinceTimeseriesActive[];
}

const DataKeyColors: Record<CumulativeSpreadChartDataKey, string> = {
  cases: "var(--clr-cases)",
  deaths: "var(--clr-deaths)",
  recovered: "var(--clr-recovered)",
  combined: "",
};

const CumulativeSpreadChart: FC<CumulativeSpreadChartProps> = ({ active }) => {
  const [dataKey, setDataKey] = useState<CumulativeSpreadChartDataKey>("cases");
  const handleDataKeyChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDataKey(e.target.value as CumulativeSpreadChartDataKey);
  };

  return (
    <>
      <h3>Cumulative spread chart</h3>
      <StyledSwitchField>
        <input
          type="radio"
          name="radio-trend-cumulative"
          id="radio-trend-cumulative-cases"
          value="cases"
          checked={dataKey === "cases"}
          onChange={handleDataKeyChange}
        />
        <label htmlFor="radio-trend-cumulative-cases">Cases</label>
        <input
          type="radio"
          name="radio-trend-cumulative"
          id="radio-trend-cumulative-deaths"
          value="deaths"
          checked={dataKey === "deaths"}
          onChange={handleDataKeyChange}
        />
        <label htmlFor="radio-trend-cumulative-deaths">Fatal</label>
        <input
          type="radio"
          name="radio-trend-cumulative"
          id="radio-trend-cumulative-recovered"
          value="recovered"
          checked={dataKey === "recovered"}
          onChange={handleDataKeyChange}
        />
        <label htmlFor="radio-trend-cumulative-recovered">Recovered</label>
        <input
          type="radio"
          name="radio-trend-cumulative"
          id="radio-trend-cumulative-combined"
          value="combined"
          checked={dataKey === "combined"}
          onChange={handleDataKeyChange}
        />
        <label htmlFor="radio-trend-cumulative-combined">Combined</label>
      </StyledSwitchField>
      <ResponsiveContainer width="100%" height={300}>
        {dataKey === "combined" ? (
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
            {Object.entries(DataKeyColors).map(([key, value]) => (
              <Line
                key={key}
                type="monotone"
                dataKey={key}
                stroke={value}
                strokeWidth={3}
                dot={false}
                isAnimationActive={false}
              />
            ))}
          </LineChart>
        ) : (
          <AreaChart data={active}>
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
              dataKey={dataKey}
              stroke={DataKeyColors[dataKey]}
              strokeWidth={3}
              fill={DataKeyColors[dataKey]}
              isAnimationActive={false}
            />
          </AreaChart>
        )}
      </ResponsiveContainer>
    </>
  );
};

export default CumulativeSpreadChart;
