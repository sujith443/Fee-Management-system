import React from 'react';
import { Card as BootstrapCard } from 'react-bootstrap';
import PropTypes from 'prop-types';

const Card = ({ 
  title, 
  subtitle, 
  icon, 
  children, 
  footer, 
  className, 
  bodyClassName,
  headerClassName,
  footerClassName, 
  noPadding,
  shadow = 'sm',
  border = false,
  ...props 
}) => {
  // Generate shadow class based on prop
  const shadowClass = shadow ? `shadow-${shadow}` : '';
  
  // Generate border class based on prop
  const borderClass = !border ? 'border-0' : '';
  
  return (
    <BootstrapCard 
      className={`${shadowClass} ${borderClass} ${className || ''}`} 
      {...props}
    >
      {(title || subtitle || icon) && (
        <BootstrapCard.Header className={`bg-white py-3 ${headerClassName || ''}`}>
          <div className="d-flex align-items-center">
            {icon && (
              <div className="me-3">
                {icon}
              </div>
            )}
            <div>
              {title && (
                typeof title === 'string' 
                  ? <h5 className="mb-0 fw-bold">{title}</h5>
                  : title
              )}
              {subtitle && (
                typeof subtitle === 'string'
                  ? <div className="text-muted small">{subtitle}</div>
                  : subtitle
              )}
            </div>
          </div>
        </BootstrapCard.Header>
      )}
      
      <BootstrapCard.Body className={`${noPadding ? 'p-0' : ''} ${bodyClassName || ''}`}>
        {children}
      </BootstrapCard.Body>
      
      {footer && (
        <BootstrapCard.Footer className={`bg-white ${footerClassName || ''}`}>
          {footer}
        </BootstrapCard.Footer>
      )}
    </BootstrapCard>
  );
};

Card.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  subtitle: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  icon: PropTypes.element,
  children: PropTypes.node,
  footer: PropTypes.node,
  className: PropTypes.string,
  bodyClassName: PropTypes.string,
  headerClassName: PropTypes.string,
  footerClassName: PropTypes.string,
  noPadding: PropTypes.bool,
  shadow: PropTypes.oneOf(['sm', 'md', 'lg', null, false]),
  border: PropTypes.bool
};

export default Card;