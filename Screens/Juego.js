
import {
  View,
  StyleSheet,
  Text,
  Button,
  Modal,
  Alert,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import { ref,  set } from "firebase/database";
import { firebaseConfig } from "../Components/Config";
import { initializeApp } from "firebase/app";
import Pato from "../Components/Pato";
import { db } from "../Components/Config";



export default function Juego({ navigation }) {
  const seg = 30
  const [tiempo, settiempo] = useState(seg);
  const [contador, setcontador] = useState(0)
  const [modalVisible, setmodalVisible] = useState(false);
  const [patos, setpatos] = useState(0);
  
 
  //verifica que el tiempo llega a 0 y se reinicie en 30 seg
 

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
      setpatos(contador);
      setmodalVisible(true);
      //Alert.alert("GAME OVER!!", "Su puntuacion es: " + contador);
      settiempo(seg);
      //Enviar puntuaciona firebase
      puntuacion()
      setcontador(0)
    }
  }, [tiempo]);
  ////////FIN TEMPORIZADOR/////////

  function contar(){
    setcontador(contador+1)
  }

  function reiniciar(){
    setmodalVisible(false);

  }

  /////Guardar en firebase/////
  function puntuacion(){
    const jugador="pepe34"
    set(ref(db, "puntuacion/" + jugador), {
     nick:jugador,
     puntaje: contador
    });

    // set(ref(db, "puntuacion/" + nick), {
    //   nick:nick,
    //   puntaje: contador
    //  });

  }

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
          <Text style={styles.textTemp}> {contador}</Text>
          <Text style={styles.textScore}>   Time:</Text>
          <Text style={styles.textTemp}> {tiempo}</Text>
        </View>
        

        <TouchableOpacity style={styles.btn1} onPress={() => logout()}>
          <Text style={styles.txtBtn1}>Salir</Text>
        </TouchableOpacity>
      </View>
      <Pato presionar={contar}  />
      <Modal
          visible={modalVisible}
          // onBackdropPress={() => setModalVisible(false)}
          animationType="fade"
          transparent={true}
          style={styles.modalContainer}
        >
          <View style={styles.modal}>
            <Image style={styles.imgGO} source={require("../assets/gameover.png")} />
            <Text style={styles.txtResultado}>Usted ha cazado: {patos} patos</Text>

            <View style={styles.fila}>
            <TouchableOpacity style={styles.btn2} onPress={() => reiniciar()}>
              <Text style={styles.txtBtn1}>Reiniciar</Text>
            </TouchableOpacity>

            <Text>{"\n"}</Text>
            <Text>{"\n"}</Text>

            <TouchableOpacity style={styles.btn2} onPress={() => logout()}>
              <Text style={styles.txtBtn1}>Salir</Text>
            </TouchableOpacity>
            </View>
            

            <TouchableOpacity
              onPress={() => {
                // Acción al presionar el botón 2
                setModalVisible(false);
              }}
            >
            </TouchableOpacity>
            
          </View>
          
        </Modal>
        
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
  modal: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    // flex: 1,
    // backgroundColor: 'rgba(0, 0, 0, 0.)',
    justifyContent: "center",
    alignItems: "center",
  },
imgGO: {
  width: 400,
  height: 300,
  alignSelf: "center",
},
txtResultado:{
  fontWeight: 'bold'
},
btn2: {
  backgroundColor: "#00ff00",
  width: "95%",
  height: "15%",
  borderRadius: 15,
  alignContent: 'center',
  top: 20
},
});
