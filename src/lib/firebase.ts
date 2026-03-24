import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp } from
'firebase/firestore';

// TODO: Replace with your Firebase project configuration
// 1. Go to https://console.firebase.google.com
// 2. Create a new project or select existing
// 3. Go to Project Settings > General > Your apps > Web app
// 4. Copy the config object below and replace the placeholder values
const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_PROJECT_ID.firebaseapp.com',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_PROJECT_ID.appspot.com',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  appId: 'YOUR_APP_ID'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const submitRSVP = async (guestName: string, attendance: string) => {
  try {
    const docRef = await addDoc(collection(db, 'rsvps'), {
      guestName,
      attendance,
      timestamp: serverTimestamp()
    });

    // Send to Google Sheets if configured
    const googleSheetsUrl = import.meta.env.VITE_GOOGLE_SHEETS_URL;
    if (googleSheetsUrl && googleSheetsUrl !== 'YOUR_WEB_APP_URL_HERE') {
      try {
        await fetch(googleSheetsUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: guestName,
            attendance: attendance,
          }),
        });
      } catch (sheetsError) {
        console.error('Error syncing to Google Sheets: ', sheetsError);
      }
    }

    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error adding RSVP: ', error);
    return { success: false, error };
  }
};