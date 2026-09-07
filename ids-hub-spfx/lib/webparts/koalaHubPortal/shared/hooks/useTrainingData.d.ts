import { Training } from '../types';
interface UseTrainingDataState {
    data: Training[];
    loading: boolean;
    error: Error | null;
}
export declare const useTrainingData: () => UseTrainingDataState;
export default useTrainingData;
