import React, { ChangeEvent, FC, useState } from "react";
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
  ProvinceTimeseriesCase,
  ProvinceTimeseriesMortality,
  ProvinceTimeseriesRecovered,
} from "../../types";
import StyledSwitchField from "../../styles/StyledSwitchField";
import styled from "styled-components";

type DailySpreadChartDataKey = "cases" | "deaths" | "recovered";
type DailySpreadChartDataValue =
  | ProvinceTimeseriesCase[]
  | ProvinceTimeseriesMortality[]
  | ProvinceTimeseriesRecovered[];

interface DailySpreadChartProps {
  cases: ProvinceTimeseriesCase[];
  mortality: ProvinceTimeseriesMortality[];
  recovered: ProvinceTimeseriesRecovered[];
}

const DataKeyColors: Record<DailySpreadChartDataKey, string> = {
  cases: "var(--clr-cases)",
  deaths: "var(--clr-deaths)",
  recovered: "var(--clr-recovered)",
};

const DailySpreadChart: FC<DailySpreadChartProps> = ({
  cases,
  mortality,
  recovered,
}) => {
  const [dataKey, setDataKey] = useState<DailySpreadChartDataKey>("cases");
  const handleDataKeyChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDataKey(e.target.value as DailySpreadChartDataKey);
  };

  const DataKeyValues: Record<
    DailySpreadChartDataKey,
    DailySpreadChartDataValue
  > = {
    cases: cases,
    deaths: mortality,
    recovered: recovered,
  };

  return (
    <Wrapper>
      <h3>Daily spread chart</h3>
      {/* <div>
        <button onClick={() => setDataKey("cases")}>cases</button>
        <button onClick={() => setDataKey("deaths")}>deaths</button>
        <button onClick={() => setDataKey("recovered")}>recovered</button>
      </div> */}
      <StyledSwitchField>
        <input
          type="radio"
          name="radio-trend-daily"
          id="radio-trend-daily-cases"
          value="cases"
          checked={dataKey === "cases"}
          onChange={handleDataKeyChange}
        />
        <label htmlFor="radio-trend-daily-cases">Cases</label>
        <input
          type="radio"
          name="radio-trend-daily"
          id="radio-trend-daily-deaths"
          value="deaths"
          checked={dataKey === "deaths"}
          onChange={handleDataKeyChange}
        />
        <label htmlFor="radio-trend-daily-deaths">Fatal</label>
        <input
          type="radio"
          name="radio-trend-daily"
          id="radio-trend-daily-recovered"
          value="recovered"
          checked={dataKey === "recovered"}
          onChange={handleDataKeyChange}
        />
        <label htmlFor="radio-trend-daily-recovered">Recovered</label>
      </StyledSwitchField>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={DataKeyValues[dataKey]}>
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
      </ResponsiveContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export default DailySpreadChart;
