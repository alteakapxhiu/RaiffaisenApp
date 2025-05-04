import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  SafeAreaView,
  Image,
  TextInput,
  Alert,
  ScrollView,
  Modal
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import * as DocumentPicker from 'expo-document-picker';


// Screens
function LoginScreen({ navigation }) {
  const [showLogin, setShowLogin] = useState(false);
  const [pin, setPin] = useState('');
  const [language, setLanguage] = useState('ALB');

  const strings = {
    ALB: {
      help: 'NDIHMË',
      personal: 'Llogari personale',
      business: 'Llogari biznesi',
      enterPin: 'Vendos kodin PIN',
      changeMethod: 'Ndrysho metodën për të hyrë?',
      login: 'Hyr',
      activate: 'Aktivizo mobile',
      becomeClient: 'Bëhu klient',
      helpMsg: 'Për ndihmë, kontaktoni suportin.',
    },
    ENG: {
      help: 'HELP',
      personal: 'Personal account',
      business: 'Business account',
      enterPin: 'Enter PIN code',
      changeMethod: 'Change login method?',
      login: 'Login',
      activate: 'Activate mobile',
      becomeClient: 'Become a client',
      helpMsg: 'For help, contact support.',
    },
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowLogin(true);
    }, 1500);
    return () => clearTimeout(timeout);
  }, []);

  const lang = strings[language];

  const handleLogin = () => {
    if (pin === '1234') {
      navigation.replace('MainTabs'); // Navigate to bottom tabs
    } else {
      Alert.alert('Error', 'Incorrect PIN');
    }
  };

  const handleHelp = () => {
    Alert.alert(lang.help, lang.helpMsg);
  };

  const handleActivateMobile = () => {
    Alert.alert(lang.activate, 'Feature coming soon!');
  };

  const handleBecomeClient = () => {
    Alert.alert(lang.becomeClient, 'Redirecting to registration...');
  };

  if (!showLogin) {
    return (
      <View style={styles.splashContainer}>
        <ActivityIndicator size="large" color="#000" />
        <Text style={styles.splashText}>Please wait...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.loginContainer}>
      <View style={styles.header}>
        <View style={styles.languageRow}>
          <TouchableOpacity onPress={() => setLanguage('ENG')}>
            <Text style={[styles.language, language === 'ENG' && styles.languageActive]}>ENG</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setLanguage('ALB')}>
            <Text style={[styles.language, language === 'ALB' && styles.languageActive]}>ALB</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={handleHelp} style={styles.helpButton}>
          <Text style={styles.help}>{lang.help}</Text>
        </TouchableOpacity>

        <Image
          source={{
            uri: 'https://thafd.bing.com/th/id/OIP.QoVNzQdiaU5lijiQRETZoQHaHa?rs=1&pid=ImgDetMain',
          }}
          style={styles.logoImage}
          resizeMode="contain"
        />
      </View>



      <View style={styles.tabSelector}>
        <Text style={[styles.tab, styles.tabActive]}>{lang.personal}</Text>
        <Text style={styles.tab}>{lang.business}</Text>
      </View>

      <Text style={styles.pinLabel}>{lang.enterPin}</Text>
      <Text style={styles.pinLink}>{lang.changeMethod}</Text>

      <TextInput
        style={styles.input}
        secureTextEntry
        keyboardType="number-pad"
        maxLength={4}
        value={pin}
        onChangeText={setPin}
        placeholder="••••"
        textAlign="center"
      />

      <TouchableOpacity style={styles.yellowButton} onPress={handleLogin}>
        <Text style={styles.btnText}>{lang.login}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.grayButton} onPress={handleActivateMobile}>
        <Text style={styles.btnGrayText}>{lang.activate}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.grayButton} onPress={handleBecomeClient}>
        <Text style={styles.btnGrayText}>{lang.becomeClient}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export function FileUploadScreen() {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "Sorry, we need camera roll permission to upload images."
      );
    } else {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images, // Only images
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setFile(result.assets[0].uri);
        setError(null);

        // Show alert after successful file upload
        Alert.alert("Success", "You have received 10 points!");
      } else {
        setError("No image selected.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{ color: 'black', fontSize: 16, paddingEnd: '20px' }}></Text>
      <Image
        source={{ uri: 'https://thafd.bing.com/th/id/OIP.QoVNzQdiaU5lijiQRETZoQHaHa?rs=1&pid=ImgDetMain' }}
        style={styles.imglogo}
        resizeMode="contain"
      />
      <Text style={{ color: 'black', fontSize: 16, paddingEnd: '20px', textAlign: "center" }}></Text>
      <Text style={{ color: 'black', fontSize: 16, paddingEnd: '20px', textAlign: "center" }}>
        Hidhni nje ide speciale tuajen!
      </Text>
      <Text style={{ color: 'black', fontSize: 16, paddingEnd: '20px', textAlign: "center" }}></Text>
      <Text style={{ textAlign: "center" }}>Raifaisen ju vlereson!</Text>
      <Text style={{ color: 'black', fontSize: 16, paddingEnd: '20px' }}></Text>
      <Text style={{ color: 'black', fontSize: 16, paddingEnd: '20px', textAlign: "center" }}>Add Image:</Text>

      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={{textAlign:"center"}}>Choose Image</Text>
      </TouchableOpacity>

      {file ? (
        <View style={styles.imageContainer}>
          <Image source={{ uri: file }} style={styles.image} />
        </View>
      ) : (
        error && <Text style={styles.errorText}>{error}</Text>
      )}
    </View>
  );
}

function HomeScreen() {
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <SafeAreaView style={styles.loginContainer}>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
       <TouchableOpacity
          style={styles.hamburger}
          onPress={() => setMenuVisible(true)}
        >
          <Text style={{ fontSize: 35,right:"2%",marginVertical:"7%"}}>☰</Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 25, fontWeight: 'bold',marginHorizontal:"15%",marginVertical:"5%" }} >Mirësevini,</Text>

        <Modal
        visible={menuVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setMenuVisible(false)}
      >
        <TouchableOpacity style={styles.modalBackground} onPress={() => setMenuVisible(false)}>
          <View style={styles.menuDrawer}>
            <Text style={styles.menuItem}>Kendi Krijues</Text>
<FileUploadScreen/>
          </View>
        </TouchableOpacity>
      </Modal>

        <View style={{ marginBottom: 20 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 10 }}>
            <Text>👤</Text>
            <Text>🔔</Text>
            <Text>✉️</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Përshëndetje Alisa,</Text>
        <Text style={styles.limitedNotice}>
          Profili juaj është me të drejta të kufizuara. Ju nuk mund të DËRGONI PARA palëve të treta pa u
          identifikuar më parë në degën më të afërt ose ONLINE.
        </Text>

        <View style={styles.creditSection}>
          <Text style={styles.creditText}>Apliko për produkte ose Kredi</Text>
          <Text style={styles.creditSubtext}>Apliko këtu me disa hapa të thjeshtë!</Text>
          <TouchableOpacity>
            <Text style={styles.creditLink}>Apliko tani!</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.accountBox}>
          <Text style={styles.sectionTitle}>Llogaritë</Text>
          <Text style={styles.accountNumber}>****1234</Text>
          <Text style={styles.balanceAmount}>22,971.05 ALL</Text>
          <Text style={styles.balanceLabel}>Gjendja e disponueshme</Text>
          <View style={styles.actionsRow}>
            <TouchableOpacity style={styles.sendMoneyButton}>
              <Text style={styles.buttonText}>Dërgo para</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.moreButton}>
              <Text style={styles.buttonText}>Më shumë</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function SettingsScreen() {
  return (
    <SafeAreaView style={styles.loginContainer}>
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Settings</Text>
        <Text style={{ marginTop: 10 }}>Configure your preferences here.</Text>
      </View>
    </SafeAreaView>
  );
}

function Bli() {
  return (
    <SafeAreaView style={styles.loginContainer}>
      <View style={{ padding: 20 }}>
      </View>
    </SafeAreaView>
  );
}

function Kurs() {
  return (
    <FileUploadScreen/>
  );
}

function Paguaj() {
  return (
    <SafeAreaView style={styles.loginContainer}>
      <View style={{ padding: 20 }}>
      </View>
    </SafeAreaView>
  );
}

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
     <Tab.Navigator
  screenOptions={({ route }) => ({
    headerStyle: {
      backgroundColor: '#ffe600',
    },
    headerTintColor: 'black',
    tabBarIcon: ({ focused, color, size }) => {
      let iconName;

      if (route.name === 'Home') {
        iconName = 'home-outline';
      } else if (route.name === 'Paguaj') {
        iconName = 'wallet-outline';
      } else if (route.name === 'Kurs') {
        iconName = 'trending-up-outline';

        return (
          <View
            style={{
              backgroundColor: 'yellow',
              borderRadius: 25,
              padding: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Ionicons name={iconName} size={size} color="gray" />
          </View>
        );
      } else if (route.name === 'Bli') {
        iconName = 'cart-outline';
      } else if (route.name === 'Settings') {
        iconName = 'settings-outline';
      }

      // Default icon rendering for other tabs
      return <Ionicons name={iconName} size={size} color={color} />;
    },
    tabBarActiveTintColor: '#bebb0c',
    tabBarInactiveTintColor: 'gray',
  })}
>

      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Paguaj" component={Paguaj} />
      <Tab.Screen name="Kurs" component={Kurs} />
      <Tab.Screen name="Bli" component={Bli} />
      <Tab.Screen name="Settings" component={SettingsScreen} />


    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="MainTabs" component={MainTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    backgroundColor: '#ffe600',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  splashText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '500',
  },
  loginContainer: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    backgroundColor: '#ffe600',
    paddingTop: 30,
    paddingBottom: 40,
    paddingHorizontal: 30,
    borderBottomLeftRadius: 160,
    borderBottomRightRadius: 160,
    alignItems: 'center',
  },
  languageRow: {
    flexDirection: 'row',
    position: 'absolute',
    left: 20,
    top: 30,
  },
  language: {
    fontWeight: 'bold',
    marginHorizontal: 5,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    color: '#000',
  },
  languageActive: {
    backgroundColor: '#000',
    color: '#fff',
  },
  helpButton: {
    position: 'absolute',
    right: 20,
    top: 30,
  },
  help: {
    fontWeight: 'bold',
  },
  logoImage: {
    width: 60,
    height: 60,
    marginTop: 20,
    textAlign:"center",
  },
  imglogo:{
   width: 60,
    height: 60,
    marginTop: 20,
    textAlign:"center",
    left:"43%",
  },
  tabSelector: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  tab: {
    padding: 10,
    marginHorizontal: 5,
    color: '#888',
  },
  tabActive: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 12,
    color: '#000',
    fontWeight: 'bold',
  },
  pinLabel: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 24,
    fontWeight: 'bold',
  },
  pinLink: {
    color: '#0b7f94',
    textAlign: 'center',
    marginVertical: 8,
  },
  input: {
    borderRadius: 10,
    padding: 12,
    marginHorizontal: 80,
    fontSize: 24,
    letterSpacing: 12,
    marginBottom: 20,
    backgroundColor: '#fff'
  },
  yellowButton: {
    backgroundColor: '#ffe600',
    padding: 14,
    marginHorizontal: 32,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 6,
  },
  grayButton: {
    backgroundColor: '#e6e6e6',
    padding: 14,
    marginHorizontal: 32,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 6,
  },
  btnText: {
    fontWeight: 'bold',
    color: '#000',
  },
  btnGrayText: {
    fontWeight: 'bold',
    color: '#000',
  },
    userName: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 6,
    color: '#333',
  },
  limitedNotice: {
    fontSize: 12,
    color: '#666',
    paddingRight: 10,
  },
  creditSection: {
    backgroundColor: '#ffe600',
    marginTop: 20,
    padding: 16,
    borderRadius: 10,
    width: '100%',
  },
  creditText: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  creditSubtext: {
    fontSize: 12,
    color: '#333',
  },
  creditLink: {
    marginTop: 6,
    color: 'blue',
    textDecorationLine: 'underline',
  },
  accountBox: {
    backgroundColor: '#fff',
    marginTop: 20,
    padding: 16,
    borderRadius: 10,
    width: '100%',
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  balanceContainer: {
    marginBottom: 14,
  },
  balanceAmount: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
  },
  balanceLabel: {
    fontSize: 12,
    color: '#888',
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sendMoneyButton: {
    backgroundColor: '#ffe600',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  moreButton: {
    backgroundColor: '#e6f0ff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    fontWeight: 'bold',
  },
    hamburger: {
    position: 'absolute',
    left: 20,
    top: 30,
    padding: 10,
    zIndex: 10,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  menuDrawer: {
    width: 250,
    height: '100%',
    backgroundColor: '#fff',
    paddingTop: 60,
    paddingHorizontal: 20,
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 5,
  },
  menuItem: {
    fontSize: 18,
    paddingVertical: 12,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  header: {
    fontSize: 20,
    marginBottom: 15,
    color: 'black',
  },
  button: {
    backgroundColor: '#ffe600',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
  },
  imageContainer: {
    marginTop: 20,
  },
  image: {
    width: 250,
    height: 250,
    borderRadius: 10,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },


});

