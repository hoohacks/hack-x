import React from 'react';
import { BarGroup } from '@visx/shape';
import { Group } from '@visx/group';
import { AxisBottom, AxisLeft } from '@visx/axis';
import { scaleBand, scaleLinear, scaleOrdinal } from '@visx/scale';
import { useTooltip, TooltipWithBounds, defaultStyles } from '@visx/tooltip';
import { localPoint } from '@visx/event';

const height = 400;
const margin = { top: 20, bottom: 20, left: 50, right: 20 };

const BarChart = ({ data, xAxisLength }) => {
  const width = xAxisLength;
  // Define the scales
  const x0Scale = scaleBand({
    domain: data.map(d => d.name),
    padding: 0.2,
  });

  const x1Scale = scaleBand({
    domain: Object.keys(data[0]).filter(key => key !== 'name'),
    padding: 0.1,
  });

  const yScale = scaleLinear({
    domain: [0, Math.max(...data.map(d => Math.max(d.registered, d.checkedIn)))],
    nice: true,
  });

  const colorScale = scaleOrdinal({
    domain: Object.keys(data[0]).filter(key => key !== 'name'),
    range: ['#121A6A', '#B1CCFF'],
  });

  // Set the scale ranges
  x0Scale.rangeRound([0, width - margin.left - margin.right]);
  x1Scale.rangeRound([0, x0Scale.bandwidth()]);
  yScale.range([height - margin.top - margin.bottom, 0]);

  // Tooltip setup
  const {
    tooltipOpen,
    tooltipLeft,
    tooltipTop,
    tooltipData,
    showTooltip,
    hideTooltip,
  } = useTooltip();

  const handleMouseOver = (event, datum) => {
    const point = localPoint(event) || { x: 0, y: 0 };
    showTooltip({
      tooltipData: datum,
      tooltipTop: point.y,
      tooltipLeft: point.x,
    });
  };

  return (
    <div>
      <svg width={width} height={height}>
        <Group top={margin.top} left={margin.left}>
          <BarGroup
            data={data}
            keys={['registered', 'checkedIn']}
            height={yScale.range()[0]}
            x0={d => d.name}
            x0Scale={x0Scale}
            x1Scale={x1Scale}
            yScale={yScale}
            color={colorScale}
          >
            {barGroups =>
              barGroups.map(barGroup => (
                <Group key={`bar-group-${barGroup.index}-${barGroup.x0}`} left={barGroup.x0}>
                  {barGroup.bars.map(bar => (
                    <rect
                      key={`bar-group-bar-${barGroup.index}-${bar.key}-${bar.value}-${bar.index}`}
                      x={bar.x}
                      y={bar.y}
                      width={bar.width}
                      height={bar.height}
                      fill={bar.color}
                      rx={4}
                      onMouseLeave={hideTooltip}
                      onMouseMove={event => handleMouseOver(event, bar)}
                    />
                  ))}
                </Group>
              ))
            }
          </BarGroup>
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
            scale={x0Scale}
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
      {tooltipOpen && tooltipData && (
        <TooltipWithBounds
          top={tooltipTop}
          left={tooltipLeft}
          style={{
            ...defaultStyles,
            backgroundColor: 'rgba(0,0,0,0.9)',
            color: 'white',
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '14px',
            boxShadow: '2px 2px 10px rgba(0,0,0,0.5)',
          }}
        >
          {`${tooltipData.key}: ${tooltipData.value}`}
        </TooltipWithBounds>
      )}
    </div>
  );
};

export default BarChart;
