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
  IonLoading,
} from '@ionic/react';
import { useAuth } from '../auth/AuthContext';
import { login } from '../api';
import { useHistory } from 'react-router';
import { useToast } from '../context/ToastContext';


const LoginPage: React.FC = () => {
  const history = useHistory();
  const { loginWithToken } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ open: boolean; msg: string }>({ open: false, msg: '' });
  const passRef = useRef<HTMLIonInputElement | null>(null);
  const { showToast } = useToast();

  const onSubmit = async () => {
    const passwordValue = passRef.current?.value as string;
    setLoading(true);
    try {
      const res  = await login(email, passwordValue);

      if (res.status === 200) {
        setLoading(false);
        loginWithToken(res.data.result.accessToken);
        localStorage.setItem('email', email); 
        // setToast({ open: true, msg: 'Logged in!' });
        showToast(res.data.message, "success");
        history.push('/home');
      } else {
        setLoading(false);
        showToast(res.data.message, "danger");
        // setToast({ open: true, msg: 'Login failed' });
      }
    } catch (e: any) {
      setLoading(false);
      showToast(e?.response?.data?.message || 'Login failed', "danger");
      // setToast({ open: true, msg: e?.response?.data?.message || 'Login failed' });
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

export default LoginPage;
