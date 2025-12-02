import type { ReactNode } from 'react';

export default function PrimaryButton({
  children,
  icon: Icon,
  ...props
}: {
  children: React.ReactNode;
  icon?: ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className="flex items-center gap-2 bg-dark-violet text-white px-4 py-2 rounded-lg hover:bg-dark-violet2 transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer"
    >
      {Icon && <span>{Icon}</span>}
      {children}
    </button>
  );
}
