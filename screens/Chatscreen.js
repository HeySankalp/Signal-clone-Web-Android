import {
    Keyboard,
    KeyboardAvoidingView, SafeAreaView, ScrollView,
    StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import React, { useLayoutEffect, useState, useRef } from 'react'
import Mat from 'react-native-vector-icons/MaterialIcons';
import { Avatar } from 'react-native-elements';
import Ion from 'react-native-vector-icons/Ionicons';
import Fea from 'react-native-vector-icons/Feather';
import { auth, db } from '../firebase';
import firebase from "firebase/compat/app";




const Chatscreen = ({ route, navigation }) => {

    const scrollViewRef = useRef();
    const [message, setMessage] = useState("")
    const [allMessage, setAllMessage] = useState([])


    useLayoutEffect(() => {
        navigation.setOptions({
            title: route.params.chatName,
            headerStyle: { backgroundColor: 'white' },
            headerTintColor: 'black',
            headerLeft: () => (
                <View style={{ marginRight: 20, flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity activeOpacity={0.7} onPress={() => { navigation.goBack() }}>
                        <Mat name="arrow-back-ios" size={24} color="black" />
                    </TouchableOpacity>
                    <Avatar rounded source={{ uri: route.params.chatPhoto }} />
                </View>),
            headerRight: () => (
                <View style={{ flexDirection: 'row', width: 110, justifyContent: 'space-between' }}>
                    <TouchableOpacity activeOpacity={0.5}>
                        <Ion name="videocam-outline" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.5}>
                        <Ion name="call-outline" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.5} >
                        <Fea name="more-vertical" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            )
        })
    }, [navigation,route])

    useLayoutEffect(() => {
        const unsubscribe = db
            .collection("chats")
            .doc(route.params.id)
            .collection("messages")
            .orderBy("timeStamp", "asc")
            .onSnapshot((snapshot) => {
                setAllMessage(snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data()
                })))
            });

        return unsubscribe

    }, [route])

    const sendMessage = () => {
        Keyboard.dismiss();
        db.collection("chats").doc(route.params.id).collection("messages").add({
            timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: message,
            displayName: auth.currentUser.displayName,
            email: auth.currentUser.email,
            photoURL: auth.currentUser.photoURL
        });
        setMessage("");
    }

    return (
        <SafeAreaView style={styles.scrollCon} >
            <StatusBar style='dark' />
            <KeyboardAvoidingView style={styles.container} >
                <>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <ScrollView
                            contentContainerStyle={{ paddingTop: 15 }}
                            ref={scrollViewRef}
                            onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}>
                            {
                                allMessage.map(({ id, data }) => data.email === auth.currentUser.email ?
                                    (
                                        <View key={id} style={styles.sender}>
                                            <Avatar
                                                position='absolute'
                                                bottom={-10}
                                                right={-10}
                                                size={24}
                                                source={{ uri: data.photoURL }} />
                                            <Text style={{ fontSize:15, fontWeight:'500' }}>{data.message}</Text>
                                        </View>
                                    )
                                    : (
                                        <View key={id} style={styles.receiver}>
                                            <Avatar
                                                position='absolute'
                                                bottom={-10}
                                                left={-10}
                                                size={24}
                                                source={{ uri: data.photoURL }} />
                                            <Text style={{fontSize:15, fontWeight:'500',color:'white'}} >{data.message}</Text>
                                            <Text style={{position:'absolute', bottom:-12,left:15, fontSize:12}} >{data.displayName}</Text>
                                        </View>
                                    )
                                )
                            }
                        </ScrollView>
                    </TouchableWithoutFeedback>
                    <View style={styles.footer}>
                        <TextInput
                            placeholder='Type a message'
                            onChangeText={text => setMessage(text)}
                            value={message}
                            style={styles.input}
                        />
                        <TouchableOpacity disabled={message.length===0} onPress={sendMessage} activeOpacity={0.6}>
                            <Ion name="send" size={30} color="#2c6bed" />
                        </TouchableOpacity>
                    </View>
                </>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default Chatscreen

const styles = StyleSheet.create({
    scrollCon: {
        flex: 1,
        backgroundColor: 'white'
    },
    container: {
        flex: 1
    },
    sender: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: '#dddddd',
        alignSelf: 'flex-end',
        borderRadius: 20,
        marginRight: 15,
        marginBottom: 20,
        maxWidth: '80%',
        position: 'relative'
    },
    receiver: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: '#2c6bed',
        alignSelf: 'flex-start',
        borderRadius: 20,
        marginLeft: 15,
        marginBottom: 20,
        maxWidth: '80%',
        position: 'relative'
    },
    footer: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        paddingHorizontal: 15,
        justifyContent: 'center',
        marginVertical: 15
    },
    input: {
        bottom: 0,
        height: 50,
        flex: 1,
        fontWeight:'400',
        fontSize:18,
        borderRadius: 20,
        backgroundColor: '#eeeeee',
        paddingHorizontal: 15,
        marginRight: 10,
        paddingVertical: 5,
        borderColor: 'transparent',
        borderWidth: 1,
    }
})