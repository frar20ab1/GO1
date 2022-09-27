import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCtRBk1CNFOD9aZUC5mArHdDc0b68uaJ3o",
  authDomain: "godkendelsesopgave1-a1c57.firebaseapp.com",
  projectId: "godkendelsesopgave1-a1c57",
  storageBucket: "godkendelsesopgave1-a1c57.appspot.com",
  messagingSenderId: "118450841898",
  appId: "1:118450841898:web:1ecddbcd3b21477e48d653"
};


export default function App() {
  return (
    <View style={styles.container}>
      <Text> up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
