import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  ImageBackground,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { firebaseConfig } from "../Components/Config";
import { initializeApp } from "firebase/app";

export default function Login({ navigation }) {
  const [correo, setcorreo] = useState("");
  const [pass, setpass] = useState("");

  function login() {
    const app = initializeApp(firebaseConfig);

    const auth = getAuth(app);
    signInWithEmailAndPassword(auth, correo, pass)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        Alert.alert("Acceso correcto");
        navigation.navigate("Juego");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Alert.alert("Acceso denegado", "Verifique las credenciales");

        // if(errorCode === "auth/wrong-password"){
        //   Alert.alert("Acceso denegado", "Verifique las credenciales")
        // }else{
        //   Alert.alert("Error")
        // }
        // console.log(errorCode)
      });

    limpiar();
  }

  function limpiar() {
    setcorreo("");
    setpass("");
  }

  function registrarse() {
    navigation.navigate("Registro");
  }

  return (
    <ImageBackground
      source={require("../assets/Stage01.png")}
      style={styles.ImageBackground}
    >
      <View>
        <Text>{"\n"}</Text>
        <Text>{"\n"}</Text>
        
        <Image
          style={styles.imgTitle}
          source={require("../assets/title.png")}
        />
        <Text>{"\n"}</Text>
        <Image style={styles.imgUser} source={require("../assets/user.png")} />
        <Text style={styles.txt2}>Usuario:</Text>
        <TextInput
          style={styles.input1}
          placeholder="Ingrese su correo"
          keyboardType="email-address"
          onChangeText={(correo) => setcorreo(correo)}
          value={correo}
        />
        <Text style={styles.txt2}>Contraseña:</Text>
        <TextInput
          style={styles.input1}
          placeholder="Ingrese su contraseña"
          secureTextEntry={true}
          onChangeText={(pass) => setpass(pass)}
          value={pass}
        />

        <View style={styles.fila}>
        <TouchableOpacity
        style={styles.btn1}
        
        onPress={() => login()}
        >
        <Text style={styles.txtBtn1}>Acceder</Text>
        </TouchableOpacity>

        <Text>{"\n"}</Text>
        

        <TouchableOpacity
        style={styles.btn1}
        onPress={() => registrarse()} 
        >
        <Text style={styles.txtBtn1}>Registrarse</Text>
        </TouchableOpacity>
        </View>

      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  ImageBackground: {
    width: 400,
    height: 800,
  },
  input1: {
    borderColor: "#00ff00",
    paddingHorizontal: 100,
    width: "90%",
    height: "5%",
    borderRadius: 29,
    margin: 2,
  },
  imgTitle: {
    width: 360,
    height: 70,
    alignSelf: "center",
  },
  imgUser: {
    width: 150,
    height: 140,
    alignSelf: "center",
  },
  txt2:{
    fontSize:20,
    alignSelf:'flex-start',
    paddingHorizontal: 28,
    color:'#00ff00',
    fontStyle:"italic",
  },
  btn1:{
    backgroundColor:'#00ff00',
    top: -120,
    width:'60%',
    height:'8%',
    borderRadius:18,
    alignSelf:'center',
    fontSize:20,

    },
    txtBtn1:{
      alignSelf:'center',
      fontStyle:"italic",
      backgroundColor:'#00ff00',
    },
    fila: {
      flexDirection: "row",
      width:'40%',
      height:'45%',
      alignSelf: 'center',

    },
});
