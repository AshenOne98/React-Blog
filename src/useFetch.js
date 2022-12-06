import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortCont = new AbortController();
    // npx json-server --watch data/db.json --port 8000
    setTimeout(() => {
      fetch(url, { signal: abortCont.signal })
        .then((res) => {
          //console.log(res);
          if (!res.ok) {
            throw Error("could not fetch the data for that resources");
          }
          return res.json();
        })
        .then((data) => {
          //console.log(data);
          setData(data);
          setIsPending(false);
          setError(null);
        })
        .catch((err) => {
          if (err.name === "AbortError") {
            console.log("fetch aborted");
          } else {
            //console.log(err.message);
            setError(err.message);
            setIsPending(false);
          }
        });
    }, 1000);
    console.log("use effect ran");
    return () => abortCont.abort();
  }, [url]);

  return { data, isPending, error };
};

export default useFetch;
