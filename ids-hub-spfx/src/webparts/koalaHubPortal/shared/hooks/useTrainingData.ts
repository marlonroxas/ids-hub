// Custom hook for fetching training data with loading and error states

import { useState, useEffect } from 'react';
import { Training } from '../types';
import MockDataService from '../services/mock.service';

interface UseTrainingDataState {
  data: Training[];
  loading: boolean;
  error: Error | null;
}

export const useTrainingData = (): UseTrainingDataState => {
  const [data, setData] = useState<Training[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const trainingData = await MockDataService.getTrainingData();
        setData(trainingData);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch training data'));
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};

export default useTrainingData;
