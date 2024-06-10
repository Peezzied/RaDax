import { PanelContext, useAppContext } from "@/utils/Contexts";
import { IonGrid, IonRow, IonCol, IonButton } from "@ionic/react";
import { useEffect } from "react";



function ConversionDisplay() {
    const { operation, setOperation } = useAppContext(PanelContext)
    useEffect(() => {
        setOperation('buy')
    }, [])
    const parsedOperation = () => {
        switch (operation) {
            case 'buy':
                return 'Buy'
            case 'sell':
                return 'Sell'
            case 'unknown':
                return 'Choose an operation'
        }
    }
    const color = () => {
        switch (operation) {
            case 'buy':
                return 'bg-[#F6FEF6]'
            case 'sell':
                return 'bg-[#FEF6F9]'
            case 'unknown':
                return 'bg-[#F9F9F9]'
        }
    }
    const panelColor = color()
    const operationText = parsedOperation();
    return (
        <IonCol className={`rounded-[40px] ${panelColor}`}>
            <IonRow>
                <IonCol className={`bg-[#79D862] bg-opacity-50 rounded-full text-center`}>{operationText}</IonCol>
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