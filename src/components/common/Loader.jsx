import React from 'react';
import { Spinner } from 'react-bootstrap';
import PropTypes from 'prop-types';

const Loader = ({ 
  size = 'md', 
  variant = 'primary', 
  type = 'border',
  fullScreen = false,
  overlay = false,
  text,
  textPosition = 'bottom',
  className,
  ...props 
}) => {
  // Determine spinner size
  const getSpinnerSize = () => {
    switch (size) {
      case 'xs':
        return { width: '1rem', height: '1rem' };
      case 'sm':
        return { width: '1.5rem', height: '1.5rem' };
      case 'lg':
        return { width: '3rem', height: '3rem' };
      case 'xl':
        return { width: '4rem', height: '4rem' };
      default:
        return { width: '2rem', height: '2rem' };
    }
  };
  
  const spinnerSize = getSpinnerSize();
  
  const spinner = (
    <Spinner
      animation={type}
      variant={variant}
      role="status"
      style={spinnerSize}
      {...props}
    />
  );
  
  // If text is provided, render spinner with text
  const spinnerWithText = text ? (
    <div className="d-flex flex-column align-items-center">
      {textPosition === 'top' && <div className="mb-3">{text}</div>}
      {spinner}
      {textPosition === 'bottom' && <div className="mt-3">{text}</div>}
    </div>
  ) : spinner;
  
  // For fullscreen loader
  if (fullScreen) {
    return (
      <div 
        className={`position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-white ${
          overlay ? 'bg-opacity-75' : ''
        } ${className || ''}`} 
        style={{ zIndex: 1050 }}
      >
        {spinnerWithText}
      </div>
    );
  }
  
  // For overlay loader
  if (overlay) {
    return (
      <div 
        className={`position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-white bg-opacity-75 ${className || ''}`}
        style={{ zIndex: 5 }}
      >
        {spinnerWithText}
      </div>
    );
  }
  
  // Default centered loader
  return (
    <div className={`d-flex justify-content-center ${className || ''}`}>
      {spinnerWithText}
    </div>
  );
};

Loader.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  variant: PropTypes.oneOf([
    'primary', 'secondary', 'success', 'danger', 
    'warning', 'info', 'light', 'dark'
  ]),
  type: PropTypes.oneOf(['border', 'grow']),
  fullScreen: PropTypes.bool,
  overlay: PropTypes.bool,
  text: PropTypes.string,
  textPosition: PropTypes.oneOf(['top', 'bottom']),
  className: PropTypes.string
};

export default Loader;