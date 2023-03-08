import React from 'react';
import { Dimensions, ImageBackground, StyleSheet, Text, View, Button, Image } from 'react-native'; 
import { StackNavigationProp } from '@react-navigation/stack';
// it says theres an error but the image still shows up
import bg from '../assets/background.png'; 
import Baby from '../assets/landingBaby.png'; 
import Parents from '../assets/landingParents.png'; 
import Pic1 from '../assets/landingPic1.png'; 
import titlelogo from '../assets/titlelogo.png'; 

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Login'
>;

type Props = {
  navigation: ProfileScreenNavigationProp;
};

const GeneAIAPP = ({navigation}: Props) =>{
    return (
        //<View style={styles.outercontainer}>
        <ImageBackground source={bg} resizeMode="cover" style={styles.outercontainer}>
          <View style={styles.row}>
            <View style={styles.container}>
              <Image
              source={titlelogo}
              style={styles.logoimage}
              />
            </View>
              <View style={styles.row}>      
                <Text style={styles.h2}>test</Text>
                <Text style={styles.h2}>test2</Text>
                <Text style={styles.h2}>test3</Text>
                <View style={styles.buttonContainer}>
                  <Button
                  title="Log in"
                  color="#C64C85"
                  onPress={() => navigation.navigate('Login')}
                  />
                </View>
              </View>
            </View>
          <View style={styles.middlerow}>
            <View style={styles.container}>
              <Text style={styles.h2}>A ONE-OF-A-KIND DATING EXPERIENCE.</Text>
              <Text style={styles.h3}>GeneAI is the only dating app that incorporates image generation technology. Utilize novel image processing techniques to find your matches today!</Text>
              <View style={styles.buttonContainer}>
                <Button
                title="Create an Account"
                color="#C64C85"
                onPress={() => alert('Relocate to the Account Creation page.')}
                />
              </View>
            </View>
            <View style={styles.imageportioncontainer}>
              <Image
              source={Pic1}
              style={styles.topimage}
              />
            </View>
          </View>
          <View style={styles.bottomrow}>
            <View style={styles.row2}>
              <View style={styles.container}>
                <Image
                source={Baby}
                style={styles.bottomimage}
                />
              </View>
              <View style={styles.container}>
                <Image
                source={Parents}
                style={styles.bottomimage}
                />
              </View>
            </View>
            <View style={styles.container}>
              <Text style={styles.h2}>Obtain AI-Generated Renditions</Text>
              <Text style={styles.h3}>Each match allows users to obtain high quality, one-of-a-kind images of your children. </Text>
              <View style={styles.buttonContainer}>
                <Button
                title="Get It Now"
                color="#C64C85"
                onPress={() => alert('You just logged in!')}
                />
              </View>
            </View>
          </View>
        </ImageBackground>  
      //</View>
    );
};

let ScreenHeight = Dimensions.get('window').height;
let ScreenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    outercontainer: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: '#000',
        alignItems: 'center',
        width: '100%',
      },
      container: {
        flex: 1,
        justifyContent: 'space-between',
        //backgroundColor: '#000',
        alignItems: 'center',
        width: '100%',
      },
      imageportioncontainer: {
        flex: 1,
        justifyContent: 'space-between',
        //backgroundColor: '#000',
        alignItems: 'center',
        width: '100%',
      },
      row: {
        flexDirection: 'row',
        //borderBottomWidth: 1, //make sure to delete these
        //borderColor: "#008F68", //same with this
        flex: 1,
        justifyContent: 'space-between',
        //backgroundColor: '#000',
        alignItems: 'center',
        width: '70%',
      },
      middlerow: {
        flexDirection: 'row',
        //borderBottomWidth: 1, //make sure to delete these
        borderColor: "#008F68", //same with this
        flex: 3,
        justifyContent: 'space-between',
        //backgroundColor: '#000',
        alignItems: 'center',
        width: '70%',
      },
      bottomrow: {
        flexDirection: 'row',
        //borderBottomWidth: 1, //make sure to delete these
        borderColor: "#008F68", //same with this
        flex: 2,
        justifyContent: 'space-between',
        //backgroundColor: '#000',
        alignItems: 'center',
        width: '70%',
      },
      row2: {
        flexDirection: 'row',
        flex: 2,
        justifyContent: 'space-between',
        //backgroundColor: '#000',
        alignItems: 'center',
        width: '30%',
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
      topimage: {
        resizeMode:'contain',
        width: 400,
        height: 356,
        justifyContent: 'center',
      },
      bottomimage: {
        resizeMode:'contain',
        width: 300,
        height: 267,
        justifyContent: 'center',
      },
      logoimage: {
        resizeMode:'contain',
        width: 200, //fix
        height: 178,
        justifyContent: 'center',
      },
      buttonContainer: {
        //backgroundColor: '#008F68',
        borderRadius: 5,
        padding: 8,
        margin: 8,
      },
});

export default GeneAIAPP;

function render() {
    throw new Error("Function not implemented.");
}
