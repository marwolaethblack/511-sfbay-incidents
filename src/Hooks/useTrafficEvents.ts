import { useEffect, useState } from "react";
import { sfBayApi } from "../Api/sfBayApi";
import { ITrafficEvent } from "../Api/types";

export const useTrafficEvents = () => {
  const [trafficEvents, setTrafficEvents] = useState<ITrafficEvent[]>([]);
  const [error, setError] = useState<Error>();
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    try {
      setLoading(true);
      const res = await sfBayApi.getTrafficEvents();
      setError(undefined);
      setTrafficEvents(res);
    } catch (err) {
      setTrafficEvents([]);
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return { trafficEvents, error, loading, refetch: getData };
};
