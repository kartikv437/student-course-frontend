import { IonCard, IonContent, IonGrid, IonPage, IonRow, IonCol, IonText, IonRouterLink, IonRefresherContent, IonRefresher } from "@ionic/react";
import Header from "../../components/Header";
import News from "./News";
import "./HomePage.css"

const HomePage: React.FC = () => {
  return (
    <IonPage>
      <Header />
      <IonContent fullscreen className="ion-padding">
        <IonRefresher slot="fixed" onIonRefresh={(e) => e.detail.complete()} >
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        {/* Banner Section */}
        <section>
          <img
            src="/studentBanner.jpg"
            alt="Student Banner"
            style={{ width: "100%", borderRadius: "10px" }}
          />
        </section>

        <section>
          <IonGrid>
            <IonRow>
              <IonCol size="12">
                <IonCard className="ion-text-center">
                  <IonRouterLink routerLink="/home/about-us">
                    <div className="image-container">
                      <img src="/ask-nexus.jpeg" alt="Background" className="background-image" />
                      <IonText className="overlay-text">
                        <span style={{ color: "white", fontSize: "20px" }}>About Us</span>
                      </IonText>
                    </div>
                  </IonRouterLink>
                </IonCard>
              </IonCol>
              <IonCol size="12">
                <IonCard className="ion-text-center" >
                  <IonRouterLink routerLink="/home/programs">
                    <div className="image-container">
                      <img src="/ask-nexus.jpeg" alt="Background" className="background-image" />
                      <IonText className="overlay-text">
                        <span style={{ color: "white", fontSize: "20px" }}>Programs</span>
                      </IonText>
                    </div>
                  </IonRouterLink>
                </IonCard>
              </IonCol>
              <IonCol size="12">
                <IonCard className="ion-text-center">
                  <IonRouterLink routerLink="/home/applicationForm">
                    <div className="image-container">
                      <img src="/ask-nexus.jpeg" alt="Background" className="background-image" />
                      <IonText className="overlay-text">
                        <span style={{ color: "white", fontSize: "20px" }}>Application Form</span>
                      </IonText>
                    </div>
                  </IonRouterLink>
                </IonCard>
              </IonCol>
              <IonCol size="12">
                <IonCard className="ion-text-center">
                  <IonRouterLink routerLink="/home/contact-us">
                    <div className="image-container">
                      <img src="/ask-nexus.jpeg" alt="Background" className="background-image" />
                      <IonText className="overlay-text">
                        <span style={{ color: "white", fontSize: "20px" }}>Contact Us</span>
                      </IonText>
                    </div>
                  </IonRouterLink>
                </IonCard>
              </IonCol>
            </IonRow>
          </IonGrid>
        </section >

        {/* <section>
          <h3>Move Between Schiller’s Four International Campuses</h3>
          <p>
            As the 1st American multi-campus university in Europe, our innovative intercampus mobility program allows you to move between any of Schiller’s campuses after Year 1.
          </p>
          <ul>
            <li>
              <strong>Madrid</strong> – Immerse yourself in Spanish culture while studying in one of Europe’s most vibrant capitals.
            </li>
            <li>
              <strong>Heidelberg</strong> – Europe’s oldest university town and renowned for its forward-thinking focus on sustainability and technology.
            </li>
            <li>
              <strong>Florida</strong> – Known for its booming tech scene and year-round sunshine, Florida is a hub for start-up culture and global business.
            </li>
            <li>
              <strong>Paris</strong> – The world’s most influential city for art, culture, and commerce, Paris connects you to exceptional networking opportunities.
            </li>
          </ul>
          <p>
            We have simplified the process to make intercampus mobility easy and flexible. Explore the world while earning your degree!
          </p>
        </section> */}

        {/* News Section */}
        <section>
          <News />
        </section>

      </IonContent >
    </IonPage >
  );
}

export default HomePage;
