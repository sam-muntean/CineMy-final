import React, { Component } from 'react';
import {
  FlatList,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  Text,
  Alert,
  Button,
  View,
  RefreshControl,
  ActivityIndicator
} from 'react-native';

import {Movie} from './Movie';

const firebase = require('firebase');

const firebaseConfig = {
    apiKey: "AIzaSyBohnrS0fL2puVEirUgR9MhLqjB41Iwm5M",
    authDomain: "awesomeproject-d8a43.firebaseapp.com",
    databaseURL: "https://awesome-project-d8a43.firebaseio.com/",
    projectId: "awesome-project-d8a43",
    storageBucket: "",
    persistance:true
  };

export const firebaseApp = firebase.initializeApp(firebaseConfig);

export class Movies extends Component {
  constructor(props) {
    super(props);
    this._onRefresh = this._onRefresh.bind(this);
    this.state = {
      refreshing: false,
      movies: [],
      loading: true,
      name: ''
    };
    this.items = this.getRef().child('movies');
    this.currentuser = firebase.auth().currentUser.uid;
    console.log("-------------" + this.currentuser);
    //this.items.push("movie").push(movies[0]);
    //this.items.push("movie").push(movies[1]);
  }

  onPress(){
    this.getRef().child("users").child(this.currentuser).once('value').then( snapshot =>{
      var username = (snapshot.val());
      if (username === "admin") {
        Alert.alert('','Only users can request movies',
          [
            {text: 'OK',
              onPress: () => console.log("ok")}
          ],
          {cancelable: true}
        )
      } else {

        if (this.state.name !== '')
          console.log("s")
        //Communications.email(['sam.muntean@gmail.com'],null,null,'Movie requested', this.state.name)
        else
          Alert.alert('No text to send...')
      }
  });
  }

  getRef() {
    return firebaseApp.database().ref();
  }

  _onRefresh() {
    this.setState({refreshing:true});
    this.setState({refreshing:false});
    this.getItems(this.items);
  }

  componentWillMount(){
    this.getItems(this.items);
  }

  getItems(items){
    items.on('value', (snap) => {

      // get children as an array
      var items = [];
      snap.forEach((child) => {
        items.push({
          movie: child.val().movie,
          key: child.key
        });
      });
      //console.log("saywhaaaaa");
      console.log(items);
      this.setState({
        movies: items
      });
      this.setState({loading: false});
    });
  }

  delete(key,username){
    if(username === "admin")
    {
      Alert.alert('INFO','Are you sure you want to delete this movie?',
        [
          {text: 'Yes',
            onPress: () => {
              this.items.child(key).remove();
              this._onRefresh();
            }},
          {
            text: 'No',
            onPress: () => console.log("no")}
        ],
        {cancelable: true}
      )}

    if(username === "user")
    {
      console.log(username);
      Alert.alert('','Only admins can delete movies!',
        [
          {text: 'OK',
            onPress: () => console.log("ok")}
        ],
        {cancelable: true}
      )
    }
  }

  showAlert(title,key){
    this.getRef().child("users").child(this.currentuser).once('value').then( snapshot =>{
      var username = (snapshot.val());
      console.log("-----------" + username);
      this.delete(key,username);
    });

  }

  render() {
    const {navigate} = this.props.navigation;
    if(this.state.loading !== true) {
      return (
      <View style={styles.container}>
        <TextInput
          style={{height: 40, borderColor: 'gray', marginBottom:8}}
          placeholder="movie"
          onChangeText={(name) => this.setState({name})}
        />

        <Button
          onPress={this.onPress.bind(this)}
          style={styles.buttonStyle}
          title="SEND"
        />

        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerText}>MOVIES</Text>
          </View>

          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh.bind(this)}
              />
            }
            data = { this.state.movies }

            renderItem={

              ({item}) =>
                <ScrollView>
                  <View style={styles.linearView}>
                    <Text style={styles.item} onPress={
                      () => navigate('Details', {movie: item.movie, key:item.key, refresh: this._onRefresh})}>{item.movie.title}  Score: {item.movie.score}</Text>
                    <View style={styles.deleteView}>
                      <TouchableOpacity style={styles.deleteButton}
                                        onPress={ () => { this.showAlert(item.movie.title,item.key);
                                          console.log("########", item.key)}}>
                        <Text style={styles.reserveButtonText}>Delete</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </ScrollView>
            }
            extraData = {this.state.movies}
          />
          <View>
            <TouchableOpacity style={styles.addButton} onPress={() => {
              this.getRef().child("users").child(this.currentuser).once('value').then(snapshot => {
                var username = (snapshot.val());
                console.log("-----------" + username);
                if (username === "admin") {
                  navigate('AddMovie', {refresh: this._onRefresh})
                }
                if (username === "user") {
                  console.log(username);
                  Alert.alert('', 'Only admins can add Movies.',
                    [
                      {
                        text: 'OK',
                        onPress: () => console.log("no")
                      }
                    ],
                    {cancelable: true}
                  )
                }
              });

            }
            }
            >
              <Text style={styles.reserveButtonText}> Add movie </Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity style={styles.signOutButton} onPress={() =>
              navigate('Home')}>
              <Text style={styles.reserveButtonText}> Sign out </Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    );
        }
    else
        {
      return(
        <View>
          <View style={styles.header}>
            <Text style={styles.headerText}>MOVIES</Text>
          </View>
          <ActivityIndicator size="large" color="#E91E63" />
        </View>
      )
    }
  }
}

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
    // justifyContent: 'flex-start',
    // alignItems: 'flex-start',
    // backgroundColor: '#11AABE',
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
  },
  container: {
    //flex: 1,
    height:650
    //paddingTop: 22
  },
  header:{
    backgroundColor: '#121299',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 10,
    borderBottomColor: '#ddd',
    //marginTop:-40,

  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  headerText:{
    color: 'white',
    fontSize: 18,
    padding: 26,
  },
  footer: {
    //position: 'absolute',
    alignItems: 'center',
    //marginBottom:-30,
    top:10,
    flexDirection:'row',
    left: 0,
    right: 0,
  },
  reserveButton: {
    backgroundColor: '#121299',
    //borderRadius: 30,
    borderColor: '#ccc',
    //alignItems: 'center',
    justifyContent: 'center',
    marginLeft:50,
    marginBottom:45,
    marginRight:7
  },
  deleteButton: {
    backgroundColor: '#121299',
    //alignSelf:'flex-end',
    borderRadius: 30,
    borderColor: '#ccc',
    //alignItems: 'center',
    justifyContent: 'center',
    marginLeft:50,
    marginBottom:45,
    marginRight:7
  },

  signOutButton:{
    backgroundColor: '#121299',
    //borderRadius: 30,
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom:45,
    marginLeft:7,
    marginRight:7
  },
  deleteView:{
    flex: 1, flexDirection: 'row', justifyContent: 'flex-end'
  },
  addButton:{
    backgroundColor: '#121299',
    //borderRadius: 30,
    borderColor: '#ccc',
    //alignItems: 'center',
    justifyContent: 'center',
    marginRight:50,
    marginBottom:45
  },
  reserveButtonText: {
    color:'#fff',
    fontSize:24,
  },
  linearView: {
    flexDirection:'row',
    padding:8,

  },
  bookTitle:{
    color:'#121299',
    fontSize:25,
    textAlign:'center',
  }
});

var movies=[
  new Movie(
    'a2',
    53,
    "description1"
  ),
  new Movie(
    'a1',
    45,
    'description2'
  )
]

