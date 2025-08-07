import { IonPage, IonContent, IonToolbar, IonButtons, IonBackButton, IonGrid, IonRow, IonCol, IonCard, IonCardContent, IonList, IonTitle } from '@ionic/react';
import Header from '../../components/Header';
import './Masters.css'
const Masters: React.FC = () => {
    const programs: any = [
        { image: '/bachelor-1.jpg', title: 'Bachelor of Science in Computer Science', description: '', degree: 'On-Campus', location: 'Madrid,Paris', duration: '40 months/4 years' },
        { image: '/bachelor-2.jpg', title: 'Bachelor of Science in International Business', description: '', degree: 'On-Campus', location: 'Madrid,Paris', duration: '40 months/4 years' },
        { image: '/bachelor-3.jpg', title: 'Bachelor of Arts in International Relations and Diplomacy', description: '', degree: 'On-Campus', location: 'Madrid,Paris', duration: '40 months/4 years' }
    ]
    return (
        <IonPage>
            <Header />
            <IonContent fullscreen className="ion-padding">
                <IonToolbar color="light" className="main-heading">
                    <IonButtons slot="start">
                        <IonBackButton className="custom-back" defaultHref="/home/programs" />
                    </IonButtons>
                    <IonTitle>
                        <h2 style={{ marginTop: "10px"}}>Masters</h2>
                    </IonTitle>
                </IonToolbar>
                <IonGrid>
                    <IonRow className="program-list">
                        {programs.map((program: any, index: number) => (
                            <IonCol size="12" key={index}>
                                <IonCard className="program-card" style={{marginRight: "0px", marginLeft: "0px"}}>
                                    <img src={program.image} alt={program.title} />
                                    <IonCardContent>
                                        <h2 className="program-title">{program.title}</h2>
                                        <IonList lines="none" className="program-details">
                                            <p className="program-subsection">
                                                <img src="assets/images/format.png" alt="" />
                                                <span className="program-subsection-title">{program.degree}</span>
                                            </p>
                                            <p className="program-subsection">
                                                <img src="assets/images/planet-earth.png" alt="" />
                                                <span className="program-subsection-title">{program.location}</span>
                                            </p>
                                            <p className="program-subsection">
                                                <img src="assets/images/timetable.png" alt="" />
                                                <span className="program-subsection-title">{program.duration}</span>
                                            </p>
                                        </IonList>
                                    </IonCardContent>
                                </IonCard>
                            </IonCol>
                        ))}
                        {/* <ion-col size="12" *ngFor="let program of programs">
                        <ion-card className="program-card">
                            <img [src]="program.image" alt="{{ program.title }}">
                            <ion-card-content>
                                <h2 className="program-title">{{ program.title }}</h2>
                                <ion-list lines="none" className="program-details">
                                    <p className="program-subsection">
                                        <img src="assets/images/format.png" alt="">
                                            <span className="program-subsection-title">{{ program.degree }}</span>
                                    </p>
                                    <p className="program-subsection">
                                        <img src="assets/images/planet-earth.png" alt="">
                                            <span className="program-subsection-title">{{ program.location }}</span>
                                    </p>
                                    <p className="program-subsection">
                                        <img src="assets/images/timetable.png" alt="">
                                            <span className="program-subsection-title">{{ program.duration }}</span>
                                    </p>
                                </ion-list>
                            </ion-card-content>
                        </ion-card>
                    </ion-col> */}
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage >
    );
};

export default Masters;