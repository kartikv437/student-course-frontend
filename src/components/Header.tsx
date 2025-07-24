import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonMenu, IonMenuButton, IonMenuToggle, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import './Header.css';
import '../theme/variables.css';
import { menuOutline, personCircle } from "ionicons/icons";

interface HeaderProps {
    title?: string;
    showMenu?: boolean;
}

const Header: React.FC<HeaderProps> = ({ title = 'Student App', showMenu = true }) => {

    return (
        <>
            {/* <IonMenu content-id="main-content"> */}
            {/* <IonHeader>
                    <IonToolbar className="custom-header">
                        <IonTitle>Menu</IonTitle>
                    </IonToolbar>
                </IonHeader>

                <IonContent>
                    <IonList>
                        <IonListHeader>
                            Navigate
                        </IonListHeader>
                        <IonMenuToggle auto-hide="false">
                            <IonItem button>
                                <IonIcon slot="start" name='home'></IonIcon>
                                <IonLabel>
                                    Home
                                </IonLabel>
                            </IonItem>
                        </IonMenuToggle>
                    </IonList>
                </IonContent> */}
            {/* </IonMenu> */}

            <IonHeader id="main-content">
                <IonToolbar className="custom-header">
                    <IonButtons slot="start" color="primary">
                        <IonMenuToggle>
                            <IonButton>
                                <IonIcon slot="icon-only" icon={menuOutline}></IonIcon>
                            </IonButton>
                        </IonMenuToggle>
                    </IonButtons>
                    <IonTitle>{title}</IonTitle>
                    {/* User Icon */}
                    <IonIcon slot="end" icon={personCircle} size="large" color="primary" className="user-icon" />
                </IonToolbar>
            </IonHeader>
        </>
    );
}

export default Header;
