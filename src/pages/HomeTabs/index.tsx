import { IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, IonLabel } from "@ionic/react";
import { home, person } from "ionicons/icons";
import { Route, Redirect } from "react-router";
import HomePage from "./HomePage";
import Events from "./Events";
import Courses from "./Courses";

const HomeTabs: React.FC = () => {
    return (
        <IonTabs>
            <IonRouterOutlet>
                <Route path="/home/homePage" component={HomePage} exact />
                <Route path="/home/courses" component={Courses} exact />
                <Route path="/home/events" component={Events} exact />
                <Redirect exact from="/home" to="/home/homePage" />
            </IonRouterOutlet>

            <IonTabBar slot="bottom">
                <IonTabButton tab="homePage" href="/home/homePage">
                    <IonIcon icon={home} />
                    <IonLabel>Home</IonLabel>
                </IonTabButton>
                <IonTabButton tab="courses" href="/home/courses">
                    <IonIcon icon={person} />
                    <IonLabel>Courses</IonLabel>
                </IonTabButton>
                <IonTabButton tab="events" href="/home/events">
                    <IonIcon icon={person} />
                    <IonLabel>Events</IonLabel>
                </IonTabButton>
            </IonTabBar>
        </IonTabs>
    )
}

export default HomeTabs;