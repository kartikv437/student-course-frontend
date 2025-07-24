import React, { useState } from 'react';
import { IonList, IonItem, IonLabel, IonIcon, IonContent, IonPage } from '@ionic/react';
import { chevronDown, chevronForward, create, list } from 'ionicons/icons';
import { useHistory } from 'react-router';
import './Courses.css';
import CourseCard from './CourseCard';
import Header from '../../components/Header';
// import CourseCard from './CourseCard';

const CoursesList: React.FC<{}> = () => {
  const [openSection, setOpenSection] = useState<string | null>("bachelor");
  const history = useHistory();
  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const handleEnrollClick = (course: any) => {
    // history.push(`/course/${course.id}`, course);
  };

  const bachelorCourses = [
    {
      id: "bsc-cs",
      title: "Bachelor of Science in Computer Science",
      overview: "A comprehensive program covering computer science fundamentals.",
      curriculum: "Data Structures, Algorithms, Operating Systems, Database Management",
      duration: "4 years",
      fee: "$10,000",
      eligibility: "High School Diploma or equivalent"
    },
    {
      id: "ba-bus",
      title: "Bachelor of Arts in Business Administration",
      overview: "An interdisciplinary program focusing on business principles and practices.",
      curriculum: "Marketing, Finance, Management, Business Law",
      duration: "4 years",
      fee: "$12,000",
      eligibility: "High School Diploma or equivalent"
    },
    {
      id: "beng-civil",
      title: "Bachelor of Engineering in Civil Engineering",
      overview: "A program designed to equip students with engineering skills for infrastructure projects.",
      curriculum: "Structural Analysis, Fluid Mechanics, Geotechnical Engineering, Transportation Engineering",
      duration: "4 years",
      fee: "$15,000",
      eligibility: "High School Diploma or equivalent"
    },
    {
      id: "ba-psy",
      title: "Bachelor of Arts in Psychology",
      overview: "An exploration of human behavior and mental processes.",
      curriculum: "Cognitive Psychology, Developmental Psychology, Social Psychology, Research Methods",
      duration: "4 years",
      fee: "$11,000",
      eligibility: "High School Diploma or equivalent"
    },
    {
      id: "bsc-it",
      title: "Bachelor of Science in Information Technology",
      overview: "A program focusing on the application of technology in business and society.",
      curriculum: "Network Security, Web Development, Software Engineering, IT Project Management",
      duration: "4 years",
      fee: "$13,000",
      eligibility: "High School Diploma or equivalent"
    }

  ];

  const masterCourses = [
    {
      id: "msc-ds",
      title: "Master of Science in Data Science",
      overview: "An advanced program focusing on data analysis, machine learning, and big data technologies.",
      curriculum: "Statistical Analysis, Machine Learning, Big Data Technologies, Data Visualization",
      duration: "2 years",
      fee: "$25,000",
      eligibility: "Bachelor's Degree in a related field"
    },
    {
      id: "mba",
      title: "Master of Business Administration",
      overview: "A comprehensive program designed to develop leadership and management skills.",
      curriculum: "Leadership, Marketing, Finance, Operations Management",
      duration: "2 years",
      fee: "$30,000",
      eligibility: "Bachelor's Degree in any field"
    },
    {
      id: "mse",
      title: "Master of Engineering in Software Engineering",
      overview: "A specialized program focusing on advanced software development methodologies.",
      curriculum: "Software Architecture, Agile Methodologies, Software Testing, Project Management",
      duration: "2 years",
      fee: "$28,000",
      eligibility: "Bachelor's Degree in Computer Science or related field"
    },
    {
      id: "ma-ir",
      title: "Master of Arts in International Relations",
      overview: "An interdisciplinary program exploring global politics and international affairs.",
      curriculum: "Global Governance, International Law, Conflict Resolution, Foreign Policy Analysis",
      duration: "2 years",
      fee: "$26,000",
      eligibility: "Bachelor's Degree in Political Science or related field"
    },
    {
      id: "msc-cyber",
      title: "Master of Science in Cybersecurity",
      overview: "A program designed to equip students with skills to protect information systems.",
      curriculum: "Network Security, Ethical Hacking, Cyber Threat Intelligence, Incident Response",
      duration: "2 years",
      fee: "$27,000",
      eligibility: "Bachelor's Degree in Information Technology or related field"
    }
  ];

  return (
    <IonPage>
      <Header />
      <IonContent fullscreen className="ion-padding">
        <IonList className="accordion-list">

          <IonItem button onClick={() => toggleSection('bachelor')}>
            <IonLabel><strong>Bachelor Courses</strong></IonLabel>
            <IonIcon slot="end" icon={openSection === 'bachelor' ? chevronDown : chevronForward} />
          </IonItem>
          {openSection === 'bachelor' && (
            <div className="accordion-content">
              {bachelorCourses.map(course => (
                <CourseCard
                  key={course.id}
                  id={course.id}
                  title={course.title}
                  overview={course.overview}
                  curriculum={course.curriculum}
                  duration={course.duration}
                  fee={course.fee}
                  eligibility={course.eligibility}
                  onEnroll={() => handleEnrollClick(course)}
                />
              ))}
            </div>
          )}

          <IonItem button onClick={() => toggleSection('master')}>
            <IonLabel><strong>Master Courses</strong></IonLabel>
            <IonIcon slot="end" icon={openSection === 'master' ? chevronDown : chevronForward} />
          </IonItem>
          {openSection === 'master' && (
            <div className="accordion-content">
              {masterCourses.map(course => (
                <CourseCard
                  key={course.id}
                  id={course.id}
                  title={course.title}
                  overview={course.overview}
                  curriculum={course.curriculum}
                  duration={course.duration}
                  fee={course.fee}
                  eligibility={course.eligibility}
                  onEnroll={() => handleEnrollClick(course)}
                />
              ))}
            </div>
          )}

        </IonList>
      </IonContent>
    </IonPage>

  );
};

export default CoursesList;
