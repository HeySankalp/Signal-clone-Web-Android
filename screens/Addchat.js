import { StyleSheet, TouchableOpacity, View, Text } from 'react-native'
import { Input, Button } from 'react-native-elements'
import React, { useLayoutEffect, useState } from 'react'
import Ant from 'react-native-vector-icons/AntDesign'
import Fon from 'react-native-vector-icons/FontAwesome'
import { db } from '../firebase'

const Addchat = ({ navigation }) => {

    const [chatName, setChatName] = useState("")
    const [chatPhoto, setChatPhoto] = useState("")

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Add new chat',
            headerStyle: { backgroundColor: 'white' },
            headerTintColor: 'black',
            headerLeft: () => (
                <TouchableOpacity activeOpacity={0.5} onPress={() => { navigation.goBack() }}>
                    <View style={{ flexDirection: 'row', marginRight: 50, alignItems: 'center' }}>
                        <Ant name="arrowleft" size={18} color="black" />
                        <Text style={{ color: 'black', fontSize: 18,fontWeight:'400' }}>Chats</Text>
                    </View>
                </TouchableOpacity>)
        })
    }, [navigation]);

    const createChat = async() => { 
       await db.collection('chats').add({
            chatName : chatName,
            chatPhoto: chatPhoto.length>0?chatPhoto:"https://o365reports.com/wp-content/uploads/2016/08/office365-groups-icon.png"
        }).then(()=>{
            navigation.goBack();
        }).catch((error)=>{
            console.log(error);
        })
     }

    return (
        <View style={styles.container}>
            <Input
                placeholder='Enter chat name'
                value={chatName}
                onChangeText={text => setChatName(text)}
                leftIcon={<Ant name="wechat" style={{marginHorizontal:10}} size={24} color="#494b4e" />}
            />
            <Input
                placeholder='Enter photo url (optional)'
                value={chatPhoto}
                onChangeText={text => setChatPhoto(text)}
                leftIcon={<Fon name="photo" style={{marginHorizontal:10}} size={24} color="#494b4e" />}
            />
            <Button title="Create chat" onPress={createChat} />

        </View>
    )
}

export default Addchat

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:30,
        backgroundColor:'white'
    }
})