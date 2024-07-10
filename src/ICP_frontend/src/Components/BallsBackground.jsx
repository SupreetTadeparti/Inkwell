import { useParallax } from "react-scroll-parallax";

function BallsBackground({ parallax }) {
  const { ref } = useParallax({ speed: 15 });

  return (
    <div className="midground">
      <div className="balls" ref={ref}>
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="blue-blue" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop
                offset="0%"
                style={{ stopColor: "#BCEEEB", stopOpacity: 1 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: "#5378D9", stopOpacity: 1 }}
              />
            </linearGradient>
            <linearGradient id="green-teal" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop
                offset="0%"
                style={{ stopColor: "#8FE74A", stopOpacity: 1 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: "#44E6B5", stopOpacity: 1 }}
              />
            </linearGradient>
            <linearGradient id="white-blue" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop
                offset="0%"
                style={{ stopColor: "#E1EEBC", stopOpacity: 1 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: "#BCD9EE", stopOpacity: 1 }}
              />
            </linearGradient>
          </defs>
          <circle cx="10" cy="10" r="10" stroke="none" fill="url(#blue-blue)" />
          <circle cx="40" cy="40" r="6" stroke="none" fill="url(#green-teal)" />
          <circle cx="65" cy="0" r="8" stroke="none" fill="url(#white-blue)" />
          <circle cx="75" cy="60" r="10" stroke="none" fill="url(#blue-blue)" />
          <circle cx="15" cy="50" r="4" stroke="none" fill="url(#blue-blue)" />
          <circle cx="90" cy="20" r="6" stroke="none" fill="url(#green-teal)" />
        </svg>
      </div>
    </div>
  );
}

export default BallsBackground;
