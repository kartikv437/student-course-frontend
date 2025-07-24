import { IonPage, IonContent, IonItem, IonLabel, IonInput, IonButton } from "@ionic/react";
import Header from "./Header";

const Login: React.FC = () => {
    return (
        <IonPage>
            <Header />
            <IonContent fullscreen className="ion-padding">
                <h2 style={{ fontSize: "1.2rem", marginBottom: "10px" }}>Login</h2>
                <form>
                    <IonItem>
                        <IonLabel position="floating">Email</IonLabel>
                        <IonInput type="email" required />
                    </IonItem>
                    <IonItem>
                        <IonLabel position="floating">Password</IonLabel>
                        <IonInput type="password" required />
                    </IonItem>
                    <IonButton expand="full" type="submit">Login</IonButton>
                </form>
            </IonContent>
        </IonPage>
    );
}

export default Login;