import { IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, IonLabel } from "@ionic/react";
import { home, person } from "ionicons/icons";
import { Route, Redirect } from "react-router";
import HomePage from "./HomePage";
import Events from "./Events";
import Courses from "./Courses";
import ApplicationForm from "./ApplicationForm";
import VerifyOfferLetter from "../AdmissionTabs/VerifyOfferLetter";
import OfferLetter from "../AdmissionTabs/OfferLetter";
import PaymentGateway from "../AdmissionTabs/PaymentGateway";
import VisaProcess from "../AdmissionTabs/VisaProcess";
import Orientation from "../AdmissionTabs/Orientation";
import ConditionalOfferLetter from "./ConditionalOfferLetter";
import PaymentSection from "./PaymentSection";
import VisaApply from "./VisaApply";
import AboutUs from "./AboutUs";
import Programs from "./Programs";
import Bachelor from "./Bachelor";
import Masters from "./Masters";
import "./index.css";
import ContactUs from "./ContactUs";
import Blogs from "./Blogs";
const HomeTabs: React.FC = () => {
    return (
        <IonTabs>
            <IonRouterOutlet>
                <Route path="/home/homePage" component={HomePage} exact />
                <Route path="/home/courses" component={Courses} exact />
                <Route path="/home/events" component={Events} exact />
                <Route path="/home/applicationForm" component={ApplicationForm} exact />
                <Route path="/home/verify-offer-letter" component={VerifyOfferLetter} exact />
                <Route path="/home/offer-letter" component={OfferLetter} exact />
                <Route path="/home/payment-gateway" component={PaymentGateway} exact />
                <Route path="/home/visa-process" component={VisaProcess} exact />
                <Route path="/home/orientation" component={Orientation} exact />
                <Route path="/home/conditional-offer-letter" component={ConditionalOfferLetter} exact />
                <Route path="/home/payment-section" component={PaymentSection} exact />
                <Route path="/home/visa-apply" component={VisaApply} exact />
                <Route path="/home/about-us" component={AboutUs} exact />
                <Route path="/home/programs" component={Programs} exact />
                <Route path="/home/programs/bachelor" component={Bachelor} exact />
                <Route path="/home/programs/masters" component={Masters} exact />
                <Route path="/home/contact-us" component={ContactUs} exact />
                <Route path="/blogs" component={Blogs} exact />

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