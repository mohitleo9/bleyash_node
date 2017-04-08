

const addError = (error) => ({
  type: 'ADD_ERROR',
  error
});

const clearErrors = () => ({
  type: 'CLEAR_ERRORS'
});

export {clearErrors, addError};
