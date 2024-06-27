import Tilt from 'react-parallax-tilt';

function SectionContent({ heading, content }) {
    return <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} className="section-content-container">
        <div className="section-content glass">
            <div className="section-content__heading">{heading}</div>
            <div className="section-content__content">{content}</div>
        </div>
    </Tilt>
}

export default SectionContent;