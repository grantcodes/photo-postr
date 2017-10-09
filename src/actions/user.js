export const setUserOption = (property, value) => {
  if (value === false) {
    localStorage.removeItem(property);
  } else {
    localStorage.setItem(property, value);
  }
  return {
    type: 'SET_USER_OPTION',
    property: property,
    value: value,
  };
}