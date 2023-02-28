import React from 'react';
import { Dimensions, ImageBackground, StyleSheet, Text, View, Button, Image } from 'react-native';
// it says theres an error but the image still shows up
import bg from './assets/background.png'; 
import Baby from './assets/landingBaby.png'; 
import Parents from './assets/landingParents.png'; 
import Pic1 from './assets/landingPic1.png'; 

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <View style={styles.container}>
            <Text style={styles.h1}>GeneAI</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.h2}>test</Text>
            <Text style={styles.h2}>test2</Text>
            <Text style={styles.h2}>test3</Text>
            <View style={styles.buttonContainer}>
              <Button
              title="Log in"
              color="#f194ff"
              onPress={() => alert('You just logged in!')}
              />
            </View>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.container}>
            <Text style={styles.h2}>A ONE-OF-A-KIND DATING EXPERIENCE.</Text>
            <Text style={styles.h3}>GeneAI is the only dating app that incorporates image generation technology. Utilize novel image processing techniques to find your matches today!</Text>
            <View style={styles.buttonContainer}>
              <Button
              title="Create an Account"
              color="#f194ff"
              onPress={() => alert('Relocate to the Account Creation page.')}
              />
            </View>
          </View>
          <View style={styles.container}>
            <Image
            source={Pic1}
            style={styles.image}
            />
          </View>
        </View>
        
      </View>
    );
  }
}

let ScreenHeight = Dimensions.get('window').height;
let ScreenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#000',
    alignItems: 'center',
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#000',
    alignItems: 'center',
    width: '70%',
  },
  h1: {
    color: '#008F68',
    fontSize: 40,
  },
  h2: {
    color: '#FAE042',
    fontSize: 18,
    marginTop: 8,
  },
  h3: {
    color: '#FAE042',
    fontSize: 12,
    marginTop: 8,
  },
  image: {
    resizeMode:'contain',
    width: 400,
    height: 347,
    justifyContent: 'center',
  },
  buttonContainer: {
    backgroundColor: '#008F68',
    borderRadius: 5,
    padding: 8,
    margin: 8,
  },
});