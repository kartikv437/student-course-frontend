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
    IonMenuToggle
} from '@ionic/react';

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
                    <IonTitle>Menu</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonList>
                    <IonMenuToggle autoHide={false}>
                        <IonItem routerLink="/home" routerDirection="root">Home</IonItem>
                        <IonItem routerLink="/home/programs" routerDirection="root">Programs</IonItem>
                        <IonItem routerLink="/admission" routerDirection="root">Admission</IonItem>
                        <IonItem routerLink="/home/blogs" routerDirection="root">Blogs</IonItem>
                        <IonItem lines="none">
                            <IonLabel>Mode</IonLabel>
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
