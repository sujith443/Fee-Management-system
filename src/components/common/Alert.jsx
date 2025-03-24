import React, { useState, useEffect } from 'react';
import { Alert as BootstrapAlert } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faInfoCircle, 
  faCheckCircle, 
  faExclamationTriangle, 
  faExclamationCircle,
  faTimes
} from '@fortawesome/free-solid-svg-icons';

const Alert = ({ 
  variant, 
  icon, 
  title, 
  message, 
  dismissible, 
  autoDismiss,
  autoDismissTime = 5000,
  onClose,
  className,
  show: propShow,
  ...props 
}) => {
  const [show, setShow] = useState(propShow !== undefined ? propShow : true);
  
  useEffect(() => {
    if (propShow !== undefined) {
      setShow(propShow);
    }
  }, [propShow]);
  
  useEffect(() => {
    let timer;
    
    if (autoDismiss && show) {
      timer = setTimeout(() => {
        setShow(false);
        if (onClose) onClose();
      }, autoDismissTime);
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [autoDismiss, autoDismissTime, show, onClose]);
  
  const handleClose = () => {
    setShow(false);
    if (onClose) onClose();
  };
  
  if (!show) return null;
  
  // Determine icon based on variant if not provided
  const getIcon = () => {
    if (icon) return icon;
    
    switch (variant) {
      case 'success':
        return <FontAwesomeIcon icon={faCheckCircle} />;
      case 'warning':
        return <FontAwesomeIcon icon={faExclamationTriangle} />;
      case 'danger':
        return <FontAwesomeIcon icon={faExclamationCircle} />;
      default:
        return <FontAwesomeIcon icon={faInfoCircle} />;
    }
  };
  
  return (
    <BootstrapAlert 
      variant={variant}
      className={className}
      onClose={handleClose}
      dismissible={dismissible}
      {...props}
    >
      <div className="d-flex align-items-center">
        {(icon || variant) && (
          <div className="me-3">
            {getIcon()}
          </div>
        )}
        <div className="flex-grow-1">
          {title && <BootstrapAlert.Heading className="fs-5">{title}</BootstrapAlert.Heading>}
          {typeof message === 'string' ? <p className="mb-0">{message}</p> : message}
        </div>
        {dismissible && (
          <button 
            type="button" 
            className="btn-close ms-3" 
            aria-label="Close" 
            onClick={handleClose}
          />
        )}
      </div>
    </BootstrapAlert>
  );
};

Alert.propTypes = {
  variant: PropTypes.oneOf(['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark']),
  icon: PropTypes.element,
  title: PropTypes.string,
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  dismissible: PropTypes.bool,
  autoDismiss: PropTypes.bool,
  autoDismissTime: PropTypes.number,
  onClose: PropTypes.func,
  className: PropTypes.string,
  show: PropTypes.bool
};

Alert.defaultProps = {
  variant: 'info',
  dismissible: false,
  autoDismiss: false,
  autoDismissTime: 5000
};

export default Alert;