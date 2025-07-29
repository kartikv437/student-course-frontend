import { IonPage, IonContent, IonToolbar, IonButtons, IonBackButton, IonTitle, IonItem, IonLabel, IonInput, IonGrid, IonRow, IonCol, IonButton, IonSelect, IonSelectOption, IonToast, IonLoading } from "@ionic/react";
import { useState } from "react";
import { useHistory } from "react-router";
import Header from "../../components/Header";
import { useToast } from "../../context/ToastContext";
import { submitApplication } from "../../api";

const Enquiry: React.FC = () => {
    // Form states
    const [name, setName] = useState("");
    const [dob, setDob] = useState("");
    const [sex, setSex] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [loading, setLoading] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);
    const history = useHistory();
    const { showToast } = useToast();

    const handleProceed = async () => {
        if (!name || !dob || !sex || !email || !phone) {
            showToast("Please fill all Mandatory fields.", "danger");
            return;
        }
        setLoading(true);
        try {
          const response: any = await submitApplication(JSON.stringify({
                fullName: name,
                dateOfBirth: dob,
                email: email,
                phoneNumber: phone,
                gender: sex,
            }));

            if (response['status'] === 201) {
                setLoading(false);
                setSaveSuccess(true);
                showToast("Application submitted successfully", "success");
            } else {
                showToast("Error submitting application", "danger");
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const goToDocUpload = () => {
        if (!saveSuccess) {
            showToast("Please save all Mandatory fields.", "danger");
            return;
        }
        history.push("/admission/doc-upload");
    }

    return (
        <IonPage>
            <Header />
            <IonContent className="ion-padding">

                <IonToolbar color="light">
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/" />
                    </IonButtons>
                    <IonTitle>
                        <h2>Application Form</h2>
                    </IonTitle>
                </IonToolbar>


                <IonItem>
                    <IonLabel position="stacked">Full Name*</IonLabel>
                    <IonInput value={name} onIonChange={(e) => setName(e.detail.value!)} />
                </IonItem>

                <IonItem>
                    <IonLabel position="stacked">Date of Birth*</IonLabel>
                    <IonInput type="date" value={dob} onIonChange={(e) => setDob(e.detail.value!)} />
                </IonItem>

                <IonItem className="select-item">
                    <IonLabel position="stacked" className="select-label">Sex*</IonLabel>
                    <IonSelect
                        value={sex}
                        onIonChange={(e) => setSex(e.detail.value!)}
                        placeholder="Select Sex"
                        className="select-input"
                    >
                        <IonSelectOption value="Male">Male</IonSelectOption>
                        <IonSelectOption value="Female">Female</IonSelectOption>
                        <IonSelectOption value="Other">Other</IonSelectOption>
                    </IonSelect>
                </IonItem>

                <IonItem>
                    <IonLabel position="stacked">Email*</IonLabel>
                    <IonInput type="email" value={email} onIonChange={(e) => setEmail(e.detail.value!)} />
                </IonItem>

                <IonItem>
                    <IonLabel position="stacked">Phone Number*</IonLabel>
                    <IonInput type="tel" value={phone} onIonInput={(e) => setPhone(e.detail.value!)} />
                </IonItem>

                <IonGrid>
                    <IonRow className="ion-justify-content-between">
                        <IonCol>
                            <IonButton expand="block" color="primary" onClick={handleProceed}>
                                Save
                            </IonButton>
                        </IonCol>
                        <IonCol>

                            <IonButton expand="block" color="secondary" onClick={() => goToDocUpload()}>
                                Next Step
                            </IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>

                <IonLoading
                    isOpen={loading}
                    message={'Please wait...'}
                    spinner="crescent"
                />

            </IonContent>


        </IonPage>
    )
}
export default Enquiry;