import { Picker } from '@react-native-picker/picker';
import { collection, doc, getDoc, getFirestore, onSnapshot } from "firebase/firestore";
import * as React from "react";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

const ParticipantView = () => {
  const [applicationDetails, setApplicationDetails] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  useEffect(() => {
    const firestore = getFirestore();
    const applicationsCollectionRef = collection(firestore, "application");

    const unsubscribe = onSnapshot(applicationsCollectionRef, async (snapshot) => {
      const extractedApplicationDetails = await Promise.all(
        snapshot.docs
          .filter((docSnapshot) => docSnapshot.id !== "questions")
          .map(async (docSnapshot) => {
            const applicationID = docSnapshot.id;
            const applicationDocRef = doc(applicationsCollectionRef, applicationID);
            const applicationDoc = await getDoc(applicationDocRef);

            return { id: applicationID, data: applicationDoc.data() };
          })
      );
      console.log(extractedApplicationDetails);
      setApplicationDetails(extractedApplicationDetails);
    });

    // Cleanup function to unsubscribe from snapshot listener
    return () => unsubscribe();
  }, []);

  const getStatusBackgroundColor = (status: string | undefined) => {
    switch (status) {
      case "Pending":
        return "lightyellow";
      default:
        return "transparent";
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Application Details:</Text>

      {/* Search Bar */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search by name..."
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />

      {/* Status Filter */}
      <View style={styles.pickerContainer}>
        <Text>Status Filter:</Text>
        <Picker
          selectedValue={statusFilter}
          onValueChange={(itemValue) => setStatusFilter(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="All" value={null} />
          <Picker.Item label="Accepted" value="Accepted" />
          <Picker.Item label="Pending" value="Pending" />
          <Picker.Item label="Denied" value="Denied" />
        </Picker>
      </View>

      {applicationDetails.map((application, index) => (
        <View key={index} style={[styles.applicationContainer, { backgroundColor: getStatusBackgroundColor(application.data.status) }]}>
          <Text style={styles.applicationStatus}>Pending</Text>
          <Text style={styles.applicationID}>{application.data.ethnicity}, Varizzy</Text>
          {/* Add additional fields as needed */}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  applicationContainer: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  applicationID: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
  applicationStatus: {
    fontSize: 14,
    fontWeight: "bold",
  },
  searchInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    width: "80%",
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  picker: {
    width: 150,
    marginLeft: 10,
  },
});

export default ParticipantView;
