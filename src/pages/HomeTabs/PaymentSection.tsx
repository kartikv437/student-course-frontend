import { IonPage, IonContent, IonToolbar, IonTitle, IonButtons, IonBackButton, IonCard, IonCardHeader, IonCardTitle, IonIcon, IonCardContent, IonText, IonItem, IonInput, IonButton, IonGrid } from "@ionic/react";
import { cardOutline, personOutline, calendarOutline, keyOutline, lockClosedOutline } from "ionicons/icons";
import { useEffect, useRef, useState } from "react";
import Header from "../../components/Header";
import { useHistory } from "react-router";
import './PaymentSection.css';
const PaymentSection: React.FC = () => {
    const [completedSteps, setCompletedSteps] = useState(0);
    const [submittedSections, setSubmittedSections] = useState<{ [key: string]: boolean }>({});
    const history = useHistory();

    const goToVisaSection=(section:string)=>{
         if (!submittedSections[section]) {
            setCompletedSteps((prev) => prev + 1);
            setSubmittedSections((prev) => ({ ...prev, [section]: true }));
        }
        if (section === 'fullPayment') {
            history.push('/home/visa-apply');
        }
    }

    const goToVisaProcess = () => {
        // Logic to navigate to the visa process page
        // You can use React Router or any other navigation method
        history.push('/home/visa-apply');
    };

    return (
        <IonPage>
            <Header />
            <div className="progress-container">
                <div className="progress-bar">
                    <div
                        className="progress-bar-fill"
                        style={{ width: `${(completedSteps / 2) * 100}%` }}
                    ></div>
                </div>
            </div>
            <IonContent fullscreen className="ion-padding top-handling">
                <IonToolbar>
                    <IonTitle>Step 3 : Payment</IonTitle>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/home/conditional-offer-letter" />
                    </IonButtons>
                </IonToolbar>
                <IonGrid>
                    <IonCard>
                        <IonCardHeader>
                            <IonCardTitle>
                                <IonIcon icon={cardOutline} style={{ marginRight: '8px' }} />
                                Pay Partial Fee ₹25,000 for Course Admission
                            </IonCardTitle>
                        </IonCardHeader>

                        <IonCardContent>
                            <IonText color="medium">
                                <p>This payment is for your course admission fees. You will receive a receipt upon success.</p>
                            </IonText>

                            <div className="payment-form">
                                <IonItem>
                                    <IonIcon icon={personOutline} slot="start" />
                                    <IonInput placeholder="Cardholder Name" />
                                </IonItem>

                                <IonItem>
                                    <IonIcon icon={cardOutline} slot="start" />
                                    <IonInput placeholder="Card Number" type="tel" maxlength={16} />
                                </IonItem>

                                <div className="flex-row">
                                    <IonItem className="flex-item">
                                        <IonIcon icon={calendarOutline} slot="start" />
                                        <IonInput placeholder="MM/YY" maxlength={5} />
                                    </IonItem>

                                    <IonItem className="flex-item">
                                        <IonIcon icon={keyOutline} slot="start" />
                                        <IonInput placeholder="CVV" type="password" maxlength={3} />
                                    </IonItem>
                                </div>

                                <IonButton expand="block" color="success" className="ion-margin-top" onClick={()=>goToVisaSection('partialPayment')}>
                                    <IonIcon icon={lockClosedOutline} slot="start" />
                                    Partial Payment
                                </IonButton>
                            </div>
                        </IonCardContent>
                    </IonCard>
                </IonGrid>

                <IonGrid>
                    <IonCard>
                        <IonCardHeader>
                            <IonCardTitle>
                                <IonIcon icon={cardOutline} style={{ marginRight: '8px' }} />
                                Pay Full Fee ₹50,000 for Course Admission
                            </IonCardTitle>
                        </IonCardHeader>

                        <IonCardContent>
                            <IonText color="medium">
                                <p>This payment is for your course admission fees. You will receive a receipt upon success.</p>
                            </IonText>

                            <div className="payment-form">
                                <IonItem>
                                    <IonIcon icon={personOutline} slot="start" />
                                    <IonInput placeholder="Cardholder Name" />
                                </IonItem>

                                <IonItem>
                                    <IonIcon icon={cardOutline} slot="start" />
                                    <IonInput placeholder="Card Number" type="tel" maxlength={16} />
                                </IonItem>

                                <div className="flex-row">
                                    <IonItem className="flex-item">
                                        <IonIcon icon={calendarOutline} slot="start" />
                                        <IonInput placeholder="MM/YY" maxlength={5} />
                                    </IonItem>

                                    <IonItem className="flex-item">
                                        <IonIcon icon={keyOutline} slot="start" />
                                        <IonInput placeholder="CVV" type="password" maxlength={3} />
                                    </IonItem>
                                </div>

                                <IonButton expand="block" color="success" className="ion-margin-top" onClick={()=>goToVisaSection('fullPayment')}>
                                    <IonIcon icon={lockClosedOutline} slot="start" />
                                    Full Payment
                                </IonButton>
                            </div>
                        </IonCardContent>
                    </IonCard>
                </IonGrid>

            </IonContent>
        </IonPage>
    )
};

export default PaymentSection;