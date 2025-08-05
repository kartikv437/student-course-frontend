import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonIcon,
    IonText,
    IonBackButton,
    IonButtons
} from '@ionic/react';

import {
    cardOutline,
    lockClosedOutline,
    personOutline,
    calendarOutline,
    keyOutline
} from 'ionicons/icons';
import './PaymentGateway.css';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useTabProgress } from '../../context/TabProgressContext';
import Header from '../../components/Header';

const PaymentGateway: React.FC = () => {

    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [nameOnCard, setNameOnCard] = useState('');
    const history = useHistory();
    const { unlockStep } = useTabProgress();

    useEffect(() => {
        if (!localStorage.getItem('stepsUnlocked')) {
            history.push('/');
        }
    }, []);

    const goToVisaProcess = () => {
        // Logic to navigate to the visa process page
        // You can use React Router or any other navigation method
        history.push('/home/visa-process');
        unlockStep(4);
    };

    return (
        <IonPage>
            <Header />
            <IonContent fullscreen className="ion-padding">
                <IonToolbar>
                    <IonTitle>Secure Payment</IonTitle>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/home/offer-letter" />
                    </IonButtons>
                </IonToolbar>
                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle>
                            <IonIcon icon={cardOutline} style={{ marginRight: '8px' }} />
                            Pay ₹25,000 for Course Admission
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
                                Pay Securely
                            </IonButton>
                        </div>
                    </IonCardContent>
                </IonCard>
            </IonContent>
        </IonPage>
    );
};

export default PaymentGateway;
