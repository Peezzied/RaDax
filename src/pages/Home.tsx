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
import { ComboboxDemo } from "@/components/CryptoBox";

const Home: React.FC = () => {
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
        <ComboboxDemo/>
      </IonContent>
    </IonPage>
  );
};

export default Home;
