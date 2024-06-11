import { PanelContext, useAppContext } from "@/utils/Contexts";
import { IonGrid, IonRow, IonCol, IonButton } from "@ionic/react";
import { useEffect } from "react";

const getPanelMeta = (operation: any) => {
    switch (operation) {
        case 'buy':
            return {
                display: 'Buy',
                bg: 'bg-[#F6FEF6]',
                primary: 'bg-[#79D862]',
                text: 'text-[#389522]',
            };
        case 'sell':
            return {
                display: 'Sell',
                bg: 'bg-[#FEF6F9]',
                primary: 'bg-[#D86287]',
                text: 'text-[#B72C58]',
            };
        case 'unknown':
        default:
            return {
                display: 'Choose an operation',
                bg: 'bg-[#F9F9F9]',
                primary: 'bg-[#B9BDB8]',
                text: 'text-[#858383]',
            };
    }
};

function ConversionDisplay() {
    const { operation, setOperation } = useAppContext(PanelContext)
    const panelMeta = getPanelMeta(operation);

    return (
        <IonCol className={`rounded-[40px] ${panelMeta.bg}`}>
            <IonRow>
                <IonCol className={`${panelMeta.primary} ${panelMeta.text} bg-opacity-50 rounded-full text-center`}>{panelMeta.display}</IonCol>
            </IonRow>
            <IonRow>
                <IonCol>
                    <div className="flex flex-row gap-3 font-mono font-bold text-6xl">
                        <span className="font-normal">₱</span>
                        <span>0.00</span>
                    </div>
                </IonCol>
            </IonRow>
            <IonRow>
                <IonCol>
                    <div className="flex flex-row gap-3 font-mono font-medium">
                        <span className="space-x-1">
                            <span>BTC</span><span>0.00000000</span>
                        </span>
                        <span></span>
                    </div>
                </IonCol>
            </IonRow>
        </IonCol>
    )
}
function BuySellBtn() {
    return (
        <>
            <IonCol>
                <IonButton></IonButton>
            </IonCol>
            <IonCol>
                <IonButton></IonButton>
            </IonCol>
        </>
    )
}
function CalculateBtn() {
    return (
        <>
            <IonCol>
                <IonButton></IonButton>
            </IonCol>
            <IonCol>
                <IonButton></IonButton>
            </IonCol>
        </>
    )
}
export function CalculatePanel() {
    return (
        <div>
            <div className="bg-white w-full rounded-[8px]">
                <IonGrid>
                    <IonRow>
                        <ConversionDisplay />
                    </IonRow>
                    <IonRow>
                        <IonRow>
                            <BuySellBtn />
                        </IonRow>
                        <IonRow>
                            <CalculateBtn />
                        </IonRow>
                    </IonRow>
                </IonGrid>
            </div>
        </div>
    )
}