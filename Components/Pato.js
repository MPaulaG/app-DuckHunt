import {useWindowDimensions ,View, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";

export default function Pato(prop) {
 // console.log(prop)
  const [posicion, setposicion] = useState({ x: 0, y: 0 });

  function moverPato() {
    const MAX_X = 300;
    const MAX_Y = 400;
    // const windowDimensions = useWindowDimensions();
    // const screenWidth = windowDimensions.width;
    // const screenHeight = windowDimensions.height;

    const randomX = Math.floor(Math.random() * MAX_X); // se entiende como un numero aleatorio entre 0 y 350
    const randomY = Math.floor(Math.random() * MAX_Y); // se entiende como un numero aleatorio entre 0 y 700

    // const randomX = Math.floor(Math.random() *screenWidth); 
    // const randomY = Math.floor(Math.random() * screenHeight); 
    setposicion({ x: randomX, y: randomY });
  }


  /////Mover pato por tiempo/////
  useEffect(() => {
    const interval= setInterval(()=>{
      moverPato()

    }, 500)
    
  }, [])

  ///////////////////////////////

  function compuesta(){
    moverPato()
    prop.presionar()
  }
  
  return (
    <View style={{ top: posicion.y, left: posicion.x }}>
      <TouchableOpacity onPress={() => compuesta()}>
        <Image style={styles.imgDuck1} source={require("../assets/duck.png")} />
      </TouchableOpacity>
    </View>
  );

  // return (
  //   <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
  //     <Text>Width: {screenWidth}</Text>
  //     <Text>Height: {screenHeight}</Text>
  //   </View>
  // );
}

const styles = StyleSheet.create({
  imgDuck1: {
    width: 90,
    height: 90,
  },
});
