import React, { useState, useEffect } from 'react';
import { IonPage, IonContent, IonInput, IonButton, IonItem, IonLabel, IonList } from '@ionic/react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3001'); // Update if using remote backend

const Chat: React.FC = () => {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState<string[]>([]);

  useEffect(() => {
    // socket.emit('join', userId);
    socket.on('receive_message', (data) => {
      setChat((prev) => [...prev, `Friend: ${data}`]);
    });

    return () => {
      socket.off('receive_message');
    };
  }, []);

  const sendMessage = () => {
    if (message.trim() !== '') {
      socket.emit('send_message', message);
      setChat((prev) => [...prev, `You: ${message}`]);
      setMessage('');
    }
  };

  return (
    <IonPage>
      <IonContent>
        <IonList>
          {chat.map((msg, idx) => (
            <IonItem key={idx}><IonLabel>{msg}</IonLabel></IonItem>
          ))}
        </IonList>
        <IonItem>
          <IonInput value={message} onIonChange={(e) => setMessage(e.detail.value!)} placeholder="Type a message" />
        </IonItem>
        <IonButton expand="full" onClick={sendMessage}>Send</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Chat;
