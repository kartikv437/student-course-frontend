import { IonButton, IonButtons, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonMenuToggle, IonPopover, IonTitle, IonToolbar } from "@ionic/react";
import './Header.css';
import '../theme/variables.css';
import { logOutOutline, menuOutline, personCircle } from "ionicons/icons";
import { useAuth } from "../auth/AuthContext";
import { useHistory } from "react-router";
import { useState } from "react";

interface HeaderProps {
    title?: string;
    showMenu?: boolean;
}

const Header: React.FC<HeaderProps> = ({ title = 'Student App', showMenu = true }) => {
    const { logout } = useAuth();
    const history = useHistory();
    const email = localStorage.getItem('email'); // Assuming user info is stored in localStorage
    const user = email ? { email: email.split('@')[0] } : null; // Simplified user object
    const [showPopover, setShowPopover] = useState(false);
    const [popoverEvent, setPopoverEvent] = useState<MouseEvent | undefined>();
    const handleLogout = () => {
        logout();         // clear token etc.
        history.push('/login', { replace: true }); // then redirect
    };

    return (
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
                <IonButton slot="end" color="primary" fill="clear"
                    onClick={(e) => {
                        e.persist();
                        setPopoverEvent(e.nativeEvent);
                        setShowPopover(true);
                    }}>
                    <IonIcon icon={personCircle} size="large" className="user-icon" />
                </IonButton>

                {/* Popover attached to the button via trigger */}
                <IonPopover isOpen={showPopover}
                    event={popoverEvent}
                    onDidDismiss={() => setShowPopover(false)} >
                    <IonList>
                        <IonItem lines="full">
                            <IonIcon icon={personCircle} slot="start" />
                            <IonLabel>{user ? user.email : "Guest"}</IonLabel>
                        </IonItem>
                        <IonItem button onClick={() => handleLogout()}>
                            <IonIcon icon={logOutOutline} slot="start" />
                            <IonLabel>Logout</IonLabel>
                        </IonItem>
                    </IonList>
                </IonPopover>
            </IonToolbar>
        </IonHeader>
    );
}

export default Header;
