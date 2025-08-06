import { IonPage, IonContent, IonToolbar, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCard, IonCardContent, IonSegment, IonSegmentButton, IonLabel, IonAccordionGroup, IonAccordion, IonItem, IonGrid, IonRow, IonCol, IonButtons, IonBackButton, IonTitle } from "@ionic/react";
import Header from "../../components/Header";
import './AboutUs.css';
const AboutUs: React.FC = () => {
    return (
        <IonPage>
            <Header />
            <IonContent fullscreen className="ion-padding">
                <IonToolbar color="light" className="upload-header">
                    <IonButtons slot="start">
                        <IonBackButton  defaultHref="/home/homePage" />
                    </IonButtons>
                    <IonTitle className="upload-title">
                        <h2>About Us</h2>
                    </IonTitle>
                </IonToolbar>
                <IonCardHeader className="page_banner">
                    <img src="/about_us_banner.jpg" alt="Graduates" />
                    <IonCardTitle className="banner_title">About Schiller International University</IonCardTitle>
                    <IonCardSubtitle className="banner_subtitle">Learn about Schiller’s multinational student body, international
                        campuses, and vibrant student life.</IonCardSubtitle>
                </IonCardHeader>

                <IonCard>
                    <IonCardContent>
                        <IonSegment value="about">
                            <IonSegmentButton className="segment-button" value="about">
                                <IonLabel className="label-text">About Us</IonLabel>
                            </IonSegmentButton>
                        </IonSegment>

                        <IonAccordionGroup>
                            <IonAccordion className="accordion-section" value="global">
                                <IonItem slot="header" className="acc_label">
                                    <IonLabel className="label-text">A Global Community</IonLabel>
                                </IonItem>
                                <div className="ion-padding" slot="content">
                                    We are a global community of thinkers, professionals, and global citizens... (insert content)
                                </div>
                            </IonAccordion>

                            <IonAccordion className="accordion-section" value="experience">
                                <IonItem slot="header" className="acc_label">
                                    <IonLabel className="label-text">An International Experience</IonLabel>
                                </IonItem>
                                <div className="ion-padding" slot="content">
                                    (insert experience content)
                                </div>
                            </IonAccordion>

                            <IonAccordion className="accordion-section" value="support">
                                <IonItem slot="header" className="acc_label">
                                    <IonLabel className="label-text">Personalized Support</IonLabel>
                                </IonItem>
                                <div className="ion-padding" slot="content">
                                    (insert support content)
                                </div>
                            </IonAccordion>

                            <IonAccordion className="accordion-section" value="belonging">
                                <IonItem slot="header" className="acc_label">
                                    <IonLabel className="label-text">Belonging & Inclusion</IonLabel>
                                </IonItem>
                                <div className="ion-padding" slot="content">
                                    (insert belonging content)
                                </div>
                            </IonAccordion>
                        </IonAccordionGroup>
                    </IonCardContent>
                </IonCard>

                <IonCard className="numbers-card">
                    <IonCardHeader>
                        <IonCardTitle className="card_title">Schiller by the numbers</IonCardTitle>
                    </IonCardHeader>
                    <IonGrid className="schiller-numbers">
                        <IonRow>
                            <IonCol>
                                <h3 className="count">+20K</h3>
                                <p>Alumni</p>
                            </IonCol>
                            <IonCol>
                                <h3 className="count">+130</h3>
                                <p>Nationalities</p>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <h3 className="count">60</h3>
                                <p>Years of Experience</p>
                            </IonCol>
                            <IonCol>
                                <h3 className="count">4</h3>
                                <p>International Campuses</p>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonCard>

                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle className="card_title">Our Global Presence</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <IonAccordionGroup>
                            <IonAccordion className="accordion-section" value="campuses">
                                <IonItem slot="header" className="acc_label">
                                    <IonLabel className="label-text">4 Campuses</IonLabel>
                                </IonItem>
                                <div className="ion-padding" slot="content">
                                    Heidelberg, Madrid, Paris, and Tampa – (insert detailed description)
                                </div>
                            </IonAccordion>

                            <IonAccordion className="accordion-section" value="curriculum">
                                <IonItem slot="header" className="acc_label">
                                    <IonLabel className="label-text">US Curriculum</IonLabel>
                                </IonItem>
                                <div className="ion-padding" slot="content">
                                    (insert curriculum content)
                                </div>
                            </IonAccordion>

                            <IonAccordion className="accordion-section" value="learning">
                                <IonItem slot="header" className="acc_label">
                                    <IonLabel className="label-text">Immersive Learning</IonLabel>
                                </IonItem>
                                <div className="ion-padding" slot="content">
                                    (insert immersive content)
                                </div>
                            </IonAccordion>

                            <IonAccordion className="accordion-section" value="dual">
                                <IonItem slot="header" className="acc_label">
                                    <IonLabel className="label-text">Dual Degrees</IonLabel>
                                </IonItem>
                                <div className="ion-padding" slot="content">
                                    (insert dual degree content)
                                </div>
                            </IonAccordion>
                        </IonAccordionGroup>
                    </IonCardContent>
                </IonCard>
            </IonContent>
        </IonPage>
    );
}

export default AboutUs;