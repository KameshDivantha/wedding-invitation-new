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
  projectId: 'kamesh-shashini-invitation',
  storageBucket: 'YOUR_PROJECT_ID.appspot.com',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  appId: 'YOUR_APP_ID'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const submitRSVP = async (guestName: string, attendance: string) => {
  console.log('submitRSVP started for:', guestName);
  try {
    console.log('Attempting to add document to Firestore...');
    const docRef = await addDoc(collection(db, 'rsvps'), {
      guestName,
      attendance,
      timestamp: serverTimestamp()
    });
    console.log('Firestore document added with ID:', docRef.id);

    // Send to Google Sheets if configured
    const googleSheetsUrl = import.meta.env.VITE_GOOGLE_SHEETS_URL;
    
    // Safety check: Only attempt fetch if the URL looks like a Google Apps Script Web App URL
    // (not a Spreadsheet edit URL or the default placeholder)
    const isWebAppUrl = googleSheetsUrl && 
                       googleSheetsUrl.includes('script.google.com') && 
                       googleSheetsUrl.includes('/exec');

    if (isWebAppUrl) {
      try {
        // Use AbortController for a 5-second timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

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
          signal: controller.signal
        });
        clearTimeout(timeoutId);
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