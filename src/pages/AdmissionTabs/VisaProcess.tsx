import {
    IonPage,
    IonToolbar,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonLabel,
    IonItem,
    IonInput,
    IonButton,
    IonIcon,
    IonList,
    IonText,
    IonBackButton,
    IonButtons
} from '@ionic/react';

import {
    cloudUploadOutline,
    documentOutline,
    checkmarkCircleOutline,
    shieldCheckmarkOutline,
    downloadOutline
} from 'ionicons/icons';

import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Header from '../../components/Header';
import { jsPDF } from "jspdf";

const VisaProcess: React.FC = () => {
    const [visaStage1Uploaded, setStage1Uploaded] = useState(false);
    const [visaStage2Uploaded, setStage2Uploaded] = useState(false);
    const [visaVerified, setVisaVerified] = useState(false);
    const history = useHistory();

    useEffect(() => {
        if (!localStorage.getItem('stepsUnlocked')) {
            history.push('/');
        }
    }, []);

    const handleUploadStage1 = () => {
        setStage1Uploaded(true);
    };

    const handleUploadStage2 = () => {
        setStage2Uploaded(true);
    };

    const handleVerification = () => {
        if (visaStage1Uploaded && visaStage2Uploaded) {
            setVisaVerified(true);
        } else {
            alert("Please upload all required documents before verification.");
        }
    };

    const gotoOrientation = () => {
        history.push('/home/orientation');
    }

    return (
        <IonPage>
            <Header />
            <IonContent fullscreen className="ion-padding">
                <IonToolbar color="light">
                    <h2>Visa Processing</h2>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/home/payment-gateway" />
                    </IonButtons>
                </IonToolbar>
                {/* STAGE 1 DOCUMENTS */}
                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle>Visa Stage 1: Campus France</IonCardTitle>
                        <IonCardSubtitle>Upload Initial Documents</IonCardSubtitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <IonList lines="none">
                            <IonItem>
                                <IonIcon icon={documentOutline} slot="start" />
                                <IonLabel>Application Form</IonLabel>
                            </IonItem>
                            <IonItem>
                                <IonIcon icon={documentOutline} slot="start" />
                                <IonLabel>Fee Receipt</IonLabel>
                            </IonItem>
                        </IonList>
                        <IonButton
                            expand="block"
                            color={visaStage1Uploaded ? 'success' : 'primary'}
                            onClick={handleUploadStage1}
                            className="ion-margin-top"
                        >
                            <IonIcon icon={cloudUploadOutline} slot="start" />
                            {visaStage1Uploaded ? 'Uploaded' : 'Upload Stage 1 Docs'}
                        </IonButton>
                    </IonCardContent>
                </IonCard>

                {/* STAGE 2 DOCUMENTS */}
                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle>Visa Stage 2: Embassy Submission</IonCardTitle>
                        <IonCardSubtitle>Additional Requirements</IonCardSubtitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <IonList lines="none">
                            <IonItem>
                                <IonIcon icon={documentOutline} slot="start" />
                                <IonLabel>Medical Certificate</IonLabel>
                            </IonItem>
                            <IonItem>
                                <IonIcon icon={documentOutline} slot="start" />
                                <IonLabel>Bank Statement</IonLabel>
                            </IonItem>
                            <IonItem>
                                <IonIcon icon={documentOutline} slot="start" />
                                <IonLabel>Proof of Accommodation</IonLabel>
                            </IonItem>
                        </IonList>
                        <IonButton
                            expand="block"
                            color={visaStage2Uploaded ? 'success' : 'primary'}
                            onClick={handleUploadStage2}
                            className="ion-margin-top"
                        >
                            <IonIcon icon={cloudUploadOutline} slot="start" />
                            {visaStage2Uploaded ? 'Uploaded' : 'Upload Stage 2 Docs'}
                        </IonButton>
                    </IonCardContent>
                </IonCard>

                {/* VERIFICATION */}
                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle>Visa Verification</IonCardTitle>
                        <IonCardSubtitle>Final Clearance</IonCardSubtitle>
                    </IonCardHeader>
                    <IonCardContent>
                        {visaVerified ? (
                            <IonText color="success">
                                <p>
                                    <IonIcon icon={checkmarkCircleOutline} /> Your visa documents are verified and approved!
                                </p>
                            </IonText>
                        ) : (
                            <IonButton expand="block" color="tertiary" onClick={handleVerification}>
                                <IonIcon icon={shieldCheckmarkOutline} slot="start" />
                                Verify Documents
                            </IonButton>
                        )}
                    </IonCardContent>
                </IonCard>

                {/* FINAL STATUS */}
                {visaVerified && (
                    <IonCard color="success">
                        <IonCardHeader>
                            <IonCardTitle>E-VISA Approved</IonCardTitle>
                            <IonCardSubtitle>Congratulations!</IonCardSubtitle>
                        </IonCardHeader>
                        <IonCardContent>
                            <p>Your e-VISA has been issued. You may now proceed to travel preparation.</p>
                        </IonCardContent>

                        <IonButton expand="block" color="success" onClick={gotoOrientation}>
                            <IonIcon icon={checkmarkCircleOutline} slot="start" />
                            Proceed to Orientation
                        </IonButton>
                    </IonCard>
                )}

            </IonContent>
        </IonPage>
    );
};

export default VisaProcess;
