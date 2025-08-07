// SideMenu.tsx
import {
    IonMenu,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonToggle,
    IonMenuToggle,
    IonIcon
} from '@ionic/react';
import { bookOutline, homeOutline, medalOutline, menuOutline, videocamOffOutline, videocamOutline } from 'ionicons/icons';

import React from 'react';

interface SideMenuProps {
    isDarkMode: boolean;
    toggleDarkMode: (e: CustomEvent) => void;
}

const SideMenu: React.FC<SideMenuProps> = ({ isDarkMode, toggleDarkMode }) => {

    return (
        <IonMenu contentId="main-content" type="overlay">
            <IonHeader>
                <IonToolbar>
                    <IonTitle>
                        <h2>Menu</h2>
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonList>
                    <IonMenuToggle autoHide={false}>
                        <IonItem routerLink="/home/homePage" routerDirection="root" lines="none">
                            <IonIcon slot="start" icon={homeOutline} color='danger' size='large' />
                            <h4>Home</h4>
                        </IonItem>
                        <IonItem routerLink="/home/programs" routerDirection="root" lines="none">
                            <IonIcon slot="start" icon={bookOutline} color='danger' size='large' />
                            <h4>Programs</h4>
                        </IonItem>
                        <IonItem routerLink="/admission" routerDirection="root" lines="none">
                            <IonIcon slot="start" icon={medalOutline} color='danger' size='large' />
                            <h4>Admission</h4>
                        </IonItem>
                        <IonItem routerLink="/home/blogs" routerDirection="root" lines="none">
                            <IonIcon slot="start" icon={videocamOutline} color='danger' size='large' />
                            <h4>Blogs</h4>
                        </IonItem>
                        <IonItem lines="none">
                            <IonLabel>
                                <h4>Dark Mode</h4>
                            </IonLabel>
                            <IonToggle
                                slot="end"
                                checked={isDarkMode}
                                onIonChange={toggleDarkMode}
                            />
                        </IonItem>
                    </IonMenuToggle>
                </IonList>
            </IonContent>
        </IonMenu>
    );
};

export default SideMenu;
