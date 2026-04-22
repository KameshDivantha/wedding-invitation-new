import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, User } from 'firebase/auth';
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  serverTimestamp } from
'firebase/firestore';

// TODO: Replace with your Firebase project configuration
// 1. Go to https://console.firebase.google.com
// 2. Create a new project or select existing
// 3. Go to Project Settings > General > Your apps > Web app
// 4. Copy the config object below and replace the placeholder values
// Firebase project configuration using environment variables
const firebaseConfig = {
  apiKey: "AIzaSyC_C1T43YT_pMojth3Hzv8pNPVjp__sE9U",
  authDomain: "kamesh-shashini-wedding.firebaseapp.com",
  projectId: "kamesh-shashini-wedding",
  storageBucket: "kamesh-shashini-wedding.firebasestorage.app",
  messagingSenderId: "1046430467568",
  appId: "1:1046430467568:web:014d4c47092379a526c935"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return { success: true, user: result.user };
  } catch (error) {
    console.error('Error signing in with Google:', error);
    return { success: false, error };
  }
};

export { onAuthStateChanged };
export type { User };

export const submitRSVP = async (guestName: string, attendance: string, email: string) => {
  const docId = email.toLowerCase().trim();
  console.log('submitRSVP started for:', guestName, 'with ID:', docId);
  try {
    // Use setDoc with the email as the ID to allow updates
    const firestorePromise = setDoc(doc(db, 'rsvps', docId), {
      guestName,
      attendance,
      email: docId,
      timestamp: serverTimestamp()
    });

    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Firebase connection timed out')), 10000)
    );

    await Promise.race([firestorePromise, timeoutPromise]);
    console.log('Firestore document set with ID:', docId);

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
            email: docId,
          }),
          signal: controller.signal
        });
        clearTimeout(timeoutId);
      } catch (sheetsError) {
        console.error('Error syncing to Google Sheets: ', sheetsError);
      }
    }

    return { success: true, id: docId };
  } catch (error) {
    console.error('Error adding RSVP: ', error);
    return { success: false, error };
  }
};