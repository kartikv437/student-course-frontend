// src/pages/SignupPage.tsx
import React, { useRef, useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonInput,
  IonButton,
  IonItem,
  IonLabel,
  IonToast,
  IonList,
  IonLoading,
} from '@ionic/react';
import { signup } from '../api';
import { useHistory } from 'react-router';
import { useToast } from '../context/ToastContext';

const SignupPage: React.FC = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ open: boolean; msg: string }>({ open: false, msg: '' });
  const { showToast } = useToast();
  const passRef = useRef<HTMLIonInputElement | null>(null);

  const onSubmit = async () => {
    const passwordValue = passRef.current?.value as string;
    setLoading(true);
    try {
      const res = await signup(email, passwordValue);
      if (res.status === 200) {
        setLoading(false);
        // setToast({ open: true, msg: 'OTP sent to your email' });
        showToast(res.data.message, "success")
        localStorage.setItem('email', email); // Store email for OTP verification
        history.push('/verify-otp', { state: { email } });
      } else {
        setLoading(false);
        showToast(res.data.message, "danger");
      }
    } catch (e: any) {
      setLoading(false);
      // setToast({ open: true, msg: e?.response?.data?.message || 'Signup failed' });
      showToast(e?.response?.data?.message || 'SignUp failed', "danger")
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Signup</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          <IonItem>
            <IonLabel position="stacked">Email</IonLabel>
            <IonInput
              type="email"
              value={email}
              onIonChange={(e) => setEmail(e.detail.value!)}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Password</IonLabel>
            <IonInput
              type="password"
              value={password}
              ref={passRef}
              onIonChange={(e) => setPassword(e.detail.value!)}
            />
          </IonItem>
        </IonList>

        <IonButton expand="block" onClick={onSubmit} className="ion-margin-top">
          Sign up
        </IonButton>

        <IonButton expand="block" fill="clear" onClick={() => history.push('/login')}>
          Already have an account? Login
        </IonButton>

        {/* <IonToast
          isOpen={toast.open}
          message={toast.msg}
          duration={2000}
          onDidDismiss={() => setToast({ open: false, msg: '' })}
        /> */}
        <IonLoading
          isOpen={loading}
          message={'Please wait...'}
          spinner="crescent"
        />
      </IonContent>
    </IonPage>
  );
};

export default SignupPage;
