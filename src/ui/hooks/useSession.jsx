export const Session = {
  // Save data to sessionStorage
  start: (key, value) => sessionStorage.setItem(key, value),
  // Get saved data from sessionStorage
  getItem: (key) => sessionStorage.getItem(key),
  // Remove saved data from sessionStorage
  removeItem: (key) => sessionStorage.removeItem(key),
  // Remove all saved data from sessionStorage
  end: () => sessionStorage.clear(),
};
