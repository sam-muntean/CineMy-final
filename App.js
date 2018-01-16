/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  FlatList,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  Text,
  Alert,
  Button,
  View
} from 'react-native';

import {StackNavigator} from 'react-navigation';

import {LoginForm} from './LoginForm';
import {Movies} from "./Movies";
import {Details} from "./Details";
import {AddMovie} from "./AddMovie";

//import Communications from 'react-native-communications';

// var movies=[
//   {
//     key: '1',
//     title: 'Fight Club',
//     description: "When he meets Marla (Helena Bonham Carter), another fake attendee of support groups, his life seems to become a little more bearable. However when he associates himself with Tyler (Brad Pitt) he is dragged into an underground fight club and soap making scheme.",
//     image: require('./img/fight-club.jpg'),
//     score: '12'
//   },
//   {
//     key:'2',
//     title: 'Star wars 1',
//     description: 'Stranded on the desert planet Tatooine after rescuing young Queen Amidala from the impending invasion of Naboo, Jedi apprentice Obi-Wan Kenobi and his Jedi Master Qui-Gon Jinn discover nine-year-old Anakin Skywalker, a young slave unusually strong in the Force.',
//     image: require('./img/star-wars.png'),
//     score: '23',},
//   {
//     key:'3',
//     title: 'The godfather II',
//     description: "GThe compelling sequel to The Godfather, contrasting the life of Corleone father and son. Traces the problems of Michael Corleone (Al Pacino) in 1958 and that of a young immigrant Vito Corleone (Robert De Niro) in 1917's Hell's Kitchen. Michael survives many misfortunes and Vito is introduced to a life of crime.",
//     image: require('./img/the-godfather-ii.jpg'),
//     score: '55',},
// ]
//
//

// class App1 extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {name: ''};
//   }
//
//   onPress(){
//     if (this.state.name !== '')
//       Communications.email(['sam.muntean@gmail.com'],null,null,'Movie requested', this.state.name)
//     else
//       Alert.alert('No text to send...')
//   }
//
//   render() {
//     const {navigate} = this.props.navigation;
//     return (
//
//       <View style={styles.container}>
//         <TextInput
//           style={{height: 40, borderColor: 'gray', marginBottom:8}}
//           placeholder="movie"
//           onChangeText={(name) => this.setState({name})}
//         />
//
//         <Button
//           onPress={this.onPress.bind(this)}
//           style={styles.buttonStyle}
//           title="SEND"
//         />
//
//         <View style={styles.container}>
//           <View style = {styles.header}>
//             <Text style = {styles.headerText}>Movies</Text>
//           </View>
//           <FlatList
//             data = { movies }
//             renderItem={
//               ({item}) =>
//                 <ScrollView>
//                   <View style={styles.linearView} >
//                     <Image style= {{ height:70, width: 50, resizeMode: 'contain' }}
//                            source={item.image} />
//                     <Text style={styles.item} onPress={
//                       () => navigate('Details',{ movie : item })
//                     } >{item.title}</Text>
//                     <Text style={styles.score}> Score: {item.score} </Text>
//                   </View>
//                 </ScrollView>
//             }
//           />
//         </View>
//       </View>
//     );
//   }
// }

// class Details extends Component{
//   static navigationOptions = {
//     //title: 'Home',
//     header:null,
//   };
//   render() {
//     const {state} = this.props.navigation;
//     var movie = state.params ? state.params.movie : "<undefined>";
//     return (
//       <ScrollView>
//         <View style={{
//           justifyContent: 'center',
//           alignItems: 'center',
//         }}>
//           <Text style = {styles.movieTitle}>- {movie.title} -</Text>
//           <TextInput style = {{width:150,textAlign:'center'}}
//             placeholder={movie.score}
//             onChangeText={(name) => movies[movies.indexOf(movie)].score = {name}}
//           />
//           <Image style={styles.detailedImage} source={movie.image}/>
//           <ScrollView>
//             <Text style={{height: 300, width: 350, marginTop:10 }} multiline={true}> {movie.description} </Text>
//           </ScrollView>
//         </View>
//       </ScrollView>
//     );
//   }
// }

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: '#aaabdf',
    flex: 1,
    height: 65,
    width: 35,
  },
  textInput:{
    height: 65,
    width: 35,
    flex: 1,
  },
  container: {
     flex: 1,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  header:{
    backgroundColor: '#111121',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 10,
    borderBottomColor: '#ddd',
  },
  item: {
    padding: 10,
    fontSize: 20,
    fontWeight: 'bold',
    height: 44,
  },
  linearView: {
    flexDirection:'row',
    flex: 1,
    padding:8,
  },
  score:{
    padding: 10,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    fontSize: 16,
  },
  headerText:{
    color: 'white',
    fontSize: 26,
    padding: 15,
  },
  movieTitle:{
    color:'#333333',
    fontSize:25,
    textAlign:'center',
  },
  detailedImage: {
    height:220,
    width: 200,
    resizeMode: 'contain',
    marginBottom:28,
    marginTop:28
  }
});

const NavigationApp = StackNavigator({
  Home: {screen: LoginForm},
  Movies: {screen: Movies},
  Details: {screen: Details},
  AddMovie: {screen: AddMovie},
  //Chart: {screen: Chart}
});

export default class App extends Component{
  render(){
    return <NavigationApp/>;
  }
}
