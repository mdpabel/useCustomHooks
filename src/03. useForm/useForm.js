const { useState, useCallback, useDebugValue } = require("react");

function useForm(initialValues) {
  const [values, setValues] = useState(initialValues);

  useDebugValue(`state of useForm`);

  const onChange = (e) => {
    setValues((prevValue) => ({
      ...prevValue,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = useCallback(
    (e, cb) => {
      e.preventDefault();
      setValues(initialValues);
      return cb ? cb() : null;
    },
    [initialValues]
  );

  return { values, onChange, onSubmit };
}

export { useForm };
