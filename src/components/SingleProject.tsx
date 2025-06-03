import { useTranslation } from "react-i18next";
import "./SingleProject.css";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { useState, useEffect, useRef } from "react";

type LinkType = { type: "url"; value: string } | { type: "qr"; value: string };

type PhotosProps = {
  photos: string[];
  role?: string;
  description: string;
  callToAction: string;
  linkToProject: LinkType;
  techstack?: string;
};

const SingleProject = ({
  photos,
  role,
  description,
  callToAction,
  linkToProject,
  techstack,
}: PhotosProps) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const slideRef = useRef<HTMLDivElement>(null);

  const resetAutoSlide = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % photos.length);
    }, 5000);
  };

  useEffect(() => {
    resetAutoSlide();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [photos.length]);

  const handleManualScroll = (direction: "next" | "prev") => {
    setCurrentSlide((prev) =>
      direction === "next"
        ? (prev + 1) % photos.length
        : (prev - 1 + photos.length) % photos.length
    );
    resetAutoSlide();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (
      touchStartX.current !== null &&
      touchEndX.current !== null &&
      Math.abs(touchStartX.current - touchEndX.current) > 50
    ) {
      const direction =
        touchStartX.current > touchEndX.current ? "next" : "prev";
      handleManualScroll(direction);
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <div className="project-container">
      <div className="photos-container">
        <div
          className="carousel-wrapper"
          onClick={() => {
            setIndex(currentSlide);
            setOpen(true);
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="carousel-track"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            ref={slideRef}
          >
            {photos.map((photo, idx) => (
              <img
                key={idx}
                src={photo}
                alt={`Slide ${idx + 1}`}
                className="carousel-image"
              />
            ))}
          </div>
          <div className="carousel-controls">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleManualScroll("prev");
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
              >
                <path d="M15 6l-6 6 6 6" />
              </svg>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleManualScroll("next");
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="text-container">
        {role && (
          <h1 className="role">
            {t("role")}: {role}
          </h1>
        )}
        <div className="description">{description}</div>
        {techstack && (
          <h1 className="description">
            {t("techstack")}: {techstack}
          </h1>
        )}
        {linkToProject.type === "url" ? (
          <a
            href={linkToProject.value}
            target="_blank"
            rel="noopener noreferrer"
            className="link"
          >
            {t("check_it_out")}
          </a>
        ) : (
          <img src={linkToProject.value} alt="QR Code" className="qr-code" />
        )}
        <div className="description">{callToAction}</div>
      </div>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={photos.map((p) => ({ src: p }))}
        on={{ click: () => setOpen(false) }}
        styles={{
          container: {
            backgroundColor: "rgba(0, 0, 0, 0.85)",
            padding: "40px",
          },
        }}
      />
    </div>
  );
};

export default SingleProject;
