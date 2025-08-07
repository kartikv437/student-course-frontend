import { IonPage, IonToolbar, IonContent, IonBackButton, IonButtons, IonCard, IonIcon, IonRouterLink, IonTitle } from "@ionic/react";
import Header from "../../components/Header";
import "./Programs.css";
import { briefcaseOutline } from "ionicons/icons";
const Programs: React.FC = () => {
    return (
        <IonPage>
            <Header />
            <IonContent fullscreen className="ion-padding">
                <IonToolbar color="light" className="main-heading">
                    <IonButtons slot="start">
                        <IonBackButton className="custom-back" defaultHref="/home/homePage" />
                    </IonButtons>
                    <IonTitle><h2 style={{ marginTop: "10px"}}>Programs</h2></IonTitle>
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