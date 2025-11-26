import type { IconProps } from '.';

const UnCheckedIcon = ({ className, ...props }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    width={12}
    height={12}
    viewBox="0 0 342.947 342.947"
    {...props}
  >
    <path
      fill="#fff"
      d="M342.947 21.213 321.734 0 171.473 150.26 21.213 0 0 21.213l150.26 150.26L0 321.734l21.213 21.213 150.26-150.261 150.261 150.261 21.213-21.213-150.261-150.261z"
    />
  </svg>
);
export default UnCheckedIcon;
