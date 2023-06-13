import { View, Text,StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

export default function Pato() {

    const [posicion, setposicion] = useState({x:0, y:0})


    function moverPato(){
        const MAX_X= 300;
        const MAX_Y= 400;

        const randomX= Math.floor(Math.random() * MAX_X) // se entiende como un numero aleatorio entre 0 y 350
        const randomY= Math.floor(Math.random() * MAX_Y) // se entiende como un numero aleatorio entre 0 y 700

        setposicion({x:randomX, y:randomY})
    }
  return (
    <View style={{top:posicion.y, left:posicion.x}}>
       <TouchableOpacity onPress={()=>moverPato()}>
       <Image style={styles.imgDuck1} source={require("../assets/duck.png")} />
       </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    imgDuck1: {
      width: 90,
      height: 90,
    },
  });
  