import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { FIREBASE_AUTH } from "../../../FirebaseConfig";
import { collection, getDocs } from "firebase/FirebaseConfig";

const Questions = () => {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(false);

    // Firestore instance from FirebaseConfig
    const db = FIREBASE_AUTH;

    useEffect(() => {
        setLoading(true);
        const getQuestions = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "questions"));
                const fetchedQuestions = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setQuestions(fetchedQuestions);
            } catch (error) {
                console.error("Error fetching questions: ", error);
                // Handle the error appropriately in a production app
            } finally {
                setLoading(false);
            }
        };

        getQuestions();
    }, []);

    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {questions.length > 0 ? (
                questions.map(question => (
                    <View key={question.id} style={styles.question}>
                        {/* Render your question details here */}
                        <Text>{question.address}</Text>
                        {/* Add other question details you want to display */}
                    </View>
                ))
            ) : (
                <Text>No questions available</Text>
            )}
        </View>
    );
}

export default Questions;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    question: {
        marginVertical: 8,
        padding: 16,
        backgroundColor: '#fff',
        // Add additional styling for your question items
    },
    // Add more styles as needed
});
