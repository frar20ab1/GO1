import * as React from 'react';
import { View, Text, Platform, StyleSheet, FlatList, Button, Alert } from 'react-native';
import firebase from 'firebase/compat';
import {useEffect, useState} from "react";


// component til at vise detaljer om en bruger
const UserDetails = ({route, navigation}) => {

    // bruger usestate til at definere objektets initial state
    const [user, setUser] = useState({});

    useEffect(() => {
        setUser(route.params.user[1]);
        /*Henter brugeren og sætter values ind i return*/
        return () => {
            //når jeg går væk fra skærmen, skal den tømme objektet
            setUser({})
        }
    });

    const handleEdit = () => {
        /*Går til edit user routen */
        const user = route.params.user
        //
        navigation.navigate('Edit user', {user})
    };

    const deleteUser = () => {
        if(Platform.OS === 'android' || Platform.OS === 'ios') {
            Alert.alert('Er du sikker?', 'Vil du slette denne bruger', [
                {text:'Cancel', style:'cancel'},
                //bruger handle delete til at slette brugeren
                {text:'Delete', style:'destructive', onPress:() => handleDelete() }
            ])
        }
    }

    const handleDelete = () => {
        const id = route.params.user[0]
        try {
            firebase.database().ref(`/Users/${id}`).remove();
            navigation.goBack();
        }
        catch (error) {
            Alert.alert(error.message)
        }
    };

    if (!user) {
        return <Text>Ingen data</Text>;
    }


    return (

       <View style={styles.container}>
           <Button title='Edit' onPress={ () => handleEdit()}>
           </Button>
           <Button title='Delete' onPress={() => deleteUser()}>
           </Button>

           {
               Object.entries(user).map((item,index) => {
                   return (
                       <View style={styles.row} key={index}>
                           <Text style={styles.label}>
                               {item[0]}
                           </Text>
                           <Text style={styles.value}>
                               {item[1]}
                           </Text>

                       </View>
                   )

               })
           }

       </View>
    )
}

export default UserDetails;

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'flex-start' },
    row: {
        margin: 5,
        padding: 5,
        flexDirection: 'row',
    },
    label: { width: 100, fontWeight: 'bold' },
    value: { flex: 1 },
});
