import React, { createContext, ReactNode, useContext, useState } from 'react';

type SnackbarVariant = 'success' | 'error' | 'info' | 'warning';

interface SnackbarOptions {
  message: string;
  variant?: SnackbarVariant;
  duration?: number; // ms
}

interface SnackbarContextType {
  enqueueSnackbar: (message: string, options?: Omit<SnackbarOptions, 'message'>) => void;
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined);

interface SnackbarProviderProps {
  children: ReactNode;
}

interface SnackbarItem extends SnackbarOptions {
  id: number;
  leaving?: boolean;
}

export const SnackbarProvider: React.FC<SnackbarProviderProps> = ({ children }) => {
  const [snackbars, setSnackbars] = useState<SnackbarItem[]>([]);

  const enqueueSnackbar = (message: string, options?: Omit<SnackbarOptions, 'message'>) => {
    const id = Date.now();
    setSnackbars((prev) => [...prev, { id, message, variant: options?.variant || 'info' }]);

    setTimeout(() => removeSnackbar(id), options?.duration || 3000);
  };

  const removeSnackbar = (id: number) => {
    setSnackbars((prev) => prev.map((s) => (s.id === id ? { ...s, leaving: true } : s)));

    setTimeout(() => {
      setSnackbars((prev) => prev.filter((s) => s.id !== id));
    }, 300);
  };

  const getBgColor = (variant: SnackbarVariant) => {
    switch (variant) {
      case 'success':
        return '[#c7e51e]';
      case 'error':
        return '[#fe5353]';
      case 'info':
        return 'bg-[#00bfff] text-white';
      case 'warning':
        return 'bg-[#ffb700] text-black';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getBorderColor = (variant: SnackbarVariant) => {
    switch (variant) {
      case 'success':
        return 'border-[#c7e51e]';
      case 'error':
        return 'border-[#fe5353]';
      case 'info':
        return 'border-[#00bfff] text-white';
      case 'warning':
        return 'border-[#ffb700] text-black';
      default:
        return 'border-gray-500 text-white';
    }
  };

  return (
    <SnackbarContext.Provider value={{ enqueueSnackbar }}>
      {children}

      <div className="fixed bottom-5 right-5 flex flex-col gap-2 z-50">
        {snackbars.map(({ id, message, variant, leaving }) => (
          <div
            key={id}
            className={`
              px-4 py-2 rounded shadow transform transition-all duration-700 ease-in-out
              ${leaving ? 'opacity-0 -right-full' : 'opacity-100 right-5'}
              fixed bottom-5
              ${getBorderColor(variant!)} border-l-8
            `}
          >
            <p className={`font-extrabold text-md text-${getBgColor(variant!)}`}>{variant}</p>
            {message}
          </div>
        ))}
      </div>
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) throw new Error('useSnackbar must be used within a SnackbarProvider');
  return context;
};
