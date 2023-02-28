import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import Logo from './assets/background.png'; // it says theres an error but the image still shows up

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.h1}>GeneAI</Text>
        <Text style={styles.h2}>A ONE-OF-A-KIND DATING EXPERIENCE.</Text>
        <Image
          source={Logo}
          style={styles.image}
        />
        <View style={styles.buttonContainer}>
          <Button
          title="Press me"
          color="#f194ff"
          onPress={() => alert('Button with adjusted color pressed')}
        />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#000',
    alignItems: 'center',
    width: '100%',
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
  image: {
    width: 300,
    height: 260,
    justifyContent: 'center',
  },
  buttonContainer: {
    backgroundColor: '#008F68',
    borderRadius: 5,
    padding: 8,
    margin: 8,
  },
});