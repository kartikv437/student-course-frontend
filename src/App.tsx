import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonRouterOutlet,
  IonSplitPane,
  IonTitle,
  IonToggle,
  IonToolbar,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import HomeTabs from './pages/HomeTabs';
import AdmissionTabs from './pages/AdmissionTabs';
import { useState, useEffect } from 'react';
import SideMenu from './components/SideMenu';
import SignupPage from './pages/SignupPage';
import VerifyOtpPage from './pages/VerifyOtpPage';
import LoginPage from './pages/LoginPage';

setupIonicReact();

const App: React.FC = () => {

  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = (e: CustomEvent) => {
    setIsDarkMode(e.detail.checked);
  };

  useEffect(() => {
    document.body.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main-content">
          <SideMenu isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
          <IonRouterOutlet id="main-content">

            {/* With Login */}

            <Route path="/" component={SignupPage} />
            <Route path="/signup" component={SignupPage} />
            <Route path="/verify-otp" component={VerifyOtpPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/home" component={HomeTabs} />
            <Route path="/admission" component={AdmissionTabs} />
            <Redirect exact from="/" to="/signup" />

            {/* Without Login */}

            {/* <Route path="/home" component={HomeTabs} />
            <Route path="/admission" component={AdmissionTabs} />
            <Redirect exact from="/" to="/home/homePage" /> */}

          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
}
export default App;


