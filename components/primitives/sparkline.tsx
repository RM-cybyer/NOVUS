/** Single-series SVG sparkline. Decorative scale: the adjacent text
    carries the value; the line carries the shape. 2px stroke, no axes. */
export function Sparkline({
  points,
  width = 96,
  height = 28,
  className,
}: {
  points: number[];
  width?: number;
  height?: number;
  className?: string;
}) {
  if (points.length < 2) return null;
  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = max - min || 1;
  const pad = 2;
  const step = (width - pad * 2) / (points.length - 1);
  const d = points
    .map((v, i) => {
      const x = pad + i * step;
      const y = pad + (1 - (v - min) / range) * (height - pad * 2);
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
  const last = points[points.length - 1]!;
  const lastY = pad + (1 - (last - min) / range) * (height - pad * 2);
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      aria-hidden
      className={className}
    >
      <path d={d} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={width - pad} cy={lastY} r={3} fill="currentColor" />
    </svg>
  );
}
