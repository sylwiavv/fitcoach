import React from 'react';

interface SectionHeaderProps {
  title: string;
  description?: string;
  className?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, description, className }) => {
  return (
    <div className={`mb-4 ${className || ''}`}>
      <h2 className="text-lg font-semibold">{title}</h2>
      {description && <p className="text-md text-gray-600">{description}</p>}
    </div>
  );
};

export default SectionHeader;
