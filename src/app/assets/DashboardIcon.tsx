import type { IconProps } from '.';

const DashboardIcon = ({ className, ...props }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 24 24" {...props}>
    <g fill="none" fillRule="evenodd">
      <path d="M0 0h24v24H0z" />
      <rect
        width={16}
        height={16}
        x={4}
        y={4}
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth={2}
        rx={2}
      />
      <path stroke="currentColor" strokeLinecap="round" strokeWidth={2} d="M4 9h16M9 10v10" />
    </g>
  </svg>
);

export default DashboardIcon;
