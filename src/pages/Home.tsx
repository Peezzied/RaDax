import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonIcon,
  IonButton,
} from "@ionic/react";
import {
  ellipsisHorizontal,
  ellipsisVertical,
} from "ionicons/icons";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import './Home.css'
import CryptoBox from "@/components/CryptoBox";
import { CalculatePanel } from "@/components/CalculatePanel";
import { KeyPad } from "@/components/KeyPad";
import { AppContext, PanelContext } from "@/utils/Contexts";
import { useState } from "react";

type Operation = "unknown" | "buy" | "sell" 

const Home: React.FC = () => {
  const [operation, setOperation] = useState<Operation>('unknown')
  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar >
          <IonTitle class="font-display text-black ion-text-center">
            RaDax Calculator
          </IonTitle>
          <IonButtons slot="primary">
            <IonButton>
              <IonIcon
                slot="icon-only"
                ios={ellipsisHorizontal}
                md={ellipsisVertical}
              ></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div className="flex flex-col gap-3">
            <AppContext panel={{operation, setOperation}}>
              <CryptoBox />
              <CalculatePanel />
              <KeyPad />
            </AppContext>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
