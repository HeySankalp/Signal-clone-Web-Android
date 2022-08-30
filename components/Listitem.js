import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ListItem, Avatar } from 'react-native-elements'
import { db } from '../firebase'

const Listitem = ({ chatName, id, enterChat, chatPhoto }) => {

    const [messages, setMessages] = useState([])


    useEffect(() => {
        const unsubscribe = db
            .collection("chats")
            .doc(id)
            .collection("messages")
            .orderBy("timeStamp","desc")
            .onSnapshot((snapshot)=>{
                setMessages(snapshot.docs.map((doc)=>(doc.data())))
            })

            return unsubscribe;
    }, [])



    return (
        <TouchableOpacity onPress={() => { enterChat(chatName, id, chatPhoto) }} activeOpacity={0.6}>
            <ListItem>
                <Avatar
                    rounded
                    source={{ uri: chatPhoto }}
                />
                <ListItem.Content>
                    <ListItem.Title style={{ fontWeight: '800' }} >
                        {chatName}
                    </ListItem.Title>
                    <ListItem.Subtitle numberOfLines={1} ellipsizeMode='tail'>
                        {messages?.[0]?.displayName}: {messages?.[0]?.message}
                    </ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
        </TouchableOpacity>
    )
}

export default Listitem

const styles = StyleSheet.create({})