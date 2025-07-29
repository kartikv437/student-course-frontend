import React, { useState } from 'react';
import './DocUpload.css';
import { IonBackButton, IonButton, IonButtons, IonCol, IonContent, IonGrid, IonIcon, IonImg, IonItem, IonLabel, IonList, IonLoading, IonPage, IonRow, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { useHistory } from 'react-router';
import Header from '../../components/Header';
import { useToast } from '../../context/ToastContext';
import { uploadDocuments } from '../../api';

const DocUpload: React.FC = (name) => {
    const { showToast } = useToast();
    const [loading, setLoading] = useState(false);

    const [file, setFile] = useState<{ [key: string]: File | null }>({
        aadhar: null,
        tenth: null,
        twelfth: null,
        degree: null,
        photo: null,
    });

    const history = useHistory();
    const [url, setUrl] = useState<{ [key: string]: File | null }>({
        aadhar: null,
        tenth: null,
        twelfth: null,
        degree: null,
        photo: null,
    });

    // const stripePromise = loadStripe("pk_test_51RjIueFVHBcv9MBM8DUmN7nolHr2TDphpjA6aO6I6WHY815zVvNn8FfihmEdvIRwJ2zTDHOHAdjSw1uUxAk3iMzw00eVxKODP4");

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, docType: string) => {
        if (e.target.files && e.target.files[0]) {
            setFile({ ...file, [docType]: e.target.files[0] });
        }
    };

    const handleSubmit = async () => {
        if (!file) return showToast("Please choose a file", "danger");

        const formData = new FormData();
        Object.entries(file).forEach(([key, value]) => {
            if (value) {
                formData.append(key, value);
            }
        });
        setLoading(true);
        try {
            const response = await uploadDocuments(formData);

            if (response.status === 200) {
                setLoading(false);
                setUrl(
                    {
                        aadhar: response.data && response.data.documents && response.data.documents.aadhar ? response.data.documents.aadhar.fileUrl : null,
                        tenth: response.data && response.data.documents && response.data.documents.tenth ? response.data.documents.tenth.fileUrl : null,
                        twelfth: response.data && response.data.documents && response.data.documents.twelfth ? response.data.documents.twelfth.fileUrl : null,
                        degree: response.data && response.data.documents && response.data.documents.degree ? response.data.documents.degree.fileUrl : null,
                        photo: response.data && response.data.documents && response.data.documents.photo ? response.data.documents.photo.fileUrl : null
                    }
                );

                showToast("Files uploaded successfully", "success");
            }
        } catch (err) {
            setLoading(false);
            console.error("Upload failed", err);
            showToast("File upload failed", "danger");
        }
    };

    const goToPassport = () => {

        if (Object.values(url).every(fileUrl => fileUrl === null)) {
            showToast("Please upload at least one document", "danger");
            return;
        }
        history.push("/admission/passport");
    };

    // const handleStripePayment = async () => {
    //     const stripe = await stripePromise;

    //     const response = await fetch("http://localhost:3001/create-checkout-session", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({
    //             courseTitle: "BCA Program",
    //             price: 4500,
    //         }),
    //     });

    //     const session = await response.json();

    //     const result = await stripe?.redirectToCheckout({
    //         sessionId: session.id,
    //     });

    //     if (result?.error) {
    //         alert(result.error.message);
    //     }
    // };

    return (
        <IonPage>
            <Header />
            <IonContent className="ion-padding">
                <IonToolbar color="light" className="upload-header">
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/" />
                    </IonButtons>
                    <IonTitle className="upload-title">
                        <h2>Upload Documents</h2>
                    </IonTitle>
                </IonToolbar>

                <IonList className="upload-form">
                    {[
                        { label: 'Aadhar Card', key: 'aadhar' },
                        { label: '10th Marksheet', key: 'tenth' },
                        { label: '12th Marksheet', key: 'twelfth' },
                        { label: 'Degree Certificate', key: 'degree' },
                        { label: 'Passport-size Photo', key: 'photo' },
                    ].map((doc) => (
                        <IonItem key={doc.key} className="upload-item">
                            <div className="upload-item-row">
                                <div className="file-upload-wrapper">
                                    <IonLabel position="stacked" className="label">
                                        {doc.label}
                                    </IonLabel>
                                    <div className="file-upload-wrapper">
                                        <label className="custom-file-upload">
                                            <input
                                                type="file"
                                                accept=".pdf,.jpg,.jpeg,.png"
                                                onChange={(e) => handleFileChange(e, doc.key)}
                                            />
                                            Choose File
                                        </label>
                                    </div>
                                </div>
                                <div className="uploaded-file-preview-wrapper">
                                    {file[doc.key] &&
                                        (
                                            <div className="uploaded-file-preview">
                                                <a
                                                    href={URL.createObjectURL(file[doc.key]!)}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="file-link"
                                                ><IonText color="medium" className="file-name">{file[doc.key]?.name}</IonText></a>
                                            </div>
                                        )}
                                </div>
                            </div>

                        </IonItem>
                    ))}
                </IonList>

                <IonGrid>
                    <IonRow className="ion-justify-content-between">
                        <IonCol>
                            <IonButton expand="block" color="primary" onClick={handleSubmit}>
                                Save
                            </IonButton>
                        </IonCol>

                        <IonCol>
                            <IonButton disabled={!url} expand="block" color="secondary" onClick={() => goToPassport()}>
                                Next Step
                            </IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>
                {/* <IonButton expand="block" color="secondary" onClick={handleStripePayment}>
                    Pay Now
                </IonButton> */}
                <IonLoading
                    isOpen={loading}
                    message={'Please wait...'}
                    spinner="crescent"
                />
            </IonContent>

        </IonPage>
    );
};

export default DocUpload;
