import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput
} from 'react-native';
import React, { Component } from 'react';
import {Movie} from './Movie'
import {firebaseApp} from './Movies'

export class AddMovie extends Component{

  save()
  {
    const items = firebaseApp.database().ref().child('movies');
    items.push({movie :new Movie(this.state.title,this.state.score,this.state.desc)});
  }

  render(){
    const {params} = this.props.navigation.state;
    const {goBack} = this.props.navigation;
    return(

      <View>
        <ScrollView>
          <View style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <Text style = {styles.title}>Insert Movie</Text>
            <TextInput style= {{alignSelf: 'stretch'}} placeholder="  Title" onChangeText={(text) => this.setState({title: text})}/>
            <TextInput style= {{alignSelf: 'stretch'}} placeholder="  Score" onChangeText={(text) => this.setState({score: text})}/>
            <TextInput style={{alignSelf: 'stretch'}} placeholder ="  Description" multiline={true} onChangeText={(text) => this.setState({desc: text})} />

          </View>
        </ScrollView>
        <View>
          <TouchableOpacity style={styles.reserveButton}
                            onPress={
                              () =>{
                                this.save();
                                params.refresh();
                                goBack();
                              }
                            }

          >
            <Text style={styles.reserveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    position: 'absolute',
    alignItems: 'center',
    bottom: 0,
    left: 0,
    right: 0,
  },
  reserveButton: {
    backgroundColor: '#121299',
    //borderRadius: 30,
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom:45,

  },
  reserveButtonText: {
    color:'#fff',
    fontSize:24,
  },
  linearView: {
    flexDirection:'row',
    padding:8,
  },
  title:{
    color:'#121299',
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
