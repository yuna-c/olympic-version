export const getLocalCountries = () => {
  const saved = localStorage.getItem('countries');
  try {
    return saved && saved !== 'undefined' ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

export const setLocalCountries = (countries) => {
  localStorage.setItem('countries', JSON.stringify(countries));
};
