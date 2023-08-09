import React from "react";

interface Props extends React.SVGProps<SVGSVGElement> {}

export const LogoVector = ({ color, ...rest }: Props) => {
  return (
    <svg
      width="672"
      height="616"
      viewBox="0 0 672 616"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M112 280L336 504L560 280H504L336 112L168 280H112ZM0 280H56L336 0L616 280H672L336 616L0 280Z"
        className={rest.className}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M224 280H280L336 224L392 280H448L336 392L224 280Z"
        className={rest.className}
      />
    </svg>
  );
};

export const RectangularLarge = ({ ...rest }: Props) => {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={rest.className}
    >
      <rect
        y="17.458"
        width="25"
        height="25"
        transform="rotate(-44.2924 0 17.458)"
        fill="#8F00FF"
        fillOpacity="0.5"
        className={rest.className}
      />
    </svg>
  );
};

export const RectangularSmall = ({ ...rest }: Props) => {
  return (
    <svg
      width="22"
      height="23"
      viewBox="0 0 22 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={rest.className}
    >
      <rect
        y="11.458"
        width="15"
        height="15"
        transform="rotate(-44.2924 0 11.458)"
        fill="#8F00FF"
        fillOpacity="0.5"
        className={rest.className}
      />
    </svg>
  );
};

export const Circle = ({ ...rest }: Props) => {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={rest.className}
    >
      <circle
        cx="7.5"
        cy="7.5"
        r="7.5"
        fill="#FF0000"
        fillOpacity="0.5"
        className={rest.className}
      />
    </svg>
  );
};

export const Triangle = ({ ...rest }: Props) => {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={rest.className}
    >
      <path
        d="M7.5 0L15 15H0L7.5 0Z"
        fill="#00A3FF"
        fillOpacity="0.5"
        className={rest.className}
      />
    </svg>
  );
};
