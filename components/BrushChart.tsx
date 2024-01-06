import React, { useState } from 'react';
import { LinePath } from '@visx/shape';
import { Brush } from '@visx/brush';
import { scaleTime, scaleLinear } from '@visx/scale';
import { Group } from '@visx/group';
import { AxisBottom, AxisLeft } from '@visx/axis';
import { max, extent } from 'd3-array';
import { timeParse, timeFormat } from 'd3-time-format';

// Parse dates and format them
const parseDate = timeParse('%Y-%m-%d');
const formatDate = timeFormat('%b %d');

const SignupBrushChart = ({ data, xAxisLength }) => {
  const height = xAxisLength * 0.5;

  const margin = { top: 10, bottom: 20, left: 50, right: 20 };
  const brushMargin = { top: 0, bottom: 20, left: 50, right: 20 };
  const xAxisHeight = 20;

  const formattedData = data.map(d => ({ ...d, date: parseDate(d.date) }));

  const dateAccessor = d => d.date;
  const signupsAccessor = d => d.signups;

  const signupsScale = scaleLinear({
    range: [height - margin.bottom - xAxisHeight, margin.top],
    domain: [0, max(formattedData, signupsAccessor)],
    nice: true,
  });

  const dateScale = scaleTime({
    range: [margin.left, xAxisLength - margin.right],
    domain: extent(formattedData, dateAccessor),
  });

  const [filteredData, setFilteredData] = useState(formattedData);

  // Brush logic
  const onBrushChange = (domain) => {
    if (!domain) return;
    const { x0, x1 } = domain;
    const filtered = formattedData.filter((d) => {
      const date = dateScale(dateAccessor(d));
      return date > x0 && date < x1;
    });
    setFilteredData(filtered);
  };

  return (
    <div>
      <svg width={xAxisLength} height={height}>
        <Group>
          <LinePath
            data={filteredData}
            x={d => dateScale(dateAccessor(d))}
            y={d => signupsScale(signupsAccessor(d))}
            stroke="#000"
            strokeWidth={1.5}
          />
          <AxisLeft scale={signupsScale} left={margin.left} />
          <AxisBottom
            scale={dateScale}
            top={height - margin.bottom - xAxisHeight}
            tickFormat={formatDate}
          />
        </Group>
        <Brush
          xScale={dateScale}
          yScale={signupsScale}
          width={xAxisLength - brushMargin.left - brushMargin.right}
          height={xAxisHeight}
          margin={brushMargin}
          handleSize={8}
          resizeTriggerAreas={['left', 'right']}
          brushDirection="horizontal"
          onChange={onBrushChange}
          onClick={() => setFilteredData(formattedData)}
        />
      </svg>
    </div>
  );
};

export default SignupBrushChart;
