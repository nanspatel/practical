import React, { Component } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';

var ed = false;
var id=null
export default class App extends Component {
  state = {
    data: [],
    name: null,email:null,
    arrayHolder: [],id:null,edt:null
    ,edname:null,edemail:null
  };

  componentDidMount(){
    this.fetchData();
    
  }

  fetchData = async () => {
    const response = await fetch('https://reqres.in/api/users?page=1');
    const json = await response.json();
    this.setState({ data: json.data });
    console.log(this.state.data, 'hiih', this.state.data.length);
  };

  AddItemstoArray = () => {
   this.state.name!==null && this.state.data.push({
      first_name: this.state.name.toString(),
      last_name: '',
      email:this.state.email,id:this.state.data.length+1
    });

    this.setState({
      data: this.state.data,
    });
    console.log(this.state.data, 'push data');

  };
 editdata=(id)=>{
     this.ed=true
     this.id=id
     this.setState({
    id:id
   });
   console.log( 'iddd',this.ed,this.id);
  }
  update=(id,edname,edmail)=>{
    console.log(' update',this.id)
    this.state.data.map((item,index)=>{ 
       console.log(' item.id',item.id,edname,edmail)
       if(id==item.id){
         item.first_name=edname
         item.last_name=''
         item.email=edmail
          console.log(' item.id',item.first_name,item.email)
    
       }

       }
    )
    this.setState({
      data: this.state.data,
    });
      console.log(this.state.data)
  }
  

//   swipesetings =( id )=> {
//   const filteredData = this.state.data.filter(item => item.id == id);
//   this.setState({ data: filteredData });
//   console.log(this.state.data, 'dataaaaa deleted');

// }
  render() {
    
    return (
      
      <View style={styles.container}>
      <View style={{margin:10,justifyContent:'center',alignItems:'center',alignSelf:'center',borderBottomColor:'red'}}><Text style={{fontSize:30,fontWeight:'bold',color:'red'}}>User Data</Text></View>
        <FlatList
          data={this.state.data}
          keyExtractor={(x, i) => i}
          renderItem={({ item, index }) => (
            <View style={{ flexDirection: 'row',alignItems:'center' ,flex:1,}}>

<View style={{flexDirection:'column',justifyContent:'flex-start',marginBottom:10}}>
              <Text style={{}}>{`${item.first_name} ${item.last_name}`}</Text>
            
              <Text style={{marginLeft:0}}>{`${item.email} `}</Text>
              </View>
              <View style={{justifyContent:'flex-start',alignItems:'flex-start',
              alignSelf:'center'}}>
                 <TouchableOpacity
          style={styles.Button}
        
     onPress={()=>{this.editdata(item.id)
    //  console.log('is',item.id)
    }}
          >
          <Text
            style={{ fontSize: 30, fontWeight: 'bold', textAlign: 'center' }}>
            edit
          </Text>
        </TouchableOpacity>
        </View>
            </View>
          )}
        />
        <TextInput
          style={styles.input}
          placeholder="add name"
          onChangeText={(txt) => this.setState({ name: txt })}></TextInput>
          <TextInput
          style={styles.input}
          placeholder="add email"
          onChangeText={(txt) => this.setState({ email: txt })}></TextInput>
        <TouchableOpacity
          style={styles.Button}
        
          onPress={this.AddItemstoArray}>
          <Text
            style={{ fontSize: 30, fontWeight: 'bold', textAlign: 'center' }}>
            add
          </Text>
        </TouchableOpacity>


        {this.ed==true && 
        <View style={{flexDirection:'column'}}>
        <TextInput
          style={styles.input}
          placeholder="edit name"
          onChangeText={(txt) => this.setState({ edname: txt })}></TextInput>
          <TextInput
          style={styles.input}
          placeholder="edit email"
          onChangeText={(txt) => this.setState({ edemail: txt })}></TextInput>
           <TouchableOpacity
          style={styles.Button}
          
          onPress=
          {()=>{this.update(this.id,this.state.edname,this.state.edemail)
    //  console.log('id 4 update',this.id)
     }}
          >
          <Text
            style={{  fontSize: 25, fontWeight: 'bold', textAlign: 'center' }}>
            update
          </Text>
        </TouchableOpacity>
          </View>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
   margin:10,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
   
  },
  input: {
    fontSize: 10,
    fontWeight: 'bold',
    margin: 5,
    justifyContent:'center'
  },
  Button: {
    backgroundColor: '#508006',
    margin: 5,
    height: 38,
    width: 100,
    borderRadius: 5,justifyContent:'flex-end',alignItems:'center'
  },
});
