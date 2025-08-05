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

    const gotoVerifyOfferLetter = () => {
        history.push('/home/conditional-offer-letter');
    }

    return (
        <IonPage>
            <Header />
            <div className="scroll-progress-bar">
                                {/* {[
                    { step: 1, name: "Application Form" },
                    { step: 2, name: "Academic Info" },
                    { step: 3, name: "Passport Details" },
                    { step: 4, name: "Documents" }
                ].map(({ step, name }) => (
                    <div key={step} className="bar-segment-wrapper">
                        <div className={`bar-segment ${currentStep >= step ? 'active' : ''}`} />
                        <div className="segment-label">{name}</div>
                    </div>
                ))} */}
                {[1, 2, 3, 4].map((step) => (
                    <div
                        key={step}
                        className={`bar-segment ${currentStep >= step ? 'active' : ''}`}
                    />
                ))}
            </div>
            <IonContent fullscreen className="ion-padding">
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

                <IonGrid ref={(el) => {
                    sectionRefs.current[0] = el;
                }} data-step="0">
                    <IonTitle>
                        <h3>Step 1 : Application Form</h3>
                    </IonTitle>
                    <IonItem className="input-item">
                        <IonLabel position="stacked">Full Name*</IonLabel>
                        <IonInput className="custom-input"/>
                    </IonItem>
                    <IonItem className="input-item">
                        <IonLabel position="stacked">Contact Number*</IonLabel>
                        <IonInput className="custom-input"/>
                    </IonItem>
                    <IonItem className="input-item">
                        <IonLabel position="stacked">Course*</IonLabel>
                        <IonInput className="custom-input"/>
                    </IonItem>
                    <IonItem className="input-item">
                        <IonLabel position="stacked">Address*</IonLabel>
                        <IonInput className="custom-input"/>
                    </IonItem>
                </IonGrid>

                <IonGrid ref={(el) => {
                    sectionRefs.current[1] = el;
                }} data-step="1">
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
                </IonGrid>

                <IonGrid ref={(el) => {
                    sectionRefs.current[2] = el;
                }} data-step="2">
                    <IonTitle>
                        <h3>Passport Details</h3>
                    </IonTitle>
                    <IonItem>
                        <IonLabel position="stacked">Passport Number*</IonLabel>
                        <IonInput />
                    </IonItem>
                </IonGrid>

                <IonGrid ref={(el) => {
                    sectionRefs.current[3] = el;
                }} data-step="3">
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
                </IonGrid>

                <IonGrid>
                    <IonButton expand="block" onClick={gotoVerifyOfferLetter}>Submit</IonButton>
                </IonGrid>

            </IonContent>
        </IonPage>
    )
}

export default ApplicationForm;