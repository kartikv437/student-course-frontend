// src/pages/VerifyOtpPage.tsx
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
import { useHistory, useLocation } from 'react-router';
import { useAuth } from '../auth/AuthContext';
import { verifyOtp } from '../api';


type LocationState = { email?: string };

const VerifyOtpPage: React.FC = () => {
  const history = useHistory();
  const { state } = useLocation();
  const emailFromState = (state as LocationState)?.email ?? '';
  const [email, setEmail] = useState(emailFromState);
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ open: boolean; msg: string }>({ open: false, msg: '' });
  const otpRef = useRef<HTMLIonInputElement | null>(null);
  const { loginWithToken } = useAuth();

  const onSubmit = async () => {
    const otpValue = otpRef.current?.value as string;
    setLoading(true);
    try {
      const { data } = await verifyOtp(email, otpValue);
      setLoading(false);
      loginWithToken(data.token);
      setToast({ open: true, msg: 'Verified!' });
      history.replace('/home');
    } catch (e: any) {
      setToast({ open: true, msg: e?.response?.data?.message || 'Verification failed' });
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Verify OTP</IonTitle>
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
            <IonLabel position="stacked">OTP</IonLabel>
            <IonInput
              type="text"
              value={otp}
              ref={otpRef}
              onIonChange={(e) => setOtp(e.detail.value!.trim())}
            />
          </IonItem>
        </IonList>

        <IonButton expand="block" onClick={onSubmit} className="ion-margin-top">
          Verify
        </IonButton>

        <IonToast
          isOpen={toast.open}
          message={toast.msg}
          duration={2000}
          onDidDismiss={() => setToast({ open: false, msg: '' })}
        />
        <IonLoading
          isOpen={loading}
          message={'Please wait...'}
          spinner="crescent"
        />
      </IonContent>
    </IonPage>
  );
};

export default VerifyOtpPage;
