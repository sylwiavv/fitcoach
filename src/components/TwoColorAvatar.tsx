import React from 'react';

interface TwoColorAvatarProps {
  avatar: string;
  size?: number;
  color1?: string;
  color2?: string;
  strokeWidth?: number;
  gapPx?: number;
}

const TwoColorAvatar: React.FC<TwoColorAvatarProps> = ({
  avatar,
  size = 80,
  color1 = '#ae93f7',
  color2 = '#fffeff',
  strokeWidth = 8,
  gapPx = 4,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const gapPercent = gapPx / circumference;
  const percentage1 = 0.5 - gapPercent * 2;
  const dashArray1 = circumference * percentage1;
  const dashArray2 = circumference - dashArray1;

  const innerSize = size - strokeWidth;

  return (
    <div
      style={{
        width: size,
        height: size,
        position: 'relative',
      }}
    >
      <svg width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color2}
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color1}
          strokeWidth={strokeWidth}
          strokeDasharray={`${dashArray1} ${dashArray2}`}
          strokeLinecap="round"
          strokeLinejoin="round"
          transform={`rotate(90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <img
        src={avatar}
        alt="avatar"
        style={{
          width: innerSize - 7,
          height: innerSize - 7,
          borderRadius: '50%',
          position: 'absolute',
          top: (size - innerSize + 8) / 2,
          left: (size - innerSize + 8) / 2,
          objectFit: 'cover',
          border: `5px solid ${color2}`,
        }}
      />
    </div>
  );
};

export default TwoColorAvatar;
