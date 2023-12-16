import 'react-native-gesture-handler'
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, FlatList, ScrollView } from 'react-native'
import firestore from "@react-native-firebase/firestore"
import storage from "@react-native-firebase/storage";
import { COLORS, FONTS, SIZES, icons} from "../constants";
import { useEffect, useState } from "react";
import { Button, Icon} from "react-native-paper";
import { useMyContextController, signOut } from '../context'
const LineDivider = () => {
    return (
        <View style={{ width: 1, paddingVertical: 18 }}>
            <View style={{ flex: 1, borderLeftColor: COLORS.lightGray, borderLeftWidth: 1 }}></View>
        </View>
    )
}

// Add a book to the collection
// const booksCollection = firestore().collection('Books');

// // Add a book to the collection with a custom document ID
// const addBookToFirestore = async () => {
//   try {
//     // Data for the book
//     const bookData = {
//         id: 3,
//     bookName: "The Tiny Dragon",
//     bookCover: "TheTinyDragon.jpg",
//     rating: 3.5,
//     language: "Eng",
//     pageNo: 110,
//     author: "Ana C Bouvier",
//     genre: [
//         "Drama", "Adventure", "Romance"
//     ],
//     readed: "13k",
//     description: "This sketchbook for kids is the perfect tool to improve your drawing skills! Designed to encourage kids around the world to express their uniqueness through drawing, sketching or doodling, this sketch book is filled with 110 high quality blank pages for creations. Add some fun markers, crayons, and art supplies and you have the perfect, easy gift for kids!",
//     backgroundColor: "rgba(119,77,143,0.9)",
//     navTintColor: "#FFF",
//     completion: "10%",
//         lastRead: "1d 2h",

//     };

//     // Specify the custom document ID
//     const customDocId = 'B3';

//     // Create a document reference with the custom ID
//     const docRef = booksCollection.doc(customDocId);

//     // Add the book to the collection with the custom ID
//     await docRef.set(bookData);

//     console.log('Book added to Firestore with custom ID:', customDocId);
//   } catch (error) {
//     console.error('Error adding book to Firestore:', error);
//   }
// };

// // Call the function to add a book to Firestore with a custom ID
// addBookToFirestore();


//initial
// const initial=()=>{
//     booksData.forEach(b => {
//         const path= "bookstore/"+b.bookCover;
//         //console.log(path)
//         storage().ref(path).getDownloadURL()
//         .then(url =>
//             {
//                 b.bookCover = url;
//                 // Books.doc(b.id+'').set(b)
//                 // .then(() => console.log("Add new books!")) 
//                 // .catch((e) => console.log("wfW" +e))
//             }
//         )
//         .catch(e => console.log("error: " + e))
//     })
//     // categoriesData.map(c => {
//     //     Categories.doc (c.id+"").set(c)
//     //     .then(() => console.log("Add new Categories!")) 
//     // })
//     }

export default Home = ({ navigation })=>{ 
    
    const [booksData, setBooksData] = useState([])
    const [categories, setCategories] = useState([]) 
    const [controller, dispatch] = useMyContextController();
    const {userLogin} = controller;
    const handleLogout = async () => {
        await signOut(dispatch, navigation);
    };
    //initial()
    useEffect(() => {
        // Fetch Books data
        const fetchBooksData = async () => {
            const booksSnapshot = await firestore().collection('Books').get();
            const booksData = booksSnapshot.docs.map(doc => doc.data());
            setBooksData(booksData);
          };
    
        // Fetch Categories data
        const fetchCategoriesData = async () => {
          const categoriesSnapshot = await firestore().collection('Category').get();
          const categoriesData = categoriesSnapshot.docs.map(doc => doc.data());
          setCategories(categoriesData);
        };
        fetchBooksData();
        fetchCategoriesData();
      }, []);
    const renderHeader = ()=>
    {
    return (
        
        <View style={{ flex: 1, paddingHorizontal: SIZES.padding, justifyContent: 'center' }}>
      {userLogin ? (
        <View>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' ,marginTop:50}}>
            <View style={{ marginRight: SIZES.padding }}>
              <Text style={{ ...FONTS.h3, color: COLORS.white }}>Good Morning</Text>
              <Text style={{ ...FONTS.h2, color: COLORS.white }}>{userLogin.username}</Text>
            </View>
            <Button
              icon="plus-circle"
              mode="contained" onPress={() => console.log('Pressed')}
              style={{ backgroundColor: COLORS.primary, marginLeft: 50 }}
            >
              {userLogin.point} point
            </Button>
          </View>
          {/* Logout Button */}
          {userLogin && (
            <Button
              icon="logout"
              mode="contained" onPress={() => handleLogout()}
              style={{ backgroundColor: 'red', marginTop: 10,marginBottom:30 }}
            >
              Logout
            </Button>
          )}
        </View>
    ) : (
        <View>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop:30}}>
            <View style={{ marginRight: SIZES.padding }}>
              <Text style={{ ...FONTS.h3, color: COLORS.white }}>Good Morning</Text>
              <Text style={{ ...FONTS.h2, color: COLORS.white }}>Username</Text>
            </View>
            <Button
              icon="login"
              mode="contained" onPress={() => navigation.navigate('Login')}
              style={{ backgroundColor: COLORS.primary, marginLeft:100}}
            >
              Login
            </Button>
          </View>
          
        </View>
    )}
        </View>
        
        
    )
    }


    const renderButtonSection = () =>
    {
    return (
        <View style={{ flex: 1, justifyContent: 'center', padding: SIZES.padding , marginTop:70}}>
            <View style={{ flexDirection: 'row', height: 70, backgroundColor: COLORS.secondary, borderRadius: SIZES.radius }}> 
                <Button
                    mode="text"
                    icon={() => <Icon source={icons.claim_icon} size={25} />}
                    onPress={() => console.log('Pressed')}
                    style={{justifyContent: "center"}}
                >
                    <Text style={{fontSize: 15, color: COLORS.white}}>Claim</Text>
                </Button>
                <LineDivider/>
                <Button
                    mode="text"
                    icon={() => <Icon source={icons.point_icon} size={25} />}
                    onPress={() => console.log('Pressed')}
                    style={{justifyContent: "center"}}
                >
                    <Text style={{fontSize:15, color: COLORS.white}}>Get Point</Text> 
                </Button>
                <LineDivider/>
                <Button
                    mode="text"
                    icon={() => <Icon source={icons.card_icon} size={25} />}
                    onPress={() => console.log('Pressed')}
                    style={{justifyContent: "center"}}
                >
                    <Text style={{fontSize: 15, color: COLORS.white}}>My Card</Text> 
                </Button>
            </View>
        </View>
    )
    }

    const renderMyBookSection = (booksData)=>
    {
        const renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity 
                style={{
                    flex: 1,
                    marginleft: index == 0 ? SIZES.padding: 0, 
                    marginRight: SIZES.radius
                }}
                onPress={() => navigation.navigate("BookDetail", {
                    book: item
                })}
            >
                
                <Image
                    source={{uri:item.bookCover}}
                    resizeMode="cover"
                    style={{
                        width: 180, 
                        height: 250,
                        borderRadius: 20,
                        
                    }}
                    
                />
                <View style={{ marginTop: SIZES.radius, flexDirection: 'row', alignItems: 'center' }}> 
                    <Button
                        icon={() => <Icon source={icons.clock_icon} size={25} color={COLORS.lightGray} />} 
                        textColor={COLORS.lightGray}
                    >
                        {item.lastRead}
                    </Button>
                    <Button
                        icon={() => <Icon source={icons.page_icon} size={25} color={COLORS.lightGray} />} 
                        textColor={COLORS.lightGray}
                    >
                        {item.completion}
                    </Button>
                </View>
                </TouchableOpacity>
            
        )
        }


    return (
        <View style={{ flex: 1 }}>
            <View style={{ paddingHorizontal: SIZES.padding, flexDirection: 'row', justifyContent: 'space-between' }}> 
                <Text style={{ ...FONTS.h2, color: COLORS.white }}>My Book</Text>
                <Button mode="text" onPress={() => console.log("See more")}
                    labelStyle = {{color: COLORS.lightGray, textDecorationLine:"underline"}}
                >
                    See more
                </Button>
            </View>
            <View style={{ flex: 1, marginTop: SIZES.padding,marginLeft:15 }}>
                <FlatList
                    data={booksData}
                    renderItem={renderItem}
                    keyExtractor={item => `${item.id}` } 
                    horizontal
                    showsHorizontalScrollIndicator={false}
                />
            </View>
        </View>
    )
    }

    const [selectedCategory, setSelectedCategory] = useState(1) 
    const renderCategoryHeader = (categories)=>
    {
        const renderItem = ({ item }) => 
        {
            return (
                <Button mode="text"
                    labelStyle={{
                        ...FONTS.h2,
                        color: (selectedCategory==item.id)?COLORS.white: COLORS.lightGray
                    }}
                    onPress={() => setSelectedCategory(item.id)}
                >
                    {item.categoryName}
                </Button>
            )
        }
    return(
        <View style={{ flex: 1, paddingLeft: SIZES.padding }}>
            <FlatList
                data={categories}
                renderItem={renderItem}
                keyExtractor={item => `${item.id}`}
                horizontal
                showsHorizontalScrollIndicator={false}
            />
        </View>
    )
    }

    const renderCategoryData = (booksData)=>
    {
        var books = []

        let selectedCategoryBooks = categories.filter(a => a.id == selectedCategory)

        if (selectedCategoryBooks.length > 0) {
            selectedCategoryBooks[0].books.forEach(id =>
                books.push(booksData.filter(a => a.id == id)[0])
            )
        }
        // if (selectedCategoryBooks.length > 0) {
        //     books = selectedCategoryBooks[0].books
        // }
        const renderItem = ({ item }) => {
            return (
                <View style={{ marginVertical: SIZES.base }}>
                    <TouchableOpacity
                        style={{ flex: 1, flexDirection: 'row' }}
                        onPress={() => navigation.navigate("BookDetail", { 
                            book: item
                        })}
                    >
                        {/*Book Cover*/ }
                        <Image
                            source={{uri:item.bookCover}}
                            resizeMode="cover"
                            style={{ width: 100, height: 150, borderRadius: 10 }}
                        />
                        
                        <View style={{ flex: 1, marginLeft: SIZES.radius }}>
                            {/*Book name and author*/ }
                            <View>
                                <Text style={{ paddingRight: SIZES.padding, ...FONTS.h2, color: COLORS.white }}>{item.bookName}</Text> 
                                <Text style={{ ...FONTS.h3, color: COLORS.lightGray }}>{item.author}</Text> 
                            </View>
                            {/*Book Info*/ }
                            <View style={{ flexDirection: 'row', marginTop: SIZES.radius }}>
                                
                                <Button
                                    icon={() => <Icon source={icons.page_filled_icon} size={25} color={COLORS.lightGray}/>} 
                                    textColor={COLORS.lightGray}
                                >{item.pageNo}
                                </Button>
                                <Button
                                    icon={() => <Icon source={icons.read_icon} size={25} color={COLORS.lightGray}/>} 
                                    textColor={COLORS.lightGray} 
                                >
                                    {item.readed}
                                </Button>
                            </View>
                            {/*Genre*/ }
                            <View style={{ flexDirection: 'row', marginTop: SIZES.base }}>
                                {
                                    item.genre && item.genre.includes('Adventure') && (
                                    <View style={{ justifyContent: 'center', alignItems: 'center', padding: SIZES.base, marginRight: SIZES.base, backgroundColor: COLORS.darkGreen, height: 40, borderRadius: SIZES.radius }}>
                                        <Text style={{ ...FONTS.body3, color: COLORS.lightGreen }}>Adventure</Text>
                                    </View>
                                    )
                                }
                                {

                                    item.genre && item.genre.includes("Romance") && (
                                    <View style={{justifyContent: 'center', alignItems: 'center', padding: SIZES.base, marginRight: SIZES.base, backgroundColor: COLORS.darkRed, height: 40, borderRadius: SIZES. radius }}>
                                        <Text style={{ ...FONTS.body3, color: COLORS.lightRed }}>Romance</Text>
                                    </View>
                                    )
                                }
                                {

                                    item.genre && item.genre.includes("Drama") &&(
                                    <View style={{ justifyContent: 'center', alignItems: 'center', padding: SIZES.base, marginRight: SIZES.base, backgroundColor: COLORS.darkBlue, height: 40, borderRadius: SIZES.radius }}> 
                                        <Text style={{ ...FONTS.body3, color: COLORS.lightBlue }}>Drama</Text>
                                    </View>
                                    )
                                }
                            </View>
                        </View>
                    </TouchableOpacity>
                    {/* Bookmark Button */}
                    {/* <TouchableOpacity
                        style={{ position: 'absolute', top: 5, right: 15 }}
                        onPress={() => console.log("Bookmark")}
                    >
                        <Image
                            source={icons.bookmark_icon}
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: COLORS.lightGray
                            }}
                        />
                    </TouchableOpacity> */}
                </View>
            )
        }
        return (
            <View style={{ flex: 1, marginTop: SIZES.radius, paddingLeft: SIZES.padding }}>
                <FlatList
                    data={books}
                    renderItem={renderItem}
                    keyExtractor={item => `${item.id}`}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        )
    }
    return(
    <SafeAreaView style={{...styles.container, backgroundColor: COLORS.black}}>
        <View style={{height:200}}>
            {renderHeader()} 
            {renderButtonSection()}
        </View>
        <ScrollView style={{marginTop: SIZES.radius}}>
            <View>
                {renderMyBookSection(booksData)}
            </View>
            <View style={{marginTop: SIZES.padding}}>
                <View>
                    {renderCategoryHeader(categories)}
                </View>
                <View>
                    {renderCategoryData(booksData)}
                </View>
            </View>
        </ScrollView>
    </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
    }
})

        