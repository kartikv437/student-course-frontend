import { IonPage, IonContent, IonHeader, IonToolbar, IonTitle, IonList, IonThumbnail, IonBackButton, IonButtons } from "@ionic/react";
import Header from "../../components/Header";
import './Blogs.css';
const Blogs: React.FC = () => {

    const blogs: any[] = [
        {
            title: 'Discover Women Entrepreneurs',
            date: 'April 10, 2025',
            description: 'Meet and learn from successful women in business and innovation.',
            image: '/event-1.jpg',
            city: 'Dubai',
        },
        {
            title: 'Creating Thinking in Innovation',
            date: 'April 15, 2025',
            description: 'A workshop on unlocking creativity and innovation in teams.',
            image: '/event-2.jpg',
            city: 'Madrid',
        },
        {
            title: 'Global Relations Summit',
            date: 'April 20, 2025',
            description: 'Discussing global policies, diplomacy, and international cooperation.',
            image: '/event-3.jpg',
            city: 'Doha',
        }

    ];

    return (
        <IonPage>
            <Header />
            <IonContent fullscreen className="ion-padding">
                <IonToolbar color="light" className="upload-header">
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/home/homePage" />
                    </IonButtons>
                    <IonTitle className="upload-title">
                        <h2>Blogs</h2>
                    </IonTitle>
                </IonToolbar>
                <IonList className="blog-container">
                    {blogs.map((blog, index) => (
                        <div key={index} className="blog-list">
                            <IonThumbnail slot="start" className="blog-thumbnail">
                                <img src={blog.image} alt="Blog image" className="blog-image" />
                            </IonThumbnail>
                            <div className="blog-info">
                                <h2 className="blog-title">{blog.title}</h2>
                                <div className="blog-details">
                                    <p className="blog-location">
                                        <img src="assets/images/planet-earth.png" alt="" />
                                        {blog.city}
                                    </p>
                                    <p className="blog-location">
                                        <img src="assets/images/timetable.png" alt="" />
                                        {blog.date}
                                    </p>
                                </div>
                                <p>{blog.description}</p>
                            </div>
                        </div>
                    ))}
                </IonList>
            </IonContent>
        </IonPage>
    );
}

export default Blogs;