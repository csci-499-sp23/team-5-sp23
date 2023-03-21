import React from 'react';
import './Home-Page.css';
import bg from './img/background.png'; 
import titlelogo from './img/titlelogo.png'; 

// import Baby from '../assets/landingBaby.png'; 
// import Parents from '../assets/landingParents.png'; 
// import Pic1 from '../assets/landingPic1.png'; 

const Home = () => {
    return (
        <div className='outercontainer' style={{backgroundImage: `url(${bg})`, backgroundRepeat: "no-repeat", backgroundSize: "cover"}}> 
            <div className='row'>                
                <div className='container'>
                    <img
                    src={titlelogo}
                    className='logoimage'
                    alt='GeneAI'/>
                </div>
                <div className='row'>      
                    <div className='buttonContainertemp'>
                        <button>
                            <p>Log in</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;

// const GeneAIAPP = ({navigation}: Props) =>{
//     return (
    
//               
//                   
//                 </View>
//                 <View style={styles.buttonContainertemp}>
//                   <Button
//                   title="Signup"
//                   color="#C64C85"
//                   onPress={() => navigation.navigate('Signup')}
//                   />
//                 </View>
//                 <View style={styles.buttonContainertemp}>
//                   <Button
//                   title="Matchup"
//                   color="#C64C85"
//                   onPress={() => navigation.navigate('Matchup')}
//                   />
//                 </View>
//                 <View style={styles.buttonContainertemp}>
//                   <Button
//                   title="Messaging"
//                   color="#C64C85"
//                   onPress={() => navigation.navigate('Messaging')}
//                   />
//                 </View>
//                 <View style={styles.buttonContainertemp}>
//                   <Button
//                   title="Profile"
//                   color="#C64C85"
//                   onPress={() => navigation.navigate('Profile')}
//                   />
//                 </View>
//                 <View style={styles.buttonContainertemp}>
//                   <Button
//                   title="TOS"
//                   color="#C64C85"
//                   onPress={() => navigation.navigate('TOS')}
//                   />
//                 </View>
//               </View>
//             </View>
//           <View style={styles.middlerow}>
//             <View style={styles.container}>
//               <Text style={styles.h2}>A ONE-OF-A-KIND DATING EXPERIENCE.</Text>
//               <Text style={styles.h3}>GeneAI is the only dating app that incorporates image generation technology. Utilize novel image processing techniques to find your matches today!</Text>
//             <View style={styles.buttonContainer}>
//               <Button
//               title="Create an Account"
//               color="#C64C85"
//               onPress={() => alert('Relocate to the Account Creation page.')}
//               />
//             </View>
//           </View>
//             <View style={styles.imageportioncontainer}>
//               <Image
//               source={Pic1}
//               style={styles.topimage}
//               />
//             </View>
//           </View>
//           <View style={styles.bottomrow}>
//             <View style={styles.row2}>
//               <View style={styles.container}>
//                 <Image
//                 source={Baby}
//                 style={styles.bottomimage}
//                 />
//               </View>
//               <View style={styles.container}>
//                 <Image
//                 source={Parents}
//                 style={styles.bottomimage}
//                 />
//               </View>
//             </View>
//             <View style={styles.container}>
//               <Text style={styles.h2}>Obtain AI-Generated Renditions</Text>
//               <Text style={styles.h3}>Each match allows users to obtain high quality, one-of-a-kind images of your children. </Text>
//               <View style={styles.buttonContainer}>
//                 <Button
//                 title="Get It Now"
//                 color="#C64C85"
//                 onPress={() => alert('You just logged in!')}
//                 />
//               </View>
//             </View>
//           </View>
//         </ImageBackground>  
//       //</View>
//     );
// };

