import { useParallax } from 'react-scroll-parallax';

function BallsBackground({ parallax }) {
    // const { ref } = useParallax({ speed: 10, translateY: [-100, 100] });

    return <div className="midground">
        <div className="balls" ref={null}>
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="blue-blue" x1="0%" y1="100%" x2="100%" y2="0%">
                        <stop offset="0%" style={{ stopColor: '#BCEEEB', stopOpacity: 1 }} />
                        <stop offset="100%" style={{ stopColor: '#5378D9', stopOpacity: 1 }} />
                    </linearGradient>
                    <linearGradient id="green-teal" x1="0%" y1="100%" x2="100%" y2="0%">
                        <stop offset="0%" style={{ stopColor: '#8FE74A', stopOpacity: 1 }} />
                        <stop offset="100%" style={{ stopColor: '#44E6B5', stopOpacity: 1 }} />
                    </linearGradient>
                    <linearGradient id="white-blue" x1="0%" y1="100%" x2="100%" y2="0%">
                        <stop offset="0%" style={{ stopColor: '#E1EEBC', stopOpacity: 1 }} />
                        <stop offset="100%" style={{ stopColor: '#BCD9EE', stopOpacity: 1 }} />
                    </linearGradient>
                </defs>
                <circle cx="10" cy="10" r="10" stroke="none" fill="url(#blue-blue)" />
                <circle cx="40" cy="30" r="6" stroke="none" fill="url(#green-teal)" />
                <circle cx="70" cy="0" r="8" stroke="none" fill="url(#white-blue)" />
                <circle cx="60" cy="60" r="10" stroke="none" fill="url(#blue-blue)" />
                <circle cx="10" cy="50" r="4" stroke="none" fill="url(#blue-blue)" />
                <circle cx="80" cy="20" r="6" stroke="none" fill="url(#green-teal)" />
            </svg>
        </div>
    </div>
}

export default BallsBackground;