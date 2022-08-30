import { Alert, KeyboardAvoidingView, StyleSheet, View } from 'react-native'
import { useState } from 'react'
import { Button, Input, Image, Text } from 'react-native-elements'
import { auth } from '../firebase'

const RegisterScreen = ({navigation}) => {

    

    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [imageUrl, setImageUrl] = useState(null)

    const register = ()=>{
        auth
        .createUserWithEmailAndPassword(email,password)
        .then((authUser)=>{
            authUser.user.updateProfile({
                displayName: fullName,
                photoURL:imageUrl || "https://cdn0.iconfinder.com/data/icons/superuser-web-kit/512/686909-user_people_man_human_head_person-512.png"
        })
        }).catch((error)=>{
            console.log(error);
        })
    }

    return (
        <KeyboardAvoidingView  style={styles.container}>
            <Text h3 style={{marginBottom:50}} >Create a signal account</Text>
            <View style={styles.inputContainer}>
                <Input
                    placeholder='Full Name'
                    autoFocus
                    type='text'
                    value={fullName}
                    onChangeText={text => setFullName(text)}
                />
                <Input
                    placeholder='Email'
                    type='email'
                    value={email}
                    onChangeText={text => setEmail(text)}
                />
                <Input
                    placeholder='Password'
                    secureTextEntry
                    type='password'
                    value={password}
                    onChangeText={text => setPassword(text)}
                />
                <Input
                    placeholder='Profile Picture url (optional)'
                    type='text'
                    value={imageUrl}
                    onChangeText={text => setImageUrl(text)} 
                    onSubmitEditing={register}
                    />

            </View>
            <Button onPress={register} containerStyle={styles.button} raised title="Register" />
            <Text style={styles.credit} >Developer: Sankalp Sachan</Text>
        </KeyboardAvoidingView>
    )
}

export default RegisterScreen

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
        width:200
    },
    credit:{
        height:50,
        fontSize:18,
        color:'#868686',
        marginVertical:30
    }
})