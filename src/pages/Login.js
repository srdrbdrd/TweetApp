import React, {useState, useContext} from 'react'
import {SafeAreaView,View,Text,TextInput,TouchableOpacity,Alert,Image} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import auth from '@react-native-firebase/auth';
import styles from '../styles'
import Context from '../context/store'
import logo from '../assets/logo.png'
const Login=props=>{
    const [usermail,setUsermail]=useState("")
    const [password,setPassword]=useState("")
    const {state,dispatch} = useContext(Context) //store reducer bağlantısı
   
    const setMail=text=>setUsermail(text) //maili alabilmek için oluşturulan fonksiyon
    const setPass=text=>setPassword(text) //şifreyi alabilmek için oluşturulan fonksiyon


    //kullanıcı girişi için çalışacak fonksiyon
    const loginUser=async()=>{
       if (usermail && password){ //Email ve password kısmının boş kalmasını engelliyorum.
        try {
            
            await auth().signInWithEmailAndPassword(usermail,password)
            const name   = usermail.substring(0, usermail.lastIndexOf("@")); //name adında bir değer atayıp mail öncesi değerini alarak store değerine kaydetmeyi denedim(Serdar)Oldu gibi inş
            dispatch({type:"SET_USER",userObj:name}) //üsttekinin devamı, eğer store değerine tanımlandıysa user verisini çekip kullanıcı ismini kullanabiliriz.
            //console.warn(state.user) 
            props.navigation.navigate("Main")
            AsyncStorage.setItem('@USER_NAME',name) //Giriş yapan kullanıcı ismi
            AsyncStorage.setItem('@USER_ID', auth().currentUser.uid) //Async ile kullanıcı giriş id set etme.
            
            
            
        } catch (error) {
            Alert.alert("App","Bir hata oluştu.")
        }
       }else{
           Alert.alert("Lütfen gerekli alanları doldurunuz")
       }
    }

    
   
   
    return(
        <SafeAreaView style = {{flex:1,justifyContent:'center'}}>
            <View style = {{flex:1,justifyContent:'center',alignItems:'center'}}>

                <Image source = {logo} />


                <TextInput
                    style = {styles.login.input}
                    placeholder = "E-posta "
                    keyboardType = "email-address"
                    autoCapitalize = "none"
                    onChangeText={setMail} //yazıyı değişirse yazıyı al
                    
                />

                <TextInput
                    style = {styles.login.input}
                    placeholder = "Şifre"
                    secureTextEntry
                    onChangeText={setPass} //yazıyı değişirse yazıyı al

                />

                <View style = {{marginTop: 20}}>
                    <TouchableOpacity style = {styles.login.buttonContainer} onPress={loginUser}>
                        <Text style = {{color:"white",fontSize:18}}>Giriş</Text>
                    </TouchableOpacity> 

                    <TouchableOpacity style = {styles.login.buttonContainer} onPress={() => props.navigation.navigate("SignUp")}>
                        <Text style = {{color:"white",fontSize:18}}>Kayıt</Text>
                    </TouchableOpacity> 

                    

                </View>
             
           
           
           
           
            </View>
        </SafeAreaView>
    )
}
export {Login}