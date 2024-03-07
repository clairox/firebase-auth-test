import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getAnalytics } from 'firebase/analytics'

const apiKey = import.meta.env.VITE_FB_API_KEY
const authDomain = import.meta.env.VITE_FB_AUTH_DOMAIN
const projectId = import.meta.env.VITE_FB_PROJECT_ID
const storageBucket = import.meta.env.VITE_FB_STORAGE_BUCKET
const messagingSenderId = import.meta.env.VITE_FB_MESSAGING_SENDER_ID
const appId = import.meta.env.VITE_FB_APP_ID
const measurementId = import.meta.env.VITE_FB_MEASUREMENT_ID

const firebaseConfig = {
	apiKey,
	authDomain,
	projectId,
	storageBucket,
	messagingSenderId,
	appId,
	measurementId,
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const analytics = getAnalytics(app)
