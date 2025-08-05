import { IonPage, IonContent, IonToolbar, IonTitle, IonButtons, IonBackButton, IonCard, IonCardHeader, IonCardTitle, IonIcon, IonCardContent, IonText, IonItem, IonInput, IonButton, IonGrid } from "@ionic/react";
import { cardOutline, personOutline, calendarOutline, keyOutline, lockClosedOutline } from "ionicons/icons";
import { useEffect, useRef, useState } from "react";
import Header from "../../components/Header";
import { useHistory } from "react-router";

const PaymentSection: React.FC = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const sectionRefs = useRef<(HTMLIonGridElement | null)[]>([]);
    const history = useHistory();
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const visibleSections: number[] = [];

                entries.forEach((entry) => {
                    const indexAttr = entry.target.getAttribute('data-step');
                    if (entry.isIntersecting && indexAttr !== null) {
                        visibleSections.push(parseInt(indexAttr));
                    }
                });

                if (visibleSections.length > 0) {
                    const maxVisible = Math.max(...visibleSections);
                    setCurrentStep(maxVisible + 1); // because your steps start from 1
                }
            },
            {
                threshold: 0.5, // 50% of section must be visible
            }
        );

        sectionRefs.current.forEach((section) => {
            if (section) observer.observe(section);
        });

        return () => {
            sectionRefs.current.forEach((section) => {
                if (section) observer.unobserve(section);
            });
        };
    }, []);

    const goToVisaProcess = () => {
        // Logic to navigate to the visa process page
        // You can use React Router or any other navigation method
        history.push('/home/visa-apply');
    };

    return (
        <IonPage>
            <Header />
            <div className="scroll-progress-bar">
                {[1, 2].map((step) => (
                    <div
                        key={step}
                        className={`bar-segment ${currentStep >= step ? 'active' : ''}`}
                    />
                ))}
            </div>
            <IonContent fullscreen className="ion-padding">
                <IonToolbar>
                    <IonTitle>Step 3 : Payment</IonTitle>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/home/conditional-offer-letter" />
                    </IonButtons>
                </IonToolbar>
                <IonGrid ref={(el) => {
                    sectionRefs.current[0] = el;
                }} data-step="0">
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

                                <IonButton expand="block" color="success" className="ion-margin-top" onClick={goToVisaProcess}>
                                    <IonIcon icon={lockClosedOutline} slot="start" />
                                    Partial Payment
                                </IonButton>
                            </div>
                        </IonCardContent>
                    </IonCard>
                </IonGrid>

                <IonGrid ref={(el) => {
                    sectionRefs.current[1] = el;
                }} data-step="1">
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

                                <IonButton expand="block" color="success" className="ion-margin-top" onClick={goToVisaProcess}>
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