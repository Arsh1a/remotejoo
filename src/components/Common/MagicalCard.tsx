import React, { useEffect, useRef } from "react";

interface Props {
  children: React.ReactNode;
  hoverEffect?: boolean;
  className?: string;
}

const MagicalCard = ({ children, className, hoverEffect }: Props) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!hoverEffect) return;
    const card = cardRef.current;
    if (card) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`relative rounded-secondary magical-card${
        hoverEffect ? "" : " before:hidden"
      }${className ? ` ${className}` : ""}`}
    >
      <div
        className={`bg-white rounded-secondary p-4 sm:p-6${
          className ? ` ${className}` : ""
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default MagicalCard;
