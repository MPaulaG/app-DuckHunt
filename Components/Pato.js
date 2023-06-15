import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';

const Pato = (prop) => {
  const [posicion, setposicion] = useState({ x: 0, y: 0 });
  const [imageSource, setImageSource] = useState(require("../assets/duck.png"));
  const [aplastado, setaplastado] = useState(false)

  function moverPato() {
    const MAX_X = 300;
    const MAX_Y = 400;

    const randomX = Math.floor(Math.random() * MAX_X);
    const randomY = Math.floor(Math.random() * MAX_Y);

    setposicion({ x: randomX, y: randomY });
  }

  useEffect(() => {
    const interval = setInterval(() => {
      moverPato();
    }, 500);

    return () => {
      clearInterval(interval);
    };
  }, []);

  function compuesta() {
    if (aplastado) {
      setaplastado(false);
      setImageSource(require("../assets/duck.png"));
    } else {
      setaplastado(true);
      setImageSource(require("../assets/patoAtrapado.png"));
    }
    moverPato();
    prop.presionar();
  }

  return (
    <View style={{ top: posicion.y, left: posicion.x }}>
      <TouchableOpacity onPress={() => compuesta()}>
        <Image style={styles.imgDuck1} source={imageSource} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  imgDuck1: {
    width: 90,
    height: 90,
    resizeMode: 'contain',
  },
});

export default Pato;




//////////////////hecho en clase
// export default function Pato(prop) {  
//   const [posicion, setposicion] = useState({ x: 0, y: 0 });
  
//     function moverPato() {
//       const MAX_X = 300;
//       const MAX_Y = 400;
   
  
//       const randomX = Math.floor(Math.random() * MAX_X); // se entiende como un numero aleatorio entre 0 y 350
//       const randomY = Math.floor(Math.random() * MAX_Y); // se entiende como un numero aleatorio entre 0 y 700
  
//     }
  
//   useEffect(() => {
//       const interval= setInterval(()=>{
//         moverPato()
  
//       }, 500)
      
//     }, [])
  
   
  
//     function compuesta(){
//       moverPato()
//       prop.presionar()
//     }
  
//    return (
//       <View style={{ top: posicion.y, left: posicion.x }}>
//         <TouchableOpacity onPress={() => compuesta()}>
//           <Image style={styles.imgDuck1} source={require("../assets/duck.png")} />
//         </TouchableOpacity>
//       </View>
//     );
//   }