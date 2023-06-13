import {
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Button,
  Alert,
  Text,
  TextInput,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { firebaseConfig } from "../Components/Config";
import { db } from "../Components/Config";
import { ref, remove, set } from "firebase/database";
import { onValue } from "firebase/database";

export default function Registro({ navigation }) {
  const [nombre, setnombre] = useState("");
  const [apellido, setapellido] = useState("");
  const [edad, setedad] = useState("");
  const [nick, setnick] = useState("");
  const [correo, setcorreo] = useState("");
  const [pass, setpass] = useState("");

  const [datos, setdatos] = useState("");

  function registrarse() {
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    createUserWithEmailAndPassword(auth, correo, pass)
      .then((userCredential) => {
        const user = userCredential.user;

        guardar(nombre, apellido, edad, nick, correo);

        Alert.alert("Mensaje:", "Usuario registrado exitosamente!");
        navigation.navigate("Juego");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Alert.alert("Mensaje:", "El usuario no ha podido registrarse");
        console.log(error);
      });
  }

  //Guardar
  function guardar(nombreG, apellidoG, edadG, nickG, correoG) {
    set(ref(db, "jugadores/" + nickG), {
      name: nombreG,
      lastname: apellidoG,
      age: edadG,
      username: nickG,
      email: correoG,
    });
  }

  //Leer
  function leer() {
    const starCountRef = ref(db, "jugadores/");
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();

      //Crear una coleccion a partir del objeto
      const dataArray = Object.entries(data).map(([key, value]) => ({
        // ... = agrega nuevos datos sin borrar los que ya se tiene
        key,
        ...value,
      }));

      setdatos(dataArray);

      console.log(datos);
    });
  }
  //Eliminar
  function eliminar(id) {
    remove(ref(db, "jugadores/" + id));
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

        <TextInput
          placeholder="Ingrese su nombre: "
          onChangeText={(text) => setnombre(text)}
        />
        <Text>{"\n"}</Text>
        <TextInput
          placeholder="Ingrese su apellido: "
          onChangeText={(text) => setapellido(text)}
        />
        <Text>{"\n"}</Text>
        <TextInput
          placeholder="Ingrese su edad: "
          keyboardType="numeric"
          onChangeText={(text) => setedad(text)}
        />
        <Text>{"\n"}</Text>
        {/* clave primaria */}
        <TextInput
          placeholder="Ingrese un nombre de usuario: "
          onChangeText={(text) => setnick(text)}
        />
        <Text>{"\n"}</Text>
        <TextInput
          placeholder="Ingrese su correo: "
          keyboardType="email-address"
          onChangeText={(text) => setcorreo(text)}
        />
        <Text>{"\n"}</Text>
        <TextInput
          placeholder="Ingrese su contraseña: "
          onChangeText={(text) => setpass(text)}
        />
        <Text>{"\n"}</Text>
        {/* <Button title="Registrarse" onPress={() => registrarse()} /> */}

        <TouchableOpacity style={styles.btn1} onPress={() => registrarse()}>
          <Text style={styles.txtBtn1}>Registrarse</Text>
        </TouchableOpacity>

        {/* <Button title="Leer" onPress={() => leer()} /> */}

        <FlatList
          data={datos}
          renderItem={({ item }) => (
            <View>
              <Text>{item.key}</Text>
              <Button title="Eliminar" onPress={() => eliminar(item.key)} />
            </View>
          )}
        />
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
  txt2: {
    fontSize: 20,
    alignSelf: "flex-start",
    paddingHorizontal: 28,
    color: "#00ff00",
    fontStyle: "italic",
  },
  btn1: {
    backgroundColor: "#00ff00",
    top: -10,
    width: "30%",
    height: "6%",
    borderRadius: 18,
    alignSelf: "center",
    fontSize: 20,
  },
  txtBtn1: {
    alignSelf: "center",
    fontStyle: "italic",
    backgroundColor: "#00ff00",
  },
  fila: {
    flexDirection: "row",
    width: "40%",
    height: "45%",
    alignSelf: "center",
  },
  imgTitle: {
    width: 360,
    height: 70,
    alignSelf: "center",
  },
});
