const { useState } = require("react");

export function useLocalStorage(key, initialValue = "") {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueStore);
      return window.localStorage.setItem(key, JSON.stringify(valueStore));
    } catch (error) {
      console.log(error);
    }
  };

  const clearValue = (key) => {
    window.localStorage.removeItem(key);
  };

  return { storedValue, setValue, clearValue };
}
