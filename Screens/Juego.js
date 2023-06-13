import {
  View,
  StyleSheet,
  Text,
  Button,
  Alert,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { getAuth, signOut } from "firebase/auth";

import { firebaseConfig } from "../Components/Config";
import { initializeApp } from "firebase/app";
import Pato from "../Components/Pato";

export default function Juego({ navigation }) {
  const [tiempo, settiempo] = useState(10);

  ////INICIO TEMPORIZADOR//////
  useEffect(() => {
    // const temporizador=setInterval(()=>{
    //   settiempo((tiempoAnterior) => tiempoAnterior-1)
    //   },1000 //milisegundos
    //   )

    const temporizador = setInterval(() => {
      settiempo((tiempoAnterior) => {
        if (tiempoAnterior == 1) {
          clearInterval(temporizador); //detiene el temporizador
        }
        return tiempoAnterior - 1;
      });
    }, 1000);
  }, []);

  useEffect(() => {
    if (tiempo === 0) {
      Alert.alert("GAME OVER!!", "Su puntuacion es: ");
      settiempo(10);
    }
  }, [tiempo]);
  ////////FIN TEMPORIZADOR/////////

  function logout() {
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    signOut(auth)
      .then(() => {
        // Alert.alert("Se cerró sesión correctamente")
        navigation.navigate("Login");
      })

      .catch((error) => {
        Alert.alert("Error al cerrar sesión");
      });
  }
  return (
    <ImageBackground
      source={require("../assets/Stage01.png")}
      style={styles.ImageBackground}
    >
      <View>
        <Text>{"\n"}</Text>
        <View style={styles.fila}>
          <Image
            style={styles.imgLives}
            source={require("../assets/lives.png")}
          />
          <Image
            style={styles.imgLives}
            source={require("../assets/lives.png")}
          />
          <Image
            style={styles.imgLives}
            source={require("../assets/lives.png")}
          />
          <Image
            style={styles.imgLives}
            source={require("../assets/lives.png")}
          />
          <Image
            style={styles.imgLives}
            source={require("../assets/lives.png")}
          />
          <Text style={styles.textScore}>   Score:</Text>
          <Text style={styles.textScore}> </Text>
          <Text style={styles.textScore}>   Time:</Text>
          <Text style={styles.textTemp}> {tiempo}</Text>
        </View>

        <TouchableOpacity style={styles.btn1} onPress={() => logout()}>
          <Text style={styles.txtBtn1}>Salir</Text>
        </TouchableOpacity>
      </View>
      <Pato />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  ImageBackground: {
    width: 400,
    height: 800,
  },
  textTemp: {
    alignSelf: "center",
    fontSize: 20,
  },
  textScore: {
    alignSelf: "center",
    fontSize: 20,
    color: "#ff0000",
  },
  imgLives: {
    width: 30,
    height: 30,
  },
  fila: {
    flexDirection: "row",
    width: "20%",
    height: "20%",
  },
  btn1: {
    backgroundColor: "#00ff00",
    top: 680,
    width: "15%",
    height: "8%",
    borderRadius: 18,
    fontSize: 20,
  },
  txtBtn1: {
    alignSelf: "center",
    fontStyle: "italic",
    backgroundColor: "#00ff00",
  },
});
