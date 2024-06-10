import { ReactNode, createContext, useContext } from "react";

export const PanelContext = createContext<any | undefined>(undefined);
export const UiMode = createContext<any | undefined>(undefined);

export function AppContext({panel, ui, children}: {panel?: any, ui?: any, children: ReactNode}) {
    return (
        <PanelContext.Provider value={{panel}}>
            <UiMode.Provider value={{ui}}>
                {children}
            </UiMode.Provider>
        </PanelContext.Provider>
    )
}

export function useAppContext(provider: React.Context<any | undefined>){
    const context = useContext(provider);

    if (context === undefined || context == null) {
        throw new Error(`Context ${provider} is not defined.`)
    }

    return context
}
