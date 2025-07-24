import { IonCard, IonCardHeader, IonCardTitle, IonCardContent } from "@ionic/react";
import { useEffect, useRef, useState } from "react";
import "./News.css";

const News: React.FC = () => {
    const newsItems = [
        {
            title: "Orientation 2025 Announced",
            content: "Our new orientation schedule is now available for all new students.",
        },
        {
            title: "Library Renovation Completed",
            content: "Explore the new digital section in our upgraded library.",
        },
        {
            title: "Scholarship Applications Open",
            content: "Apply now for the 2025 academic merit scholarships.",
        },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const slideRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) =>
                prev === newsItems.length - 1 ? 0 : prev + 1
            );
        }, 2000);

        return () => clearInterval(interval);
    }, [newsItems.length]);

    return (
        <>
            <h2 style={{ fontSize: "1.2rem", marginBottom: "10px" }}>Campus News</h2>
            <div className="slider-container">
                <div
                    className="slider-track"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                    ref={slideRef}
                >
                    {newsItems.map((news, index) => (
                        <div className="slide" key={index}>
                            <IonCard>
                                <IonCardHeader>
                                    <IonCardTitle>{news.title}</IonCardTitle>
                                </IonCardHeader>
                                <IonCardContent>{news.content}</IonCardContent>
                            </IonCard>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default News;
