import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortConst = new AbortController();

    setTimeout(() => {
      fetch(url, { signal: abortConst.signal })
        .then((res) => {
          if (res.ok) return res.json();
          else throw Error("Could not fetch data.");
        })
        .then((data) => {
          setData(data);
          setIsPending(false);
          setError(null);
        })
        .catch((err) => {
          if (err.name === "AbortError") {
            console.log("fetch aborted");
          } else setIsPending(false);
          setError(err.message);
        });
    }, 1000);

    return () => abortConst.abort();
  }, [url]);

  return { data, isPending, error };
};

export default useFetch;
