import { Alert, KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button, Input, Image } from 'react-native-elements'
import { auth } from '../firebase'

const LoginScreen = ({navigation}) => {

    useEffect(() => {
       const unsubscribe = auth.onAuthStateChanged((authUser)=>{
            if(authUser){
                navigation.replace('Home')
            }
        });
        return unsubscribe
    }, [])
    

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signIn = ()=>{
        auth.signInWithEmailAndPassword(email,password).catch((error)=>{
            Alert.alert('errro',error.message)
        })
    }

    return (
        <KeyboardAvoidingView  style={styles.container}>
            <Image source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/5/56/Logo_Signal..png" }}
                style={{ width: 100, height: 100 }} />
            <View style={styles.inputContainer}>
                <Input 
                placeholder='Email' 
                autoFocus 
                type='email' 
                value={email}
                onChangeText={text=>setEmail(text)}
                />
                <Input 
                placeholder='Password' 
                secureTextEntry 
                type='password' 
                value={password}
                onChangeText={text=>setPassword(text)}/>
            </View>
            <Button containerStyle={styles.button} title="Login" onPress={signIn}/>
            <Button  onPress={()=>{navigation.navigate('Register')}} containerStyle={styles.button} type='outline' title="Register" />
            <Text style={styles.credit} >Developer: Sankalp Sachan</Text>
            <View style={{height:10}}/>
        </KeyboardAvoidingView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        padding:10,
        backgroundColor:'white'
        },
    inputContainer:{
        width:300
    },
    button:{
        marginTop:10,
        width:200
    },
    credit:{
        height:50,
        fontSize:18,
        color:'#868686',
        marginVertical:30
    }
})