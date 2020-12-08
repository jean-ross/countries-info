const formatValue = (value) =>
  Intl.NumberFormat('en-US', {
    style: 'decimal',
  }).format(value);

export default formatValue;
