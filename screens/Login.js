import React,{ useState, useEffect} from "react";
import { Text, View, StyleSheet, TouchableHighlight } from "react-native";
import { TextInput } from "react-native-paper";
import { useMyContextController, login } from "../context"
export const Login = ({navigation})=>{
    console.log("Navigation object:", navigation);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [controller, dispatch] = useMyContextController();
    const {userLogin} = controller;
    useEffect(() => {
        console.log("useEffect triggered");
        if (userLogin !== null) 
        {
            navigation.replace("Tab");
        }
      }, [userLogin]);
    const onSubmit =()=>{
        login(dispatch,email,password);
        
    }
    return (
        <View style={styles.container}>
                    <Text style={styles.text}>Login</Text>
                    <TextInput
                        style={styles.item}
                        placeholder="Enter email"
                        autoCapitalize='none' 
                        value={email}
                        onChangeText={text=>setEmail(text)} 
                    >
                    </TextInput>
                    <TextInput
                        style={styles.item}
                        placeholder="Enter password"
                        autoCapitalize='none' 
                        value={password}
                        onChangeText={text=>setPassword(text)}
                        secureTextEntry ={!showPassword}
                        right={<TextInput.Icon icon='eye' style={{marginTop: 20}}  onPress={() => setShowPassword(!showPassword)}/>}
                    >
                    </TextInput>
                
                <TouchableHighlight
                    style={styles.btn}
                    onPress={onSubmit}
                >
                    <Text style={styles.txt}>Login</Text>
                </TouchableHighlight>
            </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems: 'center',
        justifyContent: "center"
      },
    item:{
        borderColor: "gray",
        width: "85%",
        height:35,
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        marginBottom:20
    },
    btn:{
        width: "85%",
        backgroundColor: "red",
        borderRadius: 10,
        paddingVertical: 10,
    },
    txt:{
        textAlign: "center",
        alignItems: "center",
        fontWeight: "bold",
        fontSize: 15,
        color: "white"
    },
    text:{
        fontSize: 30,
        fontWeight: "bold",
        color: "red",
        marginBottom:15,
        textAlign: 'center'
      },
});