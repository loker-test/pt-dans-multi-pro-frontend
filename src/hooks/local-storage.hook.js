import {useState} from "react";

export const useLocalStorage = (keyName, dataValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const value = window.localStorage.getItem(keyName)

      if (value) {
        return value
      } else {
        window.localStorage.setItem(keyName, dataValue)
        return dataValue
      }
    } catch (err) {
      console.log(err)
      return dataValue
    }
  })

  const setValue = (newValue) => {
    try {
      window.localStorage.setItem((keyName), newValue)
    } catch (err) {
      setStoredValue(newValue)
    }
  }

  return [storedValue, setValue]
}
