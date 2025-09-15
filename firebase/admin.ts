import { initializeApp, getApps, cert } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import { getFirestore } from 'firebase-admin/firestore'
import { getStorage } from 'firebase-admin/storage'

function initFirebaseAdmin() {
	const apps = getApps()

	if (!apps.length) {
		initializeApp({
			credential: cert({
				projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
				clientEmail: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL,
				privateKey: process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY?.replace(
					/\\n/g,
					'\n'
				),
			}),
		})
	}

	return {
		auth: getAuth(),
		db: getFirestore(),
		storage: getStorage(),
	}
}

export const { auth, db, storage } = initFirebaseAdmin()
