import * as React from 'react';
import { Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import firebase from 'firebase/compat';
import {useEffect, useState} from "react";


const userList = ({navigation}) => {

    const [users, setUsers] = useState()

    useEffect(() => {
        if(!users) {
            firebase.database().ref('/Users').on("value", snapshot => {
                setUsers(snapshot.val())
            })
        }
    }, []);



    //hvis der ikke er nogle brugere endnu
    if(!users) {
        return <Text>Vent... De kommer</Text>
    }

    const handleSelectUser = id => {
        /* søger i vores array af users og finde den der matcher id´et */
        const user = Object.entries(users).find(user[0] === id)
        navigation.navigate('user details', {user})
    }

    //Metoden flatlist forventer et array. Derfor bruges alle values fra vores users objekter og bruger til array
    const userArray = Object.values(users)
    const userKeys = Object.keys(users)


    return (
        <FlatList data={userArray}
                  keyExtractor={(item, index) => userKeys[index]}
                  renderItem={({item, index}) =>{
                      return(
                          <TouchableOpacity style={styles.container} onPress={() => handleSelectUser(userKeys[index])}>
                              <Text>
                                  {item.navn} {item.adresse}
                              </Text>
                          </TouchableOpacity>
                      )
                  }}
                  />
    )
}

export default userList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderWidth: 1,
        borderRadius:10,
        margin: 5,
        padding: 5,
        height: 50,
        justifyContent:'center'
    },
    label: { fontWeight: 'bold' },
});
