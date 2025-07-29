// src/pages/LoginPage.tsx
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
} from '@ionic/react';
import { useAuth } from '../auth/AuthContext';
import { login } from '../api';
import { useHistory } from 'react-router';


const LoginPage: React.FC = () => {
  const history = useHistory();
  const { loginWithToken } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [toast, setToast] = useState<{ open: boolean; msg: string }>({ open: false, msg: '' });
  const passRef = useRef<HTMLIonInputElement | null>(null);

  const onSubmit = async () => {
    const passwordValue = passRef.current?.value as string;
    try {
      const { data } = await login(email, password);
      loginWithToken(data.token);
      localStorage.setItem('email', email); // Store email for future use
      setToast({ open: true, msg: 'Logged in!' });
      history.push('/home');
    } catch (e: any) {
      setToast({ open: true, msg: e?.response?.data?.message || 'Login failed' });
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
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
          Login
        </IonButton>

        <IonButton expand="block" fill="clear" onClick={() => history.push('/signup')}>
          New user? Signup
        </IonButton>

        <IonToast
          isOpen={toast.open}
          message={toast.msg}
          duration={2000}
          onDidDismiss={() => setToast({ open: false, msg: '' })}
        />
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
