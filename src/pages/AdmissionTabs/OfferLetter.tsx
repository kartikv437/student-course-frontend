import { IonPage, IonToolbar, IonTitle, IonContent, IonBackButton, IonButtons, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonIcon, IonItem, IonLabel, IonList, IonText } from '@ionic/react';
import { useHistory, useLocation } from 'react-router';
import { documentTextOutline, checkmarkCircleOutline, closeCircleOutline, downloadOutline, download } from 'ionicons/icons';
import { useTabProgress } from '../../context/TabProgressContext';
import Header from '../../components/Header';
import { jsPDF } from 'jspdf';
interface LocationState {
    type?: string;
}

const OfferLetter: React.FC = () => {
    const location = useLocation<LocationState>();
    const { type } = location.state || {};
    const capitalizeFirstLetter = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
    const history = useHistory();
    const { unlockStep } = useTabProgress();

    const goToPayment = () => {
        // Logic to navigate to the payment page
        history.push('/admission/payment-gateway');
        unlockStep(3);

    };

    // const downloadOfferLetter = () => {
    //     const link = document.createElement('a');
    //     link.href = '/offer-letter.pdf'; 
    //     link.download = 'offer-letter.pdf';
    //     document.body.appendChild(link);
    //     link.click();
    //     document.body.removeChild(link);
    // };

    const downloadOfferLetter = () => {
  const doc = new jsPDF();

  // Add some dummy text
  doc.setFontSize(18);
  doc.text("Offer Letter", 20, 20);

  doc.setFontSize(12);
  doc.text("Dear Candidate,", 20, 40);
  doc.text("Congratulations! You have been selected for admission.", 20, 50);
  doc.text("Please find your admission offer letter.", 20, 60);
  doc.text("Regards,", 20, 80);
  doc.text("Admissions Office", 20, 90);

  // Save the PDF with the name
  doc.save("offer-letter.pdf");
};

    return (
        <IonPage>
            <Header />
            <IonContent className="ion-padding">
                <IonToolbar color="light">
                    {/* <IonTitle> */}
                        <h2>{capitalizeFirstLetter(type ?? '')} Offer Letter</h2>
                    {/* </IonTitle> */}
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/" />
                    </IonButtons>
                </IonToolbar>
                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle>Kartik</IonCardTitle>
                    </IonCardHeader>

                    <IonCardContent>
                        <IonText color="medium">
                            <p>
                                Congratulations! You have received a <strong>Conditional Offer</strong> from <strong>XYZ</strong>.
                                Please complete the following requirements to proceed to the next step of your visa application.
                            </p>
                        </IonText>

                        <IonList lines="none" className="ion-margin-top">
                            <IonItem>
                                <IonIcon icon={documentTextOutline} slot="start" />
                                <IonLabel>Submit English Proficiency Certificate</IonLabel>
                            </IonItem>
                            <IonItem>
                                <IonIcon icon={documentTextOutline} slot="start" />
                                <IonLabel>Upload Financial Documents</IonLabel>
                            </IonItem>
                            <IonItem>
                                <IonIcon icon={documentTextOutline} slot="start" />
                                <IonLabel>Attend Admission Interview</IonLabel>
                            </IonItem>
                        </IonList>

                        <div className="ion-margin-top ion-text-center">
                            <IonButton color="success" expand="block" onClick={downloadOfferLetter}>
                                <IonIcon icon={downloadOutline} slot="start" />
                                Download Offer Letter
                            </IonButton>
                            <IonButton color="danger" expand="block" className="ion-margin-top" onClick={goToPayment}>
                                Proceed to Payment
                            </IonButton>
                        </div>
                    </IonCardContent>
                </IonCard>
            </IonContent>


        </IonPage>
    );
};
export default OfferLetter;