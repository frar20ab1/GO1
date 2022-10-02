import * as React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Button,
    Alert,
    ScrollView,
    SafeAreaView,
} from 'react-native';
import firebase from 'firebase/compat';
import {useEffect, useState} from "react";





const Add_edit_user = ({navigation,route}) => {

    const initialState = {
        Navn: '',
        Alder: '',
        Adresse: ''
    }

    const [newUser, setNetUser] = useState(initialState)

    const isUserEdit = route.name === "Edit user"

    useEffect(() => {
        if (isUserEdit) {
            const user = route.params.user[1]
            setNetUser(user)
        }
        return () => {
            setNetUser(initialState)
        }
    }, [])

    const changeTextInput = (name, event) => {
        setNetUser({...newUser, [name]: event})
    }

    const handleSave = () => {
        const {navn, alder, adresse} = newUser

        if (navn.length === 0 || alder.length === 0 || adresse.length === 0) {
            return Alert.alert('Et af felterne er ikke udfyldt')
        }

        if (isUserEdit) {
            const id = route.params.user[0]

            try {
                firebase.database()
                    .ref(`/Users/${id}`)
                    // Jeg angiver i update hvilke felter der skal opdateres
                    .update({navn, alder, adresse});
                Alert.alert("Dine informationer er nu opdateret")
                const user = (id, newUser)
                navigation.navigate("user details", {user});
            }
            catch (error) {
                console.log(`Error: ${error.message}`)
            }

            }else{
                    try {
                        firebase.database().ref('/Users')
                            .push({navn,alder,adresse})
                        Alert.alert("Bruger gemt")
                        setNetUser(initialState);

                } catch (error) {
                        console.log(`Error: ${error.message}`)

            }
        }
    }


    return (
        <SafeAreaView style={styles.container}>

            <ScrollView>
                {
                    Object.keys(initialState).map((key,index) =>{
                        return(
                            <View style={styles.row} key={index}>
                                <Text style={styles.label}>
                                    {key}
                                </Text>
                                <TextInput value={newUser[key]}
                                           onChangeText={(event) => changeTextInput(key,index)}
                                           style={styles.input}>

                                </TextInput>
                            </View>
                        )
                    })
                }
                <Button title={isUserEdit ? "Gem ændringer" : "Tilføj bruger"} onPress={() => handleSave()}>
                </Button>
            </ScrollView>

        </SafeAreaView>

    )
}

export default Add_edit_user;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    row: {
        flexDirection: 'row',
        height: 30,
        margin: 10,
    },
    label: {
        fontWeight: 'bold',
        width: 100
    },
    input: {
        borderWidth: 1,
        padding:5,
        flex: 1
    },
})

