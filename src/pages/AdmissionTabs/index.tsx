import { IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, IonLabel } from "@ionic/react";
import { airplaneOutline, cardOutline, documentOutline, person } from "ionicons/icons";
import { Route, Redirect } from "react-router";
import Enqyury from "./Enquiry";
import VerifyOfferLetter from "./VerifyOfferLetter";
import Passport from "./Passport";
import VisaProcess from "./VisaProcess";
import DocUpload from "./DocUpload";
import PaymentGateway from "./PaymentGateway";
import OfferLetter from "./OfferLetter";
import { useTabProgress } from "../../context/TabProgressContext";
import './index.css';

const AdmissionTabs: React.FC = () => {
    const { stepsUnlocked, isReady } = useTabProgress();
    if (!isReady) return null;

    const disableIfLocked = (requiredStep: number) =>
        stepsUnlocked >= requiredStep ? undefined : 'disabled-tab';
    
    return (
        <IonTabs>
            <IonRouterOutlet>
                <Route path="/admission/enquiry" component={Enqyury} exact />
                <Route path="/admission/doc-upload" component={DocUpload} exact />
                <Route path="/admission/passport" component={Passport} exact />
                <Route path="/admission/verify-offer-letter" component={VerifyOfferLetter} exact />
                <Route path="/admission/offer-letter" component={OfferLetter} exact />
                <Route path="/admission/payment-gateway" component={PaymentGateway} exact />
                <Route path="/admission/visa-process" component={VisaProcess} exact />
                <Redirect exact from="/admission" to="/admission/enquiry" />
            </IonRouterOutlet>

            <IonTabBar slot="bottom">
                <IonTabButton tab="enquiry" href="/admission/enquiry">
                    <IonIcon icon={person} />
                    <IonLabel>Enquiry</IonLabel>
                </IonTabButton>
                <IonTabButton tab="verify-offer-letter" href={stepsUnlocked >= 2 ? '/admission/verify-offer-letter' : undefined}
                    className={disableIfLocked(2)}>
                    <IonIcon icon={documentOutline} />
                    <IonLabel>Offer Letter</IonLabel>
                </IonTabButton>
                <IonTabButton tab="payment-gateway" href={stepsUnlocked >= 3 ? '/admission/payment-gateway' : undefined} 
                className={disableIfLocked(3)}>
                    <IonIcon icon={cardOutline} />
                    <IonLabel>Payment</IonLabel>
                </IonTabButton>
                <IonTabButton tab="visa-process" href={stepsUnlocked >= 4 ? '/admission/visa-process' : undefined}
                    className={disableIfLocked(4)}>
                    <IonIcon icon={airplaneOutline} />
                    <IonLabel>Visa</IonLabel>
                </IonTabButton>
            </IonTabBar>
        </IonTabs>
    );
}
export default AdmissionTabs;