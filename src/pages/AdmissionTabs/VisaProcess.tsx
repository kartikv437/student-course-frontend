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
        setVisaVerified(true);
        // if (visaStage1Uploaded && visaStage2Uploaded) {
        //     setVisaVerified(true);
        // } else {
        //     alert("Please upload all required documents before verification.");
        // }
    };

    const downloadVisaApplication = () => {
        const doc = new jsPDF();

        doc.setFontSize(18);
        doc.text("Visa Application Form", 20, 20);

        doc.setFontSize(12);
        doc.text("Full Name: ____________________________", 20, 40);
        doc.text("Date of Birth: _________________________", 20, 50);
        doc.text("Passport Number: _______________________", 20, 60);
        doc.text("Nationality: ___________________________", 20, 70);
        doc.text("Phone Number: __________________________", 20, 80);
        doc.text("Email Address: _________________________", 20, 90);
        doc.text("Purpose of Visit: ______________________", 20, 100);
        doc.text("Duration of Stay: ______________________", 20, 110);
        doc.text("Intended Date of Travel: _______________", 20, 120);
        doc.text("Address in Destination Country: ________", 20, 130);

        doc.setFontSize(10);
        doc.text("* Please submit this form along with your passport copy and photo.", 20, 150);
        doc.text("Signature: ____________________", 20, 170);
        doc.text("Date: __________________________", 120, 170);

        doc.save("visa-application-form.pdf");
    };

    const downloadDummyFlightTicket = () => {
        const doc = new jsPDF();

        // Header
        doc.setFontSize(20);
        doc.text("E-Ticket Receipt", 70, 20);

        doc.setFontSize(12);
        doc.text("Passenger Name: John Doe", 20, 40);
        doc.text("Booking Reference: ABC12345", 20, 50);
        doc.text("Airline: Demo Airlines", 20, 60);
        doc.text("Flight Number: DA123", 20, 70);

        doc.text("Departure: Delhi (DEL)", 20, 90);
        doc.text("Arrival: Frankfurt (FRA)", 20, 100);
        doc.text("Date: 10 Sept 2025", 20, 110);
        doc.text("Boarding Time: 06:45 AM", 20, 120);
        doc.text("Gate: A12", 20, 130);
        doc.text("Seat: 21A", 20, 140);

        // Barcode imitation
        doc.setLineWidth(0.5);
        for (let i = 0; i < 50; i++) {
            const x = 20 + i * 1.5;
            const height = i % 2 === 0 ? 20 : 25;
            doc.line(x, 160, x, 160 + height);
        }

        doc.setFontSize(10);
        doc.text("* This is a computer-generated ticket and does not require a signature.", 20, 200);

        doc.save("flight-ticket.pdf");
    };

    const downloadDummyBankStatement = () => {
        const doc = new jsPDF();

        // Bank Info
        doc.setFontSize(16);
        doc.text("Demo Bank Ltd.", 20, 20);
        doc.setFontSize(12);
        doc.text("Account Statement", 20, 30);

        // Customer Info
        doc.text("Name: John Doe", 20, 45);
        doc.text("Account Number: 123456789012", 20, 52);
        doc.text("Statement Period: 01 July 2025 - 31 July 2025", 20, 59);
        doc.text("Branch: New Delhi Main", 20, 66);

        // Table Headers
        doc.setFontSize(11);
        doc.text("Date", 20, 80);
        doc.text("Description", 50, 80);
        doc.text("Withdrawals", 120, 80);
        doc.text("Deposits", 150, 80);
        doc.text("Balance", 180, 80);

        const transactions = [
            { date: "01/07/25", desc: "Opening Balance", w: "", d: "", b: "₹25,000.00" },
            { date: "03/07/25", desc: "ATM Withdrawal", w: "₹5,000.00", d: "", b: "₹20,000.00" },
            { date: "10/07/25", desc: "Salary Credit", w: "", d: "₹50,000.00", b: "₹70,000.00" },
            { date: "15/07/25", desc: "Online Purchase", w: "₹3,500.00", d: "", b: "₹66,500.00" },
            { date: "20/07/25", desc: "UPI Transfer", w: "₹2,000.00", d: "", b: "₹64,500.00" },
            { date: "25/07/25", desc: "Interest Credit", w: "", d: "₹150.00", b: "₹64,650.00" },
        ];

        let y = 90;
        transactions.forEach((txn) => {
            doc.text(txn.date, 20, y);
            doc.text(txn.desc, 50, y);
            doc.text(txn.w || "-", 120, y);
            doc.text(txn.d || "-", 150, y);
            doc.text(txn.b, 180, y, { align: "right" });
            y += 8;
        });

        // Summary
        y += 10;
        doc.setFontSize(12);
        doc.text("Closing Balance: ₹64,650.00", 20, y);

        doc.save("bank-statement.pdf");
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
                            <IonButton onClick={downloadVisaApplication} color={"secondary"}>
                                Download Visa Application Form
                            </IonButton>
                            <IonItem>
                                <IonIcon icon={documentOutline} slot="start" />
                                {/* <IonLabel>Fee Receipt</IonLabel> */}
                                <IonLabel>Flight Ticket</IonLabel>
                            </IonItem>
                            <IonButton onClick={downloadDummyFlightTicket} color={"secondary"}>
                                Download Flight Ticket
                            </IonButton>
                        </IonList>
                        {/* <IonButton
                            expand="block"
                            color={visaStage1Uploaded ? 'success' : 'primary'}
                            onClick={handleUploadStage1}
                            className="ion-margin-top"
                        >
                            <IonIcon icon={cloudUploadOutline} slot="start" />
                            {visaStage1Uploaded ? 'Uploaded' : 'Upload Stage 1 Docs'}
                        </IonButton> */}
                    </IonCardContent>
                </IonCard>

                {/* STAGE 2 DOCUMENTS */}
                <IonCard>
                    <IonCardHeader>
                        {/* <IonCardTitle>Visa Stage 2: Embassy Submission</IonCardTitle> */}
                        <IonCardTitle>Visa Stage 2: Bank Statement</IonCardTitle>

                        <IonCardSubtitle>Additional Requirements</IonCardSubtitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <IonList lines="none">
                            {/* <IonItem>
                                <IonIcon icon={documentOutline} slot="start" />
                                <IonLabel>Medical Certificate</IonLabel>
                            </IonItem> */}
                            <IonItem>
                                <IonIcon icon={documentOutline} slot="start" />
                                <IonLabel>Bank Statement</IonLabel>
                            </IonItem>
                            <IonButton onClick={downloadDummyBankStatement} color={"secondary"}>
                                Download Bank Statement
                            </IonButton>
                            {/* <IonItem>
                                <IonIcon icon={documentOutline} slot="start" />
                                <IonLabel>Proof of Accommodation</IonLabel>
                            </IonItem> */}
                        </IonList>
                        {/* <IonButton
                            expand="block"
                            color={visaStage2Uploaded ? 'success' : 'primary'}
                            onClick={handleUploadStage2}
                            className="ion-margin-top"
                        >
                            <IonIcon icon={cloudUploadOutline} slot="start" />
                            {visaStage2Uploaded ? 'Uploaded' : 'Upload Stage 2 Docs'}
                        </IonButton> */}
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
