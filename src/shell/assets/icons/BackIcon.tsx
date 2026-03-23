import type { IconProps } from '.';

const BackIcon = ({ className, ...props }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    width={props.width || 10}
    height={props.height || 10}
    viewBox="0 0 96.154 96.154"
    {...props}
  >
    <path d="M75.183.561 17.578 46.513c-.951.76-.951 2.367 0 3.126l57.608 45.955c.689.547 1.717.709 2.61.414a2.67 2.67 0 0 0 .436-.186 2.004 2.004 0 0 0 1.057-1.765V2.093c0-.736-.405-1.414-1.057-1.762a2.581 2.581 0 0 0-.426-.184c-.903-.297-1.932-.136-2.623.414z" />
  </svg>
);
export default BackIcon;
