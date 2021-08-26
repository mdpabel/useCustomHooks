js;
import { useCallback, useLayoutEffect, useReducer, useRef } from "react";

function useSafeDispatch(unsafeDispatch) {
  const mountedRef = useRef(false);

  useLayoutEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  return useCallback(
    (...args) => {
      if (mountedRef.current) {
        return unsafeDispatch(...args);
      }
    },
    [unsafeDispatch]
  );
}

function reducer(state, action) {
  switch (action.type) {
    case "pending":
      return {
        ...state,
        status: "pending",
      };

    case "resolved":
      return {
        ...state,
        status: "resolved",
        data: action.data,
      };

    case "rejected":
      return {
        ...state,
        status: "rejected",
        error: action.error,
      };

    default:
      break;
  }
}

function useAsync(initialState) {
  const [state, unsafeDispatch] = useReducer(reducer, {
    data: null,
    status: "idle",
    error: null,
    ...initialState,
  });

  const dispatch = useSafeDispatch(unsafeDispatch);

  const run = useCallback(
    (promise) => {
      if (!promise) {
        throw new Error(`the callback function should be a promise`);
      }
      dispatch({
        type: "pending",
      });

      promise.then(
        (data) => dispatch({ type: "resolved", data }),
        (error) => dispatch({ type: "rejected", error })
      );
    },
    [dispatch]
  );

  const { data, status, error } = state;
  return { run, data, status, error };
}

export { useAsync };
