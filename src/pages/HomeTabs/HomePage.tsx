import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonPage } from "@ionic/react";
import Header from "../../components/Header";
import News from "./News";


const HomePage: React.FC = () => {
  return (
    <IonPage>
      <Header />
      <IonContent fullscreen className="ion-padding">

        {/* Banner Section */}
        <section>
          <img
            src="/studentBanner.jpg"
            alt="Student Banner"
            style={{ width: "100%", borderRadius: "10px" }}
          />
        </section>

        <section>
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
        </section>

        {/* News Section */}
        <section>
          <News />
        </section>

      </IonContent>
    </IonPage>
  );
}

export default HomePage;
