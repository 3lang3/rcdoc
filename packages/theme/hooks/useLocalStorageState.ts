import { createUseStorageState } from '../utils/createUseStorageState';

const useLocalStorageState = createUseStorageState(() => localStorage);

export default useLocalStorageState;