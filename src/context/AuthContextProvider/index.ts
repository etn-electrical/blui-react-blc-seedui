import { useContext } from 'react';
import { AuthUIContext } from './context';
import { AuthUIContextProvider } from './component';


export const useInjectedUIContext = () => {
    const context = useContext(AuthUIContext);
    if(context === null) {
        throw new Error('useInjectedUIContext must be used within an AuthUIContextProvider');
    }
    return context;
}

export { AuthUIContextProvider }
