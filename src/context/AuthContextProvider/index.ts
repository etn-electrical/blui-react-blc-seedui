import { useContext } from 'react';
import { AuthUIContext } from './context';
import { AuthUIContextProvider } from './component';
import { AuthUIContextProviderProps } from './types';

export const useInjectedUIContext = (): AuthUIContextProviderProps => {
    const context = useContext(AuthUIContext);
    if (context === null) {
        throw new Error('useInjectedUIContext must be used within an AuthUIContextProvider');
    }
    return context;
};

export { AuthUIContextProvider };
