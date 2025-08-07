import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonBackButton, IonButtons, IonItem, IonLabel } from "@ionic/react";
import ExploreContainer from "../../components/ExploreContainer";
import Header from "../../components/Header";

const Orientation: React.FC = () => {
    return (
        <IonPage>
            <Header />
            <IonContent fullscreen className="ion-padding">
                <IonToolbar color="light" className="main-heading">
                    <IonButtons slot="start">
                        <IonBackButton className="custom-back" defaultHref="/home/visa-apply" />
                    </IonButtons>
                    <IonTitle><h2 style={{ marginTop: "10px"}}>Orientation</h2></IonTitle>
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