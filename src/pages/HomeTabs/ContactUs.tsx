import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonIcon, IonItem, IonLabel, IonList, IonPage } from '@ionic/react';
import './ContactUs.css';
import Header from '../../components/Header';
import { callOutline, locationOutline, mailOutline } from 'ionicons/icons';
const ContactUs: React.FC = () => {
    return (
        <IonPage>
            <Header />
            <IonContent fullscreen className="ion-padding">
                <IonCard className="talk-section">
                    <IonCardHeader>
                        <IonCardTitle>Let's Talk</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <h3>Get in touch with us</h3>
                        <p>
                            GEDU Services Pvt. Ltd. is a world-class shared services center with a team of over
                            300 experts and customised delivery capabilities.
                        </p>

                        <IonList>
                            <IonItem>
                                <IonIcon icon={mailOutline} slot="start"></IonIcon>
                                <IonLabel>Email<br /><small>info&#64;geduservices.com</small></IonLabel>
                            </IonItem>
                            <IonItem>
                                <IonIcon icon={callOutline} slot="start"></IonIcon>
                                <IonLabel>Call Us<br /><small>(0044) 112 365 489</small></IonLabel>
                            </IonItem>
                            <IonItem>
                                <IonIcon icon={locationOutline} slot="start"></IonIcon>
                                <IonLabel>
                                    Head Office<br />
                                    <small>891 Greenford Rd, Greenford UB6 0HE, United Kingdom</small>
                                </IonLabel>
                            </IonItem>
                        </IonList>
                    </IonCardContent>
                </IonCard>

                <iframe src="https://forms.zohopublic.com/caseworker1/form/GeduServicesContactForm/formperma/fqwP5arLTzHSblD3mTNFtn9fNgNeiWDNw15Pzq6JaeA?zf_rszfm=1" aria-label="Gedu Services Contact Form"   style={{border: "none", height: "621px", width: "90%", transition: "0.5s"}}></iframe>
{/* style={{border: "none", height: "621px", width: "90%", transition: "0.5s"}} */}
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.5197453619626!2d77.37188407651783!3d28.614180975674703!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce56093f0de9f%3A0x72b0e13ae1d6f582!2sGEDU%20Services%20Pvt.%20Ltd.!5e0!3m2!1sen!2sin!4v1707209928537!5m2!1sen!2sin" width="100%" height="450" style={{border:0}}  loading="lazy"></iframe>
            </IonContent>
        </IonPage>
    )
}

export default ContactUs;