import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
} from "@ionic/react";

interface CourseCardProps {
  id: string;
  title: string;
  overview?: string;
  curriculum?: string;
  duration: string;
  fee: string;
  eligibility: string;
  onEnroll: (id: string) => void;
}

const CourseCard: React.FC<CourseCardProps> = ({
  id,
  title,
  duration,
  fee,
  eligibility,
  onEnroll,
}) => {
  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>{title}</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <p><strong>Duration:</strong> {duration}</p>
        <p><strong>Fee:</strong> {fee}</p>
        <p><strong>Eligibility:</strong> {eligibility}</p>
        <IonButton expand="block" onClick={() => onEnroll(id)}>
          Enroll Now
        </IonButton>
      </IonCardContent>
    </IonCard>
  );
};

export default CourseCard;
