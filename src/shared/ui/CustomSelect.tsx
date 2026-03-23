'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';

interface CustomSelectProps {
  value: string | number;
  onChange: (value: string | number) => void;
  options: { value: string | number; label: string }[];
  placeholder?: string;
}

const CustomSelect = ({ value, onChange, options, placeholder }: CustomSelectProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const replaceQuery = useCallback(
    (mutate: (p: URLSearchParams) => void) => {
      const params = new URLSearchParams(searchParams.toString());
      mutate(params);
      const qs = params.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [router, pathname, searchParams],
  );

  useEffect(() => {
    const paramOpen = searchParams.get('open');
    if (paramOpen === 'true') setOpen(true);
  }, [searchParams]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
        replaceQuery((p) => p.delete('open'));
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [replaceQuery]);

  const selected = options.find((opt) => opt.value === value);

  const handleToggle = () => {
    const newOpen = !open;
    setOpen(newOpen);
    replaceQuery((p) => {
      if (newOpen) p.set('open', 'true');
      else p.delete('open');
    });
  };

  const handleOnClick = (opt: { value: string | number; label: string }) => {
    onChange(opt.value);
    setOpen(false);
    replaceQuery((p) => p.delete('open'));
  };

  return (
    <div className="relative w-full" ref={ref}>
      <button
        type="button"
        onClick={handleToggle}
        className="
          w-full bg-white border-2 border-dark-violet rounded-md py-2 px-3 text-left
          flex justify-between items-center
          transition-all duration-200 ease-in-out
          hover:border-dark-violet1 hover:cursor-pointer
          focus:outline-none focus:ring-dark-violet2
        "
      >
        <span>{selected?.label || placeholder || 'Select...'}</span>
        <svg
          className={`w-5 h-5 transition-transform duration-200 ease-in-out ${open ? 'rotate-180' : 'rotate-0'}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <div
        className={`
          absolute z-10 mt-1 w-full bg-white border border-dark-violet rounded-md
          shadow-lg shadow-gray-300/40 max-h-60 overflow-auto
          transition-all duration-200 ease-in-out transform origin-top
          ${open ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}
        `}
      >
        {options.map((opt) => (
          <div
            key={opt.value}
            onClick={() => handleOnClick(opt)}
            className={`
              cursor-pointer px-3 py-2 transition-colors duration-150 ease-in-out
              hover:bg-light-violet2
              ${value === opt.value ? 'bg-light-violet2 font-semibold' : ''}
            `}
          >
            {opt.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomSelect;
