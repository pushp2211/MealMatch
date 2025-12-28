export const getVariantStyles = (variant) => {
  switch (variant) {
    case 'info':
      return 'border-info/30 bg-info-light';
    case 'warning':
      return 'border-warning/30 bg-warning-light';
    case 'success':
      return 'border-success/30 bg-success-light';
    case 'primary':
      return 'border-primary/30 bg-primary-light';
    default:
      return '';
  }
};

export const getIconStyles = (variant) => {
  switch (variant) {
    case 'info':
      return 'bg-info/10 text-info';
    case 'warning':
      return 'bg-warning/10 text-warning';
    case 'success':
      return 'bg-success/10 text-success';
    case 'primary':
      return 'bg-primary/10 text-primary';
    default:
      return '';
  }
};
