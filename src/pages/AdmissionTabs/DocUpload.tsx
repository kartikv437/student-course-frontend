import React, { useEffect, useState } from 'react';
import './DocUpload.css';
import { IonBackButton, IonButton, IonButtons, IonCol, IonContent, IonGrid, IonIcon, IonImg, IonItem, IonLabel, IonList, IonLoading, IonPage, IonRow, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { useHistory } from 'react-router';
import Header from '../../components/Header';
import { useToast } from '../../context/ToastContext';
import { uploadDocuments } from '../../api';
import { getUserDocuments } from '../../api';
import { updateDocuments } from '../../api';
const DocUpload: React.FC = (name) => {
    const { showToast } = useToast();
    const [loading, setLoading] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [file, setFile] = useState<{ [key: string]: File | null }>({
        aadhar: null,
        tenth: null,
        twelfth: null,
        degree: null,
        photo: null,
    });

    const history = useHistory();
    const [url, setUrl] = useState<{ [key: string]: string | null }>({
        aadhar: null,
        tenth: null,
        twelfth: null,
        degree: null,
        photo: null,
    });

    const [documents, setDocuments] = useState<{
        [key: string]: {
            file: File | null;
            url: string | null;
        };
    }>({
        aadhar: { file: null, url: null },
        tenth: { file: null, url: null },
        twelfth: { file: null, url: null },
        degree: { file: null, url: null },
        photo: { file: null, url: null },
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, docType: string) => {
        if (e.target.files && e.target.files[0]) {
            setFile({ ...file, [docType]: e.target.files[0] });
            setDocuments(prev => ({
                ...prev,
                [docType]: {
                    ...prev[docType],
                    file: e.target.files?.[0] || null,
                },
            }));
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
            let response;
            if (isUpdate) {
                response = await updateDocuments(formData); // PUT
            } else {
                response = await uploadDocuments(formData); // POST
            }

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
                setDocuments(prev => ({
                    ...prev,
                    aadhar: {
                        ...prev.aadhar,
                        url: response.data?.aadhar?.fileUrl || null,
                    },
                    tenth: {
                        ...prev.tenth,
                        url: response.data?.tenth?.fileUrl || null,
                    },
                    twelfth: {
                        ...prev.twelfth,
                        url: response.data?.twelfth?.fileUrl || null,
                    },
                    degree: {
                        ...prev.degree,
                        url: response.data?.degree?.fileUrl || null,
                    },
                    photo: {
                        ...prev.photo,
                        url: response.data?.photo?.fileUrl || null,
                    }
                }));

                showToast("Files uploaded successfully", "success");
            }
        } catch (err) {
            setLoading(false);
            
            showToast("File upload failed", "danger");
        }
    };

    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                const response = await getUserDocuments();

                if (response.status === 200) {
                    setIsUpdate(true);
                    setUrl({
                        aadhar: response.data?.aadhar?.fileUrl || null,
                        tenth: response.data?.tenth?.fileUrl || null,
                        twelfth: response.data?.twelfth?.fileUrl || null,
                        degree: response.data?.degree?.fileUrl || null,
                        photo: response.data?.photo?.fileUrl || null
                    });
                    setDocuments(prev => ({
                        ...prev,
                        aadhar: {
                            ...prev.aadhar,
                            url: response.data?.aadhar?.fileUrl || null,
                        },
                        tenth: {
                            ...prev.tenth,
                            url: response.data?.tenth?.fileUrl || null,
                        },
                        twelfth: {
                            ...prev.twelfth,
                            url: response.data?.twelfth?.fileUrl || null,
                        },
                        degree: {
                            ...prev.degree,
                            url: response.data?.degree?.fileUrl || null,
                        },
                        photo: {
                            ...prev.photo,
                            url: response.data?.photo?.fileUrl || null,
                        }
                    }));
                    // setFile({
                    //     aadhar: response.data?.aadhar?.fileUrl || null,
                    //     tenth: response.data?.tenth?.fileUrl || null,
                    //     twelfth: response.data?.twelfth?.fileUrl || null,
                    //     degree: response.data?.degree?.fileUrl || null,
                    //     photo: response.data?.photo?.fileUrl || null
                    // })
                }
            } catch (err) {
                setIsUpdate(false);
                console.error("Upload failed", err);
            }
        }
        fetchDocuments();
    }, []);

    const goToPassport = () => {

        if (Object.values(url).every(fileUrl => fileUrl === null)) {
            showToast("Please upload at least one document", "danger");
            return;
        }
        history.push("/admission/passport");
    };

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
                                                style={{ padding: "8px 0" }}
                                                onChange={(e) => handleFileChange(e, doc.key)}
                                            />
                                            Choose File
                                        </label>
                                    </div>
                                </div>
                                <div className="uploaded-file-preview-wrapper">
                                    {/* {file[doc.key] &&
                                        (
                                            <div className="uploaded-file-preview">
                                                <a
                                                    href={URL.createObjectURL(file[doc.key]!)}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="file-link"
                                                ><IonText color="medium" className="file-name">{file[doc.key]?.name}</IonText></a>
                                            </div>
                                        )} */}
                                    {
                                        file[doc.key] && file[doc.key] instanceof Blob ? (
                                            <a href={URL.createObjectURL(file[doc.key]!)} download target="_blank" rel="noopener noreferrer">
                                                {file[doc.key]?.name}
                                            </a>
                                        ) : url[doc.key] ? (
                                            <a href={url[doc.key]!} target="_blank" rel="noopener noreferrer">
                                                View Uploaded File
                                            </a>
                                        ) : null
                                    }
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
