import React from 'react';
import { Group } from '@visx/group';
import { Pie } from '@visx/shape';
import { useTooltip, TooltipWithBounds, defaultStyles } from '@visx/tooltip';
import { localPoint } from '@visx/event';

const DonutChart = ({ data }) => {
  const width = 400;
  const height = 400;
  const radius = Math.min(width, height) / 2;
  const centerY = height / 2;
  const centerX = width / 2;
  const donutThickness = 50;

  const { tooltipData, tooltipTop, tooltipLeft, showTooltip, hideTooltip } = useTooltip();

  return (
    <div style={{ position: 'relative' }}>
      <svg width={width} height={height}>
        <Group top={centerY} left={centerX}>
          <Pie
            data={data}
            pieValue={data => data.value}
            outerRadius={radius}
            innerRadius={radius - donutThickness}
            cornerRadius={3}
            padAngle={0.005}
          >
            {pie => {
              return pie.arcs.map((arc, index) => {
                const [centroidX, centroidY] = pie.path.centroid(arc);

                return (
                  <g
                    key={`arc-${arc.data.label}-${index}`}
                    onMouseEnter={(event) => {
                      const point = localPoint(event) || { x: 0, y: 0 };
                      showTooltip({
                        tooltipData: arc.data,
                        tooltipTop: point.y,
                        tooltipLeft: point.x,
                      });
                    }}
                    onMouseLeave={hideTooltip}
                  >
                    <path d={pie.path(arc)} fill={arc.data.color}></path>
                    <text
                      x={centroidX}
                      y={centroidY}
                      dy=".33em"
                      fill="white"
                      fontSize={10}
                      textAnchor="middle"
                    >
                      {arc.data.label}
                    </text>
                  </g>
                );
              });
            }}
          </Pie>
        </Group>
      </svg>
      {tooltipData && (
        <TooltipWithBounds
          top={tooltipTop - 10}
          left={tooltipLeft}
          style={{
            ...defaultStyles,
            backgroundColor: 'rgba(0,0,0,0.9)',
            color: 'white',
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '14px',
            pointerEvents: 'none',
          }}
        >
          {tooltipData.value}
        </TooltipWithBounds>
      )}
    </div>
  );
};

export default DonutChart;
