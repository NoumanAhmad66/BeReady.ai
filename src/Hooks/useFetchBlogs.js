import { useState, useEffect } from "react";


const useFetchBlogs = (apiUrl) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data?.data) {
          setBlogs(data.data);
          console.log("Fetched blogs:", data.data);

        } else {
          throw new Error("No blog data found");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [apiUrl]);

  return { blogs, loading, error };
};

export default useFetchBlogs;
