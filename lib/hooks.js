import { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth, firestore } from './firebase';

export function useUserData() {
    const [user] = useAuthState(auth);
    const [username, setUsername] = useState(null);

    useEffect(() => {
        // turn off realtime subscription
        let unsubscribe;

        if (user) {
            const ref = firestore.collection('users').doc(user.uid);
            unsubscribe = ref.onSnapshot((doc) => {
                setUsername(doc.data()?.username)
            });
        } else {
            setUsername(null);
        }

        return unsubscribe;
    }, [user]);

    return { user, username };
}

export function useActivity() {
    const [activity, setActivity] = useState([]);

    useEffect(() => {
        async function fetchData() {
            // const snapshot = await firebase.firestore().collection('events').get()
            const snapshot = await firestore.collection('activity').get();
            const activity = snapshot.docs.map(doc => doc.data());
            console.log('activity', activity);
            setActivity(activity);
        }
        fetchData();
    }, []);

    return { activity };
}
