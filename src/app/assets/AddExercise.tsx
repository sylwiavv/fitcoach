import type { IconProps } from '.';

const AddExercise = ({ className, ...props }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={30}
    height={30}
    viewBox="0 0 24 24"
    className={className}
    {...props}
  >
    <path
      fill="currentColor"
      d="M11 8a1 1 0 1 1 2 0v3h3a1 1 0 1 1 0 2h-3v3a1 1 0 1 1-2 0v-3H8a1 1 0 1 1 0-2h3V8Z"
    />
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M23 4a3 3 0 0 0-3-3H4a3 3 0 0 0-3 3v16a3 3 0 0 0 3 3h16a3 3 0 0 0 3-3V4Zm-2 0a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V4Z"
      clipRule="evenodd"
    />
  </svg>
);

export default AddExercise;
