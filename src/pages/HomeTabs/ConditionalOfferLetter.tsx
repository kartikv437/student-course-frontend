import { IonPage, IonContent, IonToolbar, IonButtons, IonBackButton, IonTitle, IonItem, IonLabel, IonButton, IonGrid, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonIcon, IonList, IonText } from "@ionic/react";
import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
import Header from "../../components/Header";
import { documentTextOutline, downloadOutline } from "ionicons/icons";
import { jsPDF } from 'jspdf';
import './ConditionalOfferLetter.css'
const ConditionalOfferLetter: React.FC = () => {
    const [file, setFile] = useState("");
    const [statusText, setStatusText] = useState("");
    const [status, setStatus] = useState(false);
    const [unconditional, setUnconditional] = useState(false);
    const [interviewStatus, setInterviewStatus] = useState(false);
    const history = useHistory();
    const [offerLetter, setOfferLetter] = useState(false);

    const [completedSteps, setCompletedSteps] = useState(0);
    const [submittedSections, setSubmittedSections] = useState<{ [key: string]: boolean }>({});
    const email = localStorage.getItem('email'); // Assuming user info is stored in localStorage
    const user = email ? { email: email.split('@')[0] } : null; // Simplified user object

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        // check extentions

        if (selectedFile) {
            setUnconditional(false);
            setStatus(false);
            setFile(selectedFile.name);
            if (!["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"].includes(selectedFile.type)) {
                setStatusText("Certificate review under process. May take 24 hours to process.");
                setTimeout(() => {
                    setStatusText("Certificate review status failed. Go with unconditional offer letter.");
                    setUnconditional(true);
                    setStatus(false);
                }, 3000);
                return;
            } else {
                setStatusText("Certificate review under process. May take 24 hours to process.");
                setTimeout(() => {
                    setStatusText("Certificate review status approved. You can download the offer letter.");
                    setStatus(true);
                    setUnconditional(false);
                }, 3000);
            }
        }
    };

    const sendEmail = () => {
        // Logic to send email for scheduling interview
        setStatusText("Interview schedule link has been sent to your registered email address.");
        setInterviewStatus(true);
        setTimeout(() => {

            setStatusText("Interview passed successfully. You can download the offer letter.");
            setStatus(true);
            setUnconditional(false);
        }, 3000);
    };


    const goToPaymentSection = (type: string) => {
        setOfferLetter(true);
        // history.push('/home/offer-letter', { type });
        if (!submittedSections[type]) {
            setCompletedSteps((prev) => prev + 1);
            setSubmittedSections((prev) => ({ ...prev, [type]: true }));
        }
        if (type === "payment") {
            history.push('/home/payment-section');
        }
    };

    const goToPayment = () => {
        // Logic to navigate to the payment page
        history.push('/home/payment-section');

    };

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
            {/* ✅ Progress Bar */}
            <div className="progress-container">
                <div className="progress-bar">
                    <div
                        className="progress-bar-fill"
                        style={{ width: `${(completedSteps / 2) * 100}%` }}
                    ></div>
                </div>
            </div>
            <IonContent fullscreen className="ion-padding  top-handling">
                <IonToolbar color="light">
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/home/applicationForm" />
                    </IonButtons>
                    <IonTitle>
                        <h2>Step 2 :Offer Letter</h2>
                    </IonTitle>
                </IonToolbar>

                <IonGrid>
                    {!interviewStatus && (
                        <IonItem>
                            <IonLabel >Upload English Proficiency Certificate</IonLabel>
                            <label className="custom-file-upload">
                                <input type="file" accept=".pdf,.doc,.docx" style={{ padding: "8px 0" }} onChange={handleFileChange} />
                                Choose File
                            </label>

                        </IonItem>
                    )}


                    {/* if certificate not available then schedule interview */}
                    {!file && !interviewStatus && (
                        <IonItem>
                            <IonLabel color="danger">No certificate uploaded. Please upload your certificate or schedule an interview.</IonLabel>
                        </IonItem>
                    )}
                    {/* if certificate is available then show the button to download the offer letter */}
                    {file && !interviewStatus && (
                        <IonItem>
                            <IonLabel color="success">Certificate uploaded: {file}</IonLabel>
                        </IonItem>
                    )}
                    {!file && !interviewStatus && (
                        <IonItem>
                            <IonButton expand="block" color="primary" onClick={sendEmail}>
                                Schedule Interview
                            </IonButton>
                        </IonItem>
                    )}
                    {/* if certificate is available then show the button to download the offer letter */}
                    {statusText && (
                        <IonItem>
                            <IonLabel color="medium">{statusText}</IonLabel>
                        </IonItem>
                    )}
                    {status && (
                        <IonItem>
                            <IonButton expand="block" color="primary" onClick={() => goToPaymentSection('conditional')}>
                                View Conditional Offer Letter
                            </IonButton>
                        </IonItem>
                    )}
                    {unconditional && (
                        <IonItem>
                            <IonButton expand="block" color="secondary" onClick={() => goToPaymentSection('unconditional')}>
                                View Unconditional Offer Letter
                            </IonButton>
                        </IonItem>
                    )}
                </IonGrid>

                <IonGrid>
                    {offerLetter && (
                        <div>
                            <IonTitle>
                                <h3>Download Offer Letter</h3></IonTitle>
                            <IonCard>
                                <IonCardHeader>
                                    <IonCardTitle>{user ? user.email : "Guest"}</IonCardTitle>
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
                                        <IonButton color="danger" expand="block" className="ion-margin-top" onClick={() => goToPaymentSection('payment')}>
                                            Proceed to Payment
                                        </IonButton>
                                    </div>
                                </IonCardContent>
                            </IonCard>
                        </div>
                    )}

                </IonGrid>

            </IonContent>
        </IonPage>
    )
}

export default ConditionalOfferLetter;