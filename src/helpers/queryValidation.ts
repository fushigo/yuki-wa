const queryValidation = (query?: string): boolean => {
  if (!query || query.length < 0) {
    return false;
  } else {
    return true;
  }
};

export default queryValidation;