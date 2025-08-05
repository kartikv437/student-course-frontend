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
    const [currentStep, setCurrentStep] = useState(1);
    const sectionRefs = useRef<(HTMLIonGridElement | null)[]>([]);

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


    const goToOfferLetter = (type?: string) => {
        setOfferLetter(true);
        // history.push('/home/offer-letter', { type });
    };

    const goToPayment = () => {
        // Logic to navigate to the payment page
        history.push('/home/payment-section');
        // unlockStep(3);

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
            <div className="scroll-progress-bar">
                {[1, 2].map((step) => (
                    <div
                        key={step}
                        className={`bar-segment ${currentStep >= step ? 'active' : ''}`}
                    />
                ))}
            </div>
            <IonContent className="ion-padding">
                <IonToolbar color="light">
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/home/applicationForm" />
                    </IonButtons>
                    <IonTitle>
                        <h2>Step 2 :Offer Letter</h2>
                    </IonTitle>
                </IonToolbar>

                <IonGrid ref={(el) => {
                    sectionRefs.current[0] = el;
                }} data-step="0">
                    {!interviewStatus && (
                        <IonItem>
                            <IonLabel>Upload English Proficiency Certificate</IonLabel>
                            <input type="file" accept=".pdf,.doc,.docx" style={{ padding: "8px 0" }} onChange={handleFileChange} />
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
                            <IonButton expand="block" color="primary" onClick={() => goToOfferLetter('conditional')}>
                                View Conditional Offer Letter
                            </IonButton>
                        </IonItem>
                    )}
                    {unconditional && (
                        <IonItem>
                            <IonButton expand="block" color="secondary" onClick={() => goToOfferLetter('unconditional')}>
                                View Unconditional Offer Letter
                            </IonButton>
                        </IonItem>
                    )}
                </IonGrid>

                <IonGrid ref={(el) => {
                    sectionRefs.current[1] = el;
                }} data-step="1">
                    {offerLetter && (
                        <div>
                            <IonTitle>
                                <h3>Download Offer Letter</h3></IonTitle>
                            <IonCard>
                                <IonCardHeader>
                                    <IonCardTitle>Narendra</IonCardTitle>
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
                        </div>
                    )}

                </IonGrid>

            </IonContent>
        </IonPage>
    )
}

export default ConditionalOfferLetter;