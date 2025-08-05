import { IonPage, IonContent, IonToolbar, IonButtons, IonBackButton, IonTitle, IonInput, IonItem, IonLabel, IonButton } from "@ionic/react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Header from "../../components/Header";

const VerifyOfferLetter: React.FC = () => {
    const [file, setFile] = useState("");
    const [statusText, setStatusText] = useState("");
    const [status, setStatus] = useState(false);
    const [unconditional, setUnconditional] = useState(false);
    const [interviewStatus, setInterviewStatus] = useState(false);
    const history = useHistory();

    // useEffect(() => {
    //     if (!localStorage.getItem('stepsUnlocked')) {
    //         history.push('/');
    //     }
    // }, []);

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
        // Logic to navigate to the next step
        // You can use the 'type' parameter if needed
        history.push('/home/offer-letter', { type });
    };

    return (
        <IonPage>
            <Header />
            <IonContent className="ion-padding">
                <IonToolbar color="light">
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/home/applicationForm" />
                    </IonButtons>
                    <IonTitle>
                        <h2>Offer Letter</h2>
                    </IonTitle>
                </IonToolbar>

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


            </IonContent>
        </IonPage>
    );
}

export default VerifyOfferLetter;
