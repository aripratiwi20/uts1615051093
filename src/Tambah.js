import React from 'react';
import { StyleSheet,
 Text, 
 Button,
 TouchableOpacity,
 View, 
 ImageBackground,
 StatusBar,
 Image,
 TextInput,
 ScrollView,
 Alert, ActivityIndicator
} from 'react-native';
import { StackNavigator } from 'react-navigation';
const home = require('./img/home.png');
const custemer = require('./img/custemer.png');
const tambah = require('./img/tambah.png');
class TambahScreen extends React.Component {
  static navigationOptions = {
    header: null
 };
  
  constructor()
    {
        super();
        this.state = {
          Nama: '',
          KodeBuku: '',
          alamat: '',
          NoHP: '',
          ActivityIndicator_Loading: false,
        }
    }
    Insert_Data_Into_MySQL = () =>

    {

        this.setState({ ActivityIndicator_Loading : true }, () =>

        {

            fetch('http://mhs.rey1024.com/appmobile/D1615051093/kirimData.php',

            {

                method: 'POST',

                headers: 

                {

                    'Accept': 'application/json',

                    'Content-Type': 'application/json',

                },

                body: JSON.stringify(

                {

                  Nama : this.state.Nama,

                  alamat : this.state.alamat,

                  KodeBuku : this.state.KodeBuku,

                  NoHP : this.state.NoHP,
                })

 

            }).then((response) => response.json()).then((responseJsonFromServer) =>

            {

                Alert.alert(responseJsonFromServer);

                this.setState({ ActivityIndicator_Loading : false });

            }).catch((error) =>

            {

                console.error(error);

                this.setState({ ActivityIndicator_Loading : false});

            });

        });

    }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator color='#FFFFFF' size='large'/>
        </View>
      );
    }

    return(
      <ImageBackground
          source={require('./img/bg1.jpg')}
          style={styles.container}>
            <View style={styles.containerMain}>
              <StatusBar
                backgroundColor="#AD1457"
                barStyle="light-content"
              />
              <Text style={styles.title}>Peminjaman Buku</Text>
              <Text style={styles.subTitle}>Tambah Peminjaman</Text>
              <View style={{ backgroundColor: 'rgba(255,255,255, .4)', marginTop: 15 }}>
              <ScrollView>
               <Text style={styles.judul} >Nama Peminjam :</Text>
              <TextInput
                  style={styles.isian} 
                  placeholder="Masukan Nama Peminjam"
                  onChangeText = {(TextInputText) => this.setState({ Nama: TextInputText })}
                  
              />
              <Text style={styles.judul} >ALamat Peminjam :</Text>
              <TextInput
                  style={styles.isian}
                  placeholder="Masukan Alamat Peminjam"
                  onChangeText = {(TextInputText) => this.setState({ alamat: TextInputText })}
                  
              />
              <Text style={styles.judul} >KodeBuku :</Text>
              <TextInput
                  style={styles.isian}
                  placeholder="Masukan Kode Buku"
                  onChangeText = {(TextInputText) => this.setState({ KodeBuku: TextInputText })}
                  
              />
              <Text style={styles.judul} >Nomor HP :</Text>
              <TextInput
                  style={styles.isian}
                  placeholder="Masukan Nomor HP Custemer"
                  onChangeText = {(TextInputText) => this.setState({ NoHP: TextInputText })}
                  
              />
              </ScrollView>
              </View>
              <View style={{alignItems: 'center'}}>
              <TouchableOpacity style={styles.button}
                  onPress={this.Insert_Data_Into_MySQL}>
                <Text style={{ fontSize: 17, color: '#fff',fontWeight: 'bold' }}>Tambah Peminjaman</Text>
              </TouchableOpacity>
              </View>

            </View>
            <View style={styles.menuContainer}>
          <TouchableOpacity style={styles.menu} onPress={() => this.props.navigation.navigate('HomeScreen')}>
          <Image source={home} style={styles.menuIcon} />
            
          </TouchableOpacity> 
        </View>
          </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%'
  },
  containerMain: {
    flex: 1,
    
  },
  title: {
    
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 25,
    paddingBottom: 5,
    textAlign: 'center',
    backgroundColor: 'rgba(76,175,80, .6)'
  },
  subTitle: {
    backgroundColor: 'rgba(76,175,80, .6)',
    color: '#fff',
    fontSize: 14,
    paddingBottom: 12,
    textAlign: 'center',
  },
  menuContainer: {
    backgroundColor: 'rgba(27,94,32, .6)',
    paddingVertical: 12,
    flexDirection: 'row',
    flex: 0.05,

  },
  menu:{
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1 
  },
  menuIcon:{
    tintColor: '#000',
    height: 30,
    width: 30,
  },
  menuIconSelected:{
    color: '#00BCD4',
    textAlign: 'center'
  },
  isian: {
    //backgroundColor: 'rgba(255,255,255, .6)',
    width: '100%',
    padding: 10,
    fontSize: 15,
    color: '#000'
  },
  judul: {
    padding: 1, 
    fontSize: 20, 
    color: '#000', 
    fontWeight: 'bold'
  },
  button: {
    height: 35,
    width: 170,
    backgroundColor: '#01579b',
    alignItems: 'center',
    borderRadius: 12,
    margin: 10, 
    justifyContent: 'center',
  }
});

export default TambahScreen;