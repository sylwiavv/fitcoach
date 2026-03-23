'use client';

import { useRouter } from 'next/navigation';

import { BackIcon } from '../../shell/assets/icons';

export const BackButton = () => {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.back()}
      className="
        group flex items-center gap-1 justify-between 
        px-4 py-2 bg-light-violet rounded 
        hover:bg-light-violet2 hover:cursor-pointer 
        mb-12 uppercase text-xs font-extrabold
      "
    >
      <span
        className="
          inline-block 
          transition-transform duration-300 ease-in-out
          group-hover:-translate-x-1 group-hover:animate-pulse
        "
      >
        <BackIcon />
      </span>
      Back
    </button>
  );
};
