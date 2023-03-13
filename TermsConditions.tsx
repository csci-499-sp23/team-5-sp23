import React from "react"
import { Dimensions, ImageBackground, StyleSheet, Text, View, Button, Image } from 'react-native'; 

const TermConditions = () => {
    return(
        <View
        style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <Text>THIS IS THE TOS PAGE!</Text>
        </View>
    );
};

const styles = StyleSheet.create({
  body: {
    margin: 0,
    pading: 0,
    backgroundColor: '#f08080',
    minHeight: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  popup: {
    maxWidth: 500,
    backgroundColor: '#D3D3D3',
    fontFamily: 'Georgia',
    padding: 50,
  },

  text: {
    padding: 400,
    fontSize: 15,
    height: 550, 
    fontWeight: 200,

  },
  
  
});


export default TermConditions;