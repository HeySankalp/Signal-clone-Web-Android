import { SafeAreaView, StyleSheet, Text, View, ScrollView } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useLayoutEffect, useState } from 'react'
import Listitem from '../components/Listitem'
import { Avatar } from 'react-native-elements'
import { auth, db } from '../firebase'
import { TouchableOpacity } from 'react-native'
import Ant from 'react-native-vector-icons/AntDesign'
import Oct from 'react-native-vector-icons/Octicons'



const HomeScreen = ({ navigation }) => {

    const [chats, setChats] = useState([])

    const signOutUser = () => {
        auth.signOut().then(() => {
            navigation.replace('Login');
        });
    }

    const addChathandler = () => {
        navigation.navigate('Addchat')
    }

    const enterChat = (chatName, id, chatPhoto) => {
        navigation.navigate('Chat', {
            id,
            chatName,
            chatPhoto
        })
    }



    useEffect(() => {
        const unsubscribe = db.collection('chats').onSnapshot((snapshot) => {
            setChats(snapshot.docs.map((doc) => ({
                id: doc.id,
                data: doc.data()
            })))
        })
        return unsubscribe
    }, [])


    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Signal",
            headerStyle: { backgroundColor: 'white' },
            headerTintColor: 'black',
            headerLeft: () => (
                <View style={{ marginRight: 20 }}>
                    <TouchableOpacity onPress={signOutUser}>
                        <Avatar rounded source={{ uri: auth?.currentUser?.photoURL }} />
                    </TouchableOpacity>
                </View>
            ),
            headerRight: () => (
                <View style={{ flexDirection: 'row', width: 70, justifyContent: 'space-between' }}>
                    <TouchableOpacity activeOpacity={0.5}>
                        <Ant name="camerao" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={addChathandler} activeOpacity={0.5}>
                        <Oct name="pencil" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            )
        })
    }, [])
    return (
        <>
            <StatusBar style='dark' />
            <SafeAreaView>
                <ScrollView style={styles.scrollView}>
                    {chats.map(({ id, data: { chatName,chatPhoto } }) => {
                        return <Listitem enterChat={enterChat} chatPhoto={chatPhoto} chatName={chatName} key={id} id={id} />
                    })}
                </ScrollView>
            </SafeAreaView>
        </>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    scrollView: {
        height: '100%'
    }
})