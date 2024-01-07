import { User, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { FIREBASE_AUTH } from "../../firebase/FirebaseConfig";


export default function useAuth() {
    
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {

        const sub = onAuthStateChanged(FIREBASE_AUTH, user => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
        });

        return sub; 
    });

    return { user }
}