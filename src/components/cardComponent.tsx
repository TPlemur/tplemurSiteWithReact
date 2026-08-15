import { useState, type CSSProperties, type MouseEvent, type TouchEvent } from 'react';
import { Link } from 'react-router-dom';

interface CardProps {
  title: string;
  subtitle: string;
  to: string;
  image?: string;
}

const defaultCardColor = 'hsl(0, 0%, 9%)';

function CardComponent({ title, subtitle, to, image }: CardProps) {
  const [hover, setHover] = useState(false);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const [touching, setTouching] = useState(false);
  const [touchStartTime, setTouchStartTime] = useState(0);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);

  const handleMouseMove = (e: MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMouseX(x);
    setMouseY(y);
  };

  const handleMouseEnter = () => {
    setHover(true);
  };

  const handleMouseLeave = () => {
    setHover(false);
  };

  const handleTouchStart = (e: TouchEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    const touch = e.touches[0];
    if (!touch) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;

    setTouching(true);
    setTouchStartTime(Date.now());
    setStartX(touch.clientX);
    setStartY(touch.clientY);
    setMouseX(x);
    setMouseY(y);
    setHover(true);
  };

  const handleTouchMove = (e: TouchEvent<HTMLAnchorElement>) => {
    if (!touching) return;

    const touch = e.touches[0];
    if (!touch) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;

    setMouseX(x);
    setMouseY(y);
  };

  const handleTouchEnd = (e: TouchEvent<HTMLAnchorElement>) => {
    if (!touching) return;

    const touch = e.changedTouches[0];
    if (!touch) return;

    Date.now() - touchStartTime;
    Math.abs(startX - touch.clientX) > 10 || Math.abs(startY - touch.clientY) > 10;

    setTouching(false);
    setHover(false);
  };

  const cardStyle = {
    ['--card-color' as string]: defaultCardColor,
    ['--mouse-x' as string]: `${mouseX}px`,
    ['--mouse-y' as string]: `${mouseY}px`,
    transform: hover ? 'translateY(-10px)' : 'none',
    backgroundColor: defaultCardColor,
    backgroundImage: image
      ? `linear-gradient(rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.35)), url(${image})`
      : undefined,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    textDecoration: 'none',
    color: 'inherit',
  } as CSSProperties;

  return (
    <Link
      to={to}
      className="card"
      style={cardStyle}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="card-content">
        <div className="card-info-wrapper">
          <div className="card-info">
            <div className="card-info-title">
              <h3>{title}</h3>
              <h4>{subtitle}</h4>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default CardComponent;