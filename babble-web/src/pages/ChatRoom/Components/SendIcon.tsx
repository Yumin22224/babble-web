const SendIcon = ({
  width = "50px",
  height = "50px",
  color = { r: 0, g: 0, b: 0 },
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    version="1.1"
    width={width}
    height={height}
    viewBox="0 0 256 256"
    xmlSpace="preserve"
  >
    <defs></defs>
    <g
      style={{
        stroke: "none",
        strokeWidth: 0,
        strokeDasharray: "none",
        strokeLinecap: "butt",
        strokeLinejoin: "miter",
        strokeMiterlimit: 10,
        fill: "none",
        fillRule: "nonzero",
        opacity: 1,
      }}
      transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)"
    >
      <path
        d="M 90 45 c 0 24.813 -20.187 45 -45 45 C 20.187 90 0 69.813 0 45 C 0 20.187 20.187 0 45 0 C 69.813 0 90 20.187 90 45 z M 10 45 c 0 19.299 15.701 35 35 35 s 35 -15.701 35 -35 S 64.299 10 45 10 S 10 25.701 10 45 z"
        style={{
          stroke: "none",
          strokeWidth: 1,
          strokeDasharray: "none",
          strokeLinecap: "butt",
          strokeLinejoin: "miter",
          strokeMiterlimit: 10,
          fill: `rgb(${color.r},${color.g},${color.b})`,
          fillRule: "nonzero",
          opacity: 1,
        }}
        transform="matrix(1 0 0 1 0 0)"
      />
      <path
        d="M 49.926 27.223 v 35.555 c 0 2.761 -2.238 5 -5 5 s -5 -2.239 -5 -5 V 27.223 c 0 -2.762 2.239 -5 5 -5 S 49.926 24.461 49.926 27.223 z"
        style={{
          stroke: "none",
          strokeWidth: 1,
          strokeDasharray: "none",
          strokeLinecap: "butt",
          strokeLinejoin: "miter",
          strokeMiterlimit: 10,
          fill: `rgb(${color.r},${color.g},${color.b})`,
          fillRule: "nonzero",
          opacity: 1,
        }}
        transform="matrix(1 0 0 1 0 0)"
      />
      <path
        d="M 63.896 41.118 c 0 1.279 -0.488 2.559 -1.464 3.536 c -1.953 1.953 -5.119 1.953 -7.071 0 L 45 34.294 l -10.361 10.36 c -1.953 1.953 -5.119 1.953 -7.071 0 c -1.952 -1.953 -1.952 -5.119 0 -7.072 l 13.896 -13.896 c 1.953 -1.952 5.119 -1.952 7.071 0 l 13.896 13.896 C 63.408 38.559 63.896 39.839 63.896 41.118 z"
        style={{
          stroke: "none",
          strokeWidth: 1,
          strokeDasharray: "none",
          strokeLinecap: "butt",
          strokeLinejoin: "miter",
          strokeMiterlimit: 10,
          fill: `rgb(${color.r},${color.g},${color.b})`,
          fillRule: "nonzero",
          opacity: 1,
        }}
        transform="matrix(1 0 0 1 0 0)"
      />
    </g>
  </svg>
);

export default SendIcon;
