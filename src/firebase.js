import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getMessaging,
  getToken,
  onMessage,
  isSupported,
} from "firebase/messaging";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDmF8DRUFTGxnaxIY0IIBDHYG4Rw16jDHA",
  authDomain: "airdrop-ev.firebaseapp.com",
  projectId: "airdrop-ev",
  storageBucket: "airdrop-ev.firebasestorage.app",
  messagingSenderId: "155041311442",
  appId: "1:155041311442:web:4437bf1f52856c66765b0b",
  measurementId: "G-2WL5XZ7CRK"
};
const firebaseApp = !getApps().length
  ? initializeApp(firebaseConfig)
  : getApp();
const messaging = (async () => {
  try {
    const isSupportedBrowser = await isSupported();
    if (isSupportedBrowser) {
      return getMessaging(firebaseApp);
    }
    return null;
  } catch (err) {
    return null;
  }
})();

export const fetchToken = async (setTokenFound, setFcmToken) => {
  return getToken(await messaging, {
    vapidKey:"BHIoG5UhWJo2_-YE36meTIYqq7WLU_SOhpOBoxUSIAMoTPEfh6un0K2_yowIFys83vs0sm8LzeFO8xu-8kNODuA",
  })
    .then((currentToken) => {
      if (currentToken) {
        setTokenFound(true);
        setFcmToken(currentToken);

        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        setTokenFound(false);
        setFcmToken();
        // shows on the UI that permission is required
      }
    })
    .catch((err) => {
      console.error(err);
      // catch error while creating client token
    });
};

export const onMessageListener = async () =>
  new Promise((resolve) =>
    (async () => {
      const messagingResolve = await messaging;
      onMessage(messagingResolve, (payload) => {
        resolve(payload);
      });
    })()
  );
export const auth = getAuth(firebaseApp);
