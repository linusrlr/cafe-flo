interface WaveDividerProps {
  fill?: string;
  bg?: string;
  flip?: boolean;
}

export function WaveDivider({
  fill = "#fdf8f5",
  bg = "transparent",
  flip = false,
}: WaveDividerProps) {
  return (
    <div
      className="wave-divider"
      style={{
        backgroundColor: bg,
        transform: flip ? "rotate(180deg)" : undefined,
      }}
    >
      <svg viewBox="0 0 1440 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,50 1440,40 L1440,80 L0,80 Z"
          fill={fill}
        />
      </svg>
    </div>
  );
}
