import { IonPage, IonContent, IonGrid, IonList, IonItem, IonLabel, IonBackButton, IonButtons, IonTitle, IonToolbar, IonInput, IonButton } from "@ionic/react";
import Header from "../../components/Header";
import { useEffect, useRef, useState } from "react";
import './ApplicationForm.css';
import { useHistory } from "react-router";

const ApplicationForm: React.FC = () => {
    const [acadamic, setAcadamic] = useState<{ [key: string]: File | null }>({
        tenth: null,
        twelfth: null,
        degree: null,
    });
    const [passportDoc, setpassportDoc] = useState<{ [key: string]: File | null }>({
        tenth: null,
        twelfth: null,
        degree: null,
    });
    const history = useHistory();

    const [completedSteps, setCompletedSteps] = useState(0);
    const [submittedSections, setSubmittedSections] = useState<{ [key: string]: boolean }>({});

    const handleAcadamicFileChange = (e: React.ChangeEvent<HTMLInputElement>, docType: string) => {
        if (e.target.files && e.target.files[0]) {
            setAcadamic({ ...acadamic, [docType]: e.target.files[0] });
        }
    };

    const handlePassportChange = (e: React.ChangeEvent<HTMLInputElement>, docType: string) => {
        if (e.target.files && e.target.files[0]) {
            setpassportDoc({ ...passportDoc, [docType]: e.target.files[0] });
        }
    }

    const submitForm = (section: string) => {
        if (!submittedSections[section]) {
            setCompletedSteps((prev) => prev + 1);
            setSubmittedSections((prev) => ({ ...prev, [section]: true }));
        }
        if (section === 'documents') {
            history.push('/home/conditional-offer-letter');
        }
    };

    const gotoVerifyOfferLetter = () => {
        history.push('/home/conditional-offer-letter');
    }

    return (
        <IonPage>
            <Header />
            {/* ✅ Progress Bar */}
            <div className="progress-container">
                <div className="progress-bar">
                    <div
                        className="progress-bar-fill"
                        style={{ width: `${(completedSteps / 4) * 100}%` }}
                    ></div>
                </div>
            </div>
            <IonContent fullscreen className="ion-padding top-handling">
                <IonToolbar color="light" className="upload-header">
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/home/homePage" />
                    </IonButtons>
                    <IonTitle className="upload-title">
                        <h2>How to Apply</h2>
                    </IonTitle>
                </IonToolbar>

                <IonList>
                    <IonItem>
                        <IonLabel>
                            <h2>
                                Step 1: Conditional Offer Letter (COL) Requirements</h2>
                            <p>
                                To receive a Conditional Offer Letter, applicants must submit the following:</p>
                            <ul>
                                <li>Completed Application Form</li>
                                <li>Copy of Passport</li>
                                <li>Proof of English Level</li>
                            </ul>
                        </IonLabel>
                    </IonItem>

                    <IonItem>
                        <IonLabel>
                            <h2>Step 2: Pre-Interview Requirements</h2>
                            <p>Before the admission interview, applicants must provide:</p>
                            <ul>
                                <li>Updated CV</li>
                                <li>Motivation Letter</li>
                                <li>Proof of Financial Means</li>
                            </ul>
                        </IonLabel>
                    </IonItem>

                    <IonItem>
                        <IonLabel>
                            <h2>Step 3: Unconditional Offer Letter (UCOL) Requirements</h2>
                            <ul>
                                <li>Signed Enrollment Agreement</li>
                                <li>Official Transcripts / Degree</li>
                                <li>Proof of English Proficiency</li>
                            </ul>
                        </IonLabel>
                    </IonItem>

                    <IonItem>
                        <IonLabel>
                            <h2>Step 4: “Ready to Start” Status Requirements</h2>
                            <p>Final requirements to be considered “Ready to Start”:</p>
                            <ul>
                                <li>First Tuition Fee Payment</li>
                                <li>Accommodation Confirmation</li>
                                <li>Visa Confirmation (if applicable)</li>
                            </ul>
                        </IonLabel>
                    </IonItem>

                    <IonItem>
                        <IonLabel>
                            <h2>Step 5: Congratulations!</h2>
                            <p>Welcome to the Schiller community!</p>
                        </IonLabel>
                    </IonItem>
                </IonList>

                <IonGrid>
                    <IonTitle>
                        <h3>Step 1 : Application Form</h3>
                    </IonTitle>
                    <IonItem className="input-item">
                        <IonLabel position="stacked">Full Name*</IonLabel>
                        <IonInput className="custom-input" />
                    </IonItem>
                    <IonItem className="input-item">
                        <IonLabel position="stacked">Contact Number*</IonLabel>
                        <IonInput className="custom-input" />
                    </IonItem>
                    <IonItem className="input-item">
                        <IonLabel position="stacked">Course*</IonLabel>
                        <IonInput className="custom-input" />
                    </IonItem>
                    <IonItem className="input-item">
                        <IonLabel position="stacked">Address*</IonLabel>
                        <IonInput className="custom-input" />
                    </IonItem>
                    <IonButton onClick={() => submitForm('application')}>Submit</IonButton>
                </IonGrid>

                <IonGrid>
                    <IonTitle>
                        <h3>Acadamic Information</h3>
                    </IonTitle>
                    <IonList className="upload-form">
                        {[
                            { label: '10th Marksheet', key: 'tenth' },
                            { label: '12th Marksheet', key: 'twelfth' },
                            { label: 'Degree Certificate', key: 'degree' },
                        ].map((doc) => (
                            <IonItem key={doc.key} className="upload-item">
                                <div className="upload-item-row">
                                    <div className="file-upload-wrapper">
                                        <IonLabel position="stacked" className="label">
                                            {doc.label}
                                        </IonLabel>
                                        <div className="file-upload">
                                            <label className="custom-file-upload">
                                                <input
                                                    type="file"
                                                    accept=".pdf,.jpg,.jpeg,.png"
                                                    onChange={(e) => handleAcadamicFileChange(e, doc.key)}
                                                />
                                                Choose File
                                            </label>
                                        </div>
                                    </div>
                                    <div className="uploaded-file-preview-wrapper">
                                        {
                                            acadamic[doc.key] && acadamic[doc.key] instanceof Blob ? (
                                                <a href={URL.createObjectURL(acadamic[doc.key]!)} download target="_blank" rel="noopener noreferrer">
                                                    {acadamic[doc.key]?.name}
                                                </a>
                                            ) : null
                                        }
                                    </div>
                                </div>

                            </IonItem>
                        ))}
                    </IonList>
                    <IonButton onClick={() => submitForm('academic')}>Submit</IonButton>
                </IonGrid>

                <IonGrid>
                    <IonTitle>
                        <h3>Passport Details</h3>
                    </IonTitle>
                    <IonItem>
                        <IonLabel position="stacked">Passport Number*</IonLabel>
                        <IonInput />
                    </IonItem>
                    <IonButton onClick={() => submitForm('passport')}>Submit</IonButton>
                </IonGrid>

                <IonGrid>
                    <IonTitle>
                        <h3>Required Documents</h3>
                    </IonTitle>

                    <IonList className="upload-form">
                        {[
                            { label: 'Aadhar Card', key: 'aadhar' },
                            { label: 'Pan Card', key: 'pancard' },
                            { label: 'Passport Photo', key: 'photo' },
                        ].map((doc) => (
                            <IonItem key={doc.key} className="upload-item">
                                <div className="upload-item-row">
                                    <div className="file-upload-wrapper">
                                        <IonLabel position="stacked" className="label">
                                            {doc.label}
                                        </IonLabel>
                                        <div className="file-upload">
                                            <label className="custom-file-upload">
                                                <input
                                                    type="file"
                                                    accept=".pdf,.jpg,.jpeg,.png"
                                                    onChange={(e) => handlePassportChange(e, doc.key)}
                                                />
                                                Choose File
                                            </label>
                                        </div>
                                    </div>
                                    <div className="uploaded-file-preview-wrapper">
                                        {
                                            acadamic[doc.key] && acadamic[doc.key] instanceof Blob ? (
                                                <a href={URL.createObjectURL(acadamic[doc.key]!)} download target="_blank" rel="noopener noreferrer">
                                                    {acadamic[doc.key]?.name}
                                                </a>
                                            ) : null
                                        }
                                    </div>
                                </div>

                            </IonItem>
                        ))}
                    </IonList>
                    <IonButton onClick={() => submitForm('documents')}>Submit</IonButton>
                </IonGrid>

                {/* <IonGrid>
                    <IonButton expand="block" onClick={gotoVerifyOfferLetter}>Submit</IonButton>
                </IonGrid> */}

            </IonContent>
        </IonPage>
    )
}

export default ApplicationForm;