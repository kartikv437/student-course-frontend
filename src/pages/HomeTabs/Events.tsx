import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonPage, IonContent } from "@ionic/react";
import { useEffect, useRef, useState } from "react";
import "./Events.css"
import Header from "../../components/Header";
const Events: React.FC = () => {
  const events = [
    { title: "Student Orientation", content: "Welcome ceremony on August 1st." },
    { title: "Hackathon 2025", content: "Compete in a 36-hour coding challenge." },
    { title: "Career Fair", content: "Meet top recruiters on campus." },
  ];
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const threshold = 50; // Minimum swipe distance in px
    const deltaX = touchStartX.current - touchEndX.current;

    if (deltaX > threshold && currentIndex < events.length - 1) {
      setCurrentIndex(currentIndex + 1); // Swipe Left → Next
    } else if (deltaX < -threshold && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1); // Swipe Right → Previous
    }
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    console.log('test');

  }, []);

  return (
    <>
      <IonPage>
        <Header />
        <IonContent fullscreen className="ion-padding">
          <h2 style={{ fontSize: "1.2rem", marginBottom: "10px" }}>Upcoming Events</h2>
          <div
            className="event-slider-container"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="event-slider-track"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {events.map((event, index) => (
                <div className="event-slide" key={index}>
                  <IonCard>
                    <IonCardHeader>
                      <IonCardTitle>{event.title}</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>{event.content}</IonCardContent>
                  </IonCard>
                </div>
              ))}
            </div>
          </div>

          <div className="event-dots">
            {events.map((_, index) => (
              <span
                key={index}
                className={`dot ${currentIndex === index ? "active" : ""}`}
                onClick={() => goToSlide(index)}
              ></span>
            ))}
          </div>
        </IonContent>
      </IonPage>

    </>
  );
}

export default Events;
