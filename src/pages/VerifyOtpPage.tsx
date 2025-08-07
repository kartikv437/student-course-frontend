import React, { useEffect, useRef, useState } from 'react';
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
  IonList,
  IonLoading,
} from '@ionic/react';
import { useHistory } from 'react-router';
import { useAuth } from '../auth/AuthContext';
import { resendOtp, verifyOtp } from '../api';
import { useToast } from '../context/ToastContext';

const VerifyOtpPage: React.FC = () => {
  const history = useHistory();
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const { showToast } = useToast();
  const otpRef = useRef<HTMLIonInputElement | null>(null);
  const { loginWithToken } = useAuth();

  const email = localStorage.getItem("email");

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (cooldown > 0) {
      timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [cooldown]);

  const onSubmit = async () => {
    const otpValue = otpRef.current?.value as string;
    setLoading(true);
    try {
      const res = await verifyOtp(otpValue);
      if (res.status === 200) {
        setLoading(false);
        loginWithToken(res.data.result.accessToken);
        showToast(res.data.message, "success")
        history.replace('/home');
      } else {
        setLoading(false);
        showToast(res.data.message, "danger");
      }
    } catch (e: any) {
      setLoading(false);
      showToast(e?.response?.data?.message || 'OTP verification failed', "danger");
    }
  };

  const handleResendOtp = async () => {
    if (!email) {
      showToast('Email not found in localStorage', 'danger');
      return;
    }

    setLoading(true);
    try {
      const res = await resendOtp(email);
      setLoading(false);
      setCooldown(60);
      showToast(res.data?.message || 'OTP resent successfully', 'success');
    } catch (e: any) {
      setLoading(false);
      showToast(e?.response?.data?.message || 'Failed to resend OTP', 'danger');
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
            <IonInput style={{ marginTop: '5px' }}
              type="email"
              disabled
              value={email}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">OTP</IonLabel>
            <IonInput style={{ marginTop: '5px' }}
              type="text"
              value={otp}
              ref={otpRef}
              onIonChange={(e) => setOtp(e.detail.value!.trim())}
            />
          </IonItem>
        </IonList>

        <IonButton color="secondary" expand="full" fill="solid" size="small" shape="round" onClick={onSubmit} className="ion-margin-top">
          Verify
        </IonButton>

        <IonButton
          expand="block"
          fill="outline"
          onClick={handleResendOtp}
          disabled={cooldown > 0}
        >
          {cooldown > 0 ? `Resend OTP (${cooldown}s)` : 'Resend OTP'}
        </IonButton>

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
