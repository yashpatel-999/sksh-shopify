import {forwardRef} from 'react';

export const Button = forwardRef(function Button(
  {children, className = '', variant = 'primary', as = 'button', ...props},
  ref,
) {
  const styles = {
    primary: 'btn btn-primary',
    secondary: 'btn btn-secondary',
    ghost: 'btn btn-ghost',
  };

  const Component = as;

  return (
    <Component
      ref={ref}
      className={`${styles[variant]} ${className}`.trim()}
      {...props}
    >
      {children}
    </Component>
  );
});