import { useState, useEffect } from "react";


const useData = ({ api }: { api: string }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<Array<{ src: string; alt: string; id: string }>>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const handleData = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(api);
        const res1 = await res.json();
        setData(res1);
      } catch  {
        setError("Error");
      } finally {
        setIsLoading(false);
      }
    };
    handleData();
  }, [api]);

  return { data, error ,isLoading};
};

export default useData;
