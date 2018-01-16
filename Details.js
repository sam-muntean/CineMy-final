import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TextInput,
  Button,
  AsyncStorage,
  TouchableOpacity,
  Picker,

} from 'react-native';
//import {StackNavigator, SafeAreaView} from 'react-navigation';
import {firebaseApp} from './Movies'
//import {NotificationsAndroid} from 'react-native-notifications';

export class Details extends Component{
  static navigationOptions = {
    //title: 'Home',
    //header:null,
  };

  constructor(props) {
    super(props);
    this.state = {
      newScore: ""
    };
  }

  updateScore(index, score) {
    const items = firebaseApp.database().ref().child('movies');


    items.child(index).child("movie").child("score").set(score);
    // NotificationsAndroid.localNotification({
    //   title: "Movie",
    //   body: "An update happened!",
    //   extra: "data"
    // });
  }

  render() {
    const {params} = this.props.navigation.state;
    const {state} = this.props.navigation;
    const {goBack} = this.props.navigation;

    var movie = state.params ? state.params.movie : "<undefined>";
    var key = params ? params.key : "<undefined>"

    return (
      <View>
      <ScrollView>
        <View style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Text style = {{ fontSize:30, textAlign:'center' }} >{movie.title}</Text>
          <Text style = {{ fontSize:10, textAlign:'left' }} >pick a score: </Text>

          <Picker style = {{width:150}}
            selectedValue={this.state.newScore}
                  mode = 'dialog'
            onValueChange={(itemValue, itemIndex) => this.setState({newScore: itemValue})}>
            <Picker.Item label="10" value="10" />
            <Picker.Item label="30" value="30" />
            <Picker.Item label="55" value="55" />
            <Picker.Item label="60" value="60" />
            <Picker.Item label="85" value="85" />
            <Picker.Item label="100" value="100" />

          </Picker>

          {/*<TextInput style = {{width:150,textAlign:'center'}}*/}
                     {/*placeholder={movie.score}*/}
                     {/*onChangeText={(text) => this.setState({newScore: text})}*/}
          {/*/>*/}
          <ScrollView>
            <Text style={{height: 300, width: 350, marginTop:10 }} multiline={true}> {movie.description} </Text>
          </ScrollView>
        </View>
      </ScrollView>
      <View>
      <TouchableOpacity style = {{alignItems: 'center', backgroundColor: '#DDDDDD', padding: 10}}  onPress={
    () => {
      if (this.state.newScore) {
        this.updateScore(key, this.state.newScore);
      }
      params.refresh();
      goBack();
    }
  }>
  <Text> SAVE </Text>
  </TouchableOpacity>
    {/*<TouchableOpacity onPress={() =>*/}
      {/*navigate('Chart',{title:book.title})}>*/}
      {/*<Text > Chart </Text>*/}
      {/*</TouchableOpacity>*/}
    </View>
      </View>
    );
  }
}
