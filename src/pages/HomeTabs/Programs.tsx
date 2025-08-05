import { IonPage, IonToolbar, IonContent, IonBackButton, IonButtons, IonCard, IonIcon, IonRouterLink } from "@ionic/react";
import Header from "../../components/Header";
import "./Programs.css";
import { briefcaseOutline } from "ionicons/icons";
const Programs: React.FC = () => {
    return (
        <IonPage>
            <Header />
            <IonContent fullscreen className="ion-padding">
                <IonToolbar color="light">
                    <h2>Programs</h2>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/home/homePage" />
                    </IonButtons>
                </IonToolbar>
                <div className="comms-docs-container">

                    <div className="tile-container">

                        <IonCard className="tile red-tile" >
                            <IonRouterLink routerLink="/home/programs/bachelor">
                                <IonIcon style={{ color: "white" }} icon={briefcaseOutline}/>
                                <p style={{ color: "white" }}>Bachelor</p>
                            </IonRouterLink>

                        </IonCard>

                        <IonCard className="tile green-tile">
                            <IonRouterLink routerLink="/home/programs/masters">
                                <IonIcon style={{ color: "white" }} icon={briefcaseOutline}/>
                                <p style={{ color: "white" }}>Master</p>
                            </IonRouterLink>

                        </IonCard>

                    </div>



                </div>
            </IonContent >
        </IonPage >
    );
}

export default Programs;