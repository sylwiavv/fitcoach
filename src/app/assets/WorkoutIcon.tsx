import type { IconProps } from '.';

const WorkoutIcon = ({ className, ...props }: IconProps) => (
  <svg
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    id="Layer_1"
    width={30}
    height={30}
    data-name="Layer 1"
    viewBox="0 0 24 24"
    className={className}
    {...props}
  >
    <defs>
      <style>{'.cls-1{fill:none;stroke:#020202;stroke-miterlimit:10;stroke-width:1.91px}'}</style>
    </defs>
    <path
      d="M1.48 3.37h21.04v4.78H1.48zM1.48 8.15h21.04V22.5H1.48zM3.39 14.85H5.3M5.3 11.98v5.74M18.7 11.98v5.74M15.83 11.02v7.65M8.17 11.02v7.65M8.17 14.85h7.66M18.7 14.85h1.91M12 .5v4.78M6.26.5v4.78M17.74.5v4.78"
      className="cls-1"
    />
  </svg>
);
export default WorkoutIcon;
