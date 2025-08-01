import { IonPage, IonContent, IonToolbar, IonButtons, IonBackButton, IonTitle, IonItem, IonLabel, IonInput, IonGrid, IonRow, IonCol, IonButton, IonSelect, IonSelectOption, IonToast, IonLoading } from "@ionic/react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Header from "../../components/Header";
import { useToast } from "../../context/ToastContext";
import { submitApplication } from "../../api";
import { getUserApplication } from "../../api";
import { updateApplication } from "../../api";

const Enquiry: React.FC = () => {
    const [fullName, setFullName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [gender, setGender] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [loading, setLoading] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const history = useHistory();
    const { showToast } = useToast();

    const handleProceed = async () => {
        if (!fullName || !dateOfBirth || !gender || !phoneNumber) {
            showToast("Please fill all Mandatory fields.", "danger");
            return;
        }
        const formData = {
            fullName,
            dateOfBirth,
            gender,
            phoneNumber,
        };
        setLoading(true);
        try {
            let res;
            if (isUpdate) {
                res = await updateApplication(formData); // PUT
            } else {
                res = await submitApplication(formData); // POST
            }

            if (res.status === 200) {
                setLoading(false);
                setSaveSuccess(true);
                showToast(res.data.message, "success");
            } else {
                setLoading(false);
                showToast(res.data.message, "danger");
            }
        } catch (error) {
            showToast("Error submitting application", "danger");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchApplication = async () => {
            setLoading(true);
            try {
                const response = await getUserApplication();
                setFullName(response.data.fullName);
                setDateOfBirth(response.data.dateOfBirth.slice(0, 10));
                setGender(response.data.gender);
                setPhoneNumber(response.data.phoneNumber);
                setIsUpdate(true);
                setSaveSuccess(true);
            } catch (err: any) {
                showToast(err?.response?.data?.message || 'Failed to load application');
                setIsUpdate(false);
            } finally {
                setLoading(false);
            }
        };
        fetchApplication();
    }, [])

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
                    <IonInput value={fullName} onIonChange={(e) => setFullName(e.detail.value!)} />
                </IonItem>

                <IonItem>
                    <IonLabel position="stacked">Date of Birth*</IonLabel>
                    <IonInput type="date" value={dateOfBirth} onIonChange={(e) => setDateOfBirth(e.detail.value!)} />
                </IonItem>

                <IonItem className="select-item">
                    <IonLabel position="stacked" className="select-label">Gender*</IonLabel>
                    <IonSelect
                        value={gender}
                        onIonChange={(e) => setGender(e.detail.value!)}
                        placeholder="Select Sex"
                        className="select-input"
                    >
                        <IonSelectOption value="Male">Male</IonSelectOption>
                        <IonSelectOption value="Female">Female</IonSelectOption>
                        <IonSelectOption value="Other">Other</IonSelectOption>
                    </IonSelect>
                </IonItem>

                <IonItem>
                    <IonLabel position="stacked">Phone Number*</IonLabel>
                    <IonInput type="tel" value={phoneNumber} onIonInput={(e) => setPhoneNumber(e.detail.value!)} />
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