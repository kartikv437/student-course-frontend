import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonBackButton, IonButtons, IonItem, IonLabel } from "@ionic/react";
import ExploreContainer from "../../components/ExploreContainer";
import Header from "../../components/Header";

const Orientation: React.FC = () => {
    return (
        <IonPage>
            <Header />
            <IonContent fullscreen className="ion-padding">
                <IonToolbar color="light">
                    <h2>Orientation</h2>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/home/visa-apply" />
                    </IonButtons>
                </IonToolbar>
                <IonItem>
                    <IonLabel>
                        <h3>Welcome to Orientation</h3>
                    </IonLabel>
                </IonItem>

            </IonContent>
        </IonPage>
    );
}

export default Orientation;