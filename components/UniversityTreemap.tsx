import React from 'react';
import { Treemap } from '@visx/hierarchy';
import { hierarchy } from 'd3-hierarchy';
import { scaleSequential } from 'd3-scale';
import { interpolateBlues } from 'd3-scale-chromatic';
import { useTooltip, TooltipWithBounds, defaultStyles } from '@visx/tooltip';
import { localPoint } from '@visx/event';

const UniversityTreemap = ({ data, xAxisLength }) => {
  const height = xAxisLength * 0.45;
  const root = hierarchy(data).sum(d => d.value);

  const maxValue = Math.max(...root.leaves().map(leaf => leaf.value));
  const colorScale = scaleSequential(interpolateBlues).domain([0, maxValue]);

  const {
    tooltipOpen,
    tooltipData,
    showTooltip,
    hideTooltip,
  } = useTooltip();

  const handleMouseOver = (event, node) => {
    const point = localPoint(event) || { x: 0, y: 0 };
    showTooltip({
      tooltipData: node.data,
      tooltipLeft: point.x,
      tooltipTop: point.y
    });
  };

  return (
    <div style={{ position: 'relative' }}>
      <svg width={xAxisLength} height={height}>
        <Treemap root={root} size={[xAxisLength, height]}>
          {treemapRoot =>
            treemapRoot.descendants().map((node, i) => (
              <rect
                key={`treemap-node-${i}`}
                x={node.x0}
                y={node.y0}
                width={node.x1 - node.x0}
                height={node.y1 - node.y0}
                fill={node.depth === 1 ? colorScale(node.value) : '#fff'}
                stroke="#fff"
                onMouseOver={(event) => handleMouseOver(event, node)}
                onMouseOut={hideTooltip}
              />
            ))
          }
        </Treemap>
      </svg>
      {tooltipOpen && tooltipData && (
        <TooltipWithBounds
          top={tooltipData.tooltipTop}
          left={tooltipData.tooltipLeft}
          style={{
            ...defaultStyles,
            backgroundColor: 'rgba(0,0,0,0.9)',
            color: 'white',
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '14px',
            boxShadow: '2px 2px 10px rgba(0,0,0,0.5)',
            pointerEvents: 'none',
          }}
        >
          {tooltipData.name} ({tooltipData.value})
        </TooltipWithBounds>
      )}
    </div>
  );
};

export default UniversityTreemap;
