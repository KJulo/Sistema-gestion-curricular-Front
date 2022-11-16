import { useState, useEffect } from "react";
import axios from "axios";

export const useAxios = (body) => {
  const [response, setResponse] = useState()
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);

  const fetchData = async (body) => {
    try {
      const result = await axios.post("/api/usuario/changePassword",body);
      setResponse(result.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(body);
  }, []); // execute once only

  return { response, error, loading };
};
