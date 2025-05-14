import React from 'react';

const ProgressBar = ({ progress }:{progress:number}) => {
    if(progress > 100)
        throw new Error("Progress can't be more than 100%")
    if(progress <0)
        throw new Error("Progress can't be less than 0")
    
  const progressBarStyle = {
    width: '100%',
    backgroundColor: '#e5e7eb',
    borderRadius: '0.5rem',
    height: '8px',
    overflow: 'hidden',
  };

  const progressStyle = {
    height: '100%',
    background: 'linear-gradient(90deg, #4f46e5, #06b6d4)',
    borderRadius: '0.5rem',
    transition: 'width 0.4s ease',
    width: `${progress}%`,
  };

  return (
    <div style={progressBarStyle}>
      <div style={progressStyle}></div>
    </div>
  );
};

export default ProgressBar;
