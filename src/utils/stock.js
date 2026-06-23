const isOutOfStock = (variant) => {
  return !variant || variant.quantity <= 0;
};
