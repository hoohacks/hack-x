import React from 'react';
import { Bar } from '@visx/shape';
import { Group } from '@visx/group';
import { AxisBottom, AxisLeft } from '@visx/axis';
import { scaleBand, scaleLinear } from '@visx/scale';
import { Text } from '@visx/text';

const height = 400;
const margin = { top: 20, bottom: 20, left: 50, right: 20 };

const SingleBarChart = ({ data, xAxisLength }) => {

  const width = xAxisLength;


  const xScale = scaleBand({
    domain: data.map(d => d.category),
    padding: 0.2,
  });

  const yScale = scaleLinear({
    domain: [0, Math.max(...data.map(d => d.value))],
    nice: true,
  });

  // Set the scale ranges
  xScale.rangeRound([0, width - margin.left - margin.right]);
  yScale.range([height - margin.top - margin.bottom, 0]);

  return (
    <div>
      <svg width={width} height={height}>
        <Group top={margin.top} left={margin.left}>
          {data.map((d, i) => {
            const barHeight = height - margin.bottom - margin.top - yScale(d.value);
            return (
              <React.Fragment key={`bar-${i}`}>
                <Bar
                  x={xScale(d.category)}
                  y={yScale(d.value)}
                  height={barHeight}
                  width={xScale.bandwidth()}
                  fill="#121A6A"
                />
                <Text
                  x={xScale(d.category) + xScale.bandwidth() / 2}
                  y={yScale(d.value) - 5}
                  textAnchor="middle"
                  verticalAnchor="end"
                  fill="#121A6A"
                  fontSize={12}
                  fontWeight="bold"
                >
                  {d.value}
                </Text>
              </React.Fragment>
            );
          })}
          <AxisLeft
            scale={yScale}
            stroke="#121A6A"
            tickStroke="#121A6A"
            tickLabelProps={() => ({
              fill: '#121A6A',
              fontSize: 11,
              textAnchor: 'end',
              dy: '0.33em',
            })}
          />
          <AxisBottom
            top={yScale.range()[0]}
            scale={xScale}
            stroke="#121A6A"
            tickStroke="#121A6A"
            tickLabelProps={() => ({
              fill: '#121A6A',
              fontSize: 11,
              textAnchor: 'middle',
            })}
          />
        </Group>
      </svg>
    </div>
  );
};

export default SingleBarChart;
