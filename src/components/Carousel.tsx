import { useMemo, useState, type CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';
import './Carousel.css';

interface CarouselItem {
  title: string;
  subtitle: string;
  to: string;
  image: string;
  previewImage?: string;
}

interface CarouselProps {
  items: CarouselItem[];
}

interface CarouselCardView {
  id: string;
  item: CarouselItem;
  position: 'left' | 'center' | 'right' | 'hidden';
}

function Carousel({ items }: CarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isNext, setIsNext] = useState(false);
  const navigate = useNavigate();

  const visibleItems = useMemo<CarouselCardView[]>(() => {
    if (items.length === 0) return [];

    const leftIndex = (activeIndex - 1 + items.length) % items.length;
    const rightIndex = (activeIndex + 1) % items.length;
    const hiddenIndex = isAnimating
      ? isNext
        ? (activeIndex - 2 + items.length) % items.length
        : (activeIndex + 2) % items.length
      : rightIndex;

    return [
      {
        id: `left-${leftIndex}`,
        item: items[leftIndex],
        position: 'left',
      },
      {
        id: `center-${activeIndex}`,
        item: items[activeIndex],
        position: 'center',
      },
      {
        id: `right-${rightIndex}`,
        item: items[rightIndex],
        position: 'right',
      },
      {
        id: `hidden-${hiddenIndex}`,
        item: items[hiddenIndex],
        position: 'hidden',
      },
    ];
  }, [activeIndex, isAnimating, isNext, items]);

  const handleRotate = (next: boolean) => {
    if (isAnimating || items.length === 0) return;

    setIsAnimating(true);
    setIsNext(next);

    window.setTimeout(() => {
      setIsAnimating(false);
      if (next) {
        setActiveIndex((currentIndex) => (currentIndex - 1 + items.length) % items.length);
      } else {
        setActiveIndex((currentIndex) => (currentIndex + 1) % items.length);
      }
    }, 600);
  };


  return (
    <div className="carousel-shell">
      <div className="carousel-controls" aria-label="Carousel controls">
        <button type="button" onClick={() => handleRotate(false)} disabled={isAnimating}>
          ←
        </button>
        <button type="button" onClick={() => handleRotate(true)} disabled={isAnimating}>
          →
        </button>
      </div>

      <div className="carousel-track">
        {visibleItems.map(({ id, item, position }) => {
          const isCenter = position === 'center';
          const isHidden = position === 'hidden';
          const backgroundImage = isCenter
            ? `linear-gradient(rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.35)), url(${item.image})`
            : `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(${item.previewImage ?? item.image})`;

          const style: CSSProperties = {
            backgroundImage,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          };

          const handleCardClick = () => {
            if (isAnimating || isHidden) return;

            if (isCenter) {
              navigate(item.to);
              return;
            }

            if (position === 'left') {
                handleRotate(false); 
                return;
            }
            handleRotate(true);
          };

          const animationClass = isAnimating
            ? position === 'center'
              ? isNext
                ? 'carousel-card--animating-CR'
                : 'carousel-card--animating-CL'
              : position === 'left'
                ? isNext
                  ? 'carousel-card--animating-LC'
                  : 'carousel-card--animating-LR'
                : position === 'right'
                  ? isNext
                    ? 'carousel-card--animating-RL'
                    : 'carousel-card--animating-RC'
                  : isNext
                    ? 'carousel-card--animating-new-right'
                    : 'carousel-card--animating-new-left'
            : '';

          return (
            <button
              key={id}
              type="button"
              className={`carousel-card carousel-card--${position} ${animationClass}`.trim()}
              style={style}
              onClick={handleCardClick}
              aria-label={isCenter ? `Go to ${item.title}` : `Show ${item.title}`}
            >
              <div className="carousel-card__content">
                <h3>{item.title}</h3>
                <p>{item.subtitle}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Carousel;
