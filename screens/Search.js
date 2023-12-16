import React, { useState, useEffect } from 'react';
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, FlatList, TextInput } from 'react-native';
import firestore from "@react-native-firebase/firestore";
import { COLORS, FONTS, SIZES, icons } from "../constants";
import { Button, Icon } from "react-native-paper";

const Search = ({ navigation }) => {
  const [booksData, setBooksData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [filteredBooks, setFilteredBooks] = useState([]);

  useEffect(() => {
    // Fetch Books data
    const fetchBooksData = async () => {
      const booksSnapshot = await firestore().collection('Books').get();
      const booksData = booksSnapshot.docs.map(doc => doc.data());
      setBooksData(booksData);
      setFilteredBooks(booksData); // Ban đầu, filteredBooks sẽ chứa toàn bộ danh sách sách
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

  const renderCategoryData = () => {
    const renderItem = ({ item }) => {
      return (
        <View style={{ marginVertical: SIZES.base }}>
          <TouchableOpacity
            style={{ flex: 1, flexDirection: 'row' }}
            onPress={() =>
              navigation.navigate('BookDetail', {
                book: item,
              })
            }
          >
            {/* Book Cover */}
            <Image
              source={{ uri: item.bookCover }}
              resizeMode="cover"
              style={{ width: 100, height: 150, borderRadius: 10 }}
            />

            <View style={{ flex: 1, marginLeft: SIZES.radius }}>
              {/* Book name and author */}
              <View>
                <Text style={{ paddingRight: SIZES.padding, ...FONTS.h2, color: COLORS.white }}>
                  {item.bookName}
                </Text>
                <Text style={{ ...FONTS.h3, color: COLORS.lightGray }}>{item.author}</Text>
              </View>
              {/* Book Info */}
              <View style={{ flexDirection: 'row', marginTop: SIZES.radius }}>
                <Button
                  icon={() => <Icon source={icons.page_filled_icon} size={25} color={COLORS.lightGray} />}
                  textColor={COLORS.lightGray}
                >
                  {item.pageNo}
                </Button>
                <Button
                  icon={() => <Icon source={icons.read_icon} size={25} color={COLORS.lightGray} />}
                  textColor={COLORS.lightGray}
                >
                  {item.readed}
                </Button>
              </View>
              {/* Genre */}
              <View style={{ flexDirection: 'row', marginTop: SIZES.base }}>
                {item.genre && item.genre.includes('Adventure') && (
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: SIZES.base,
                      marginRight: SIZES.base,
                      backgroundColor: COLORS.darkGreen,
                      height: 40,
                      borderRadius: SIZES.radius,
                    }}
                  >
                    <Text style={{ ...FONTS.body3, color: COLORS.lightGreen }}>Adventure</Text>
                  </View>
                )}
                {item.genre && item.genre.includes('Romance') && (
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: SIZES.base,
                      marginRight: SIZES.base,
                      backgroundColor: COLORS.darkRed,
                      height: 40,
                      borderRadius: SIZES.radius,
                    }}
                  >
                    <Text style={{ ...FONTS.body3, color: COLORS.lightRed }}>Romance</Text>
                  </View>
                )}
                {item.genre && item.genre.includes('Drama') && (
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: SIZES.base,
                      marginRight: SIZES.base,
                      backgroundColor: COLORS.darkBlue,
                      height: 40,
                      borderRadius: SIZES.radius,
                    }}
                  >
                    <Text style={{ ...FONTS.body3, color: COLORS.lightBlue }}>Drama</Text>
                  </View>
                )}
              </View>
            </View>
          </TouchableOpacity>
        </View>
      );
    };

    return (
      <FlatList
        data={filteredBooks}
        renderItem={renderItem}
        keyExtractor={(item) => `${item.id}`}
        showsVerticalScrollIndicator={false}
      />
    );
  };

  const handleSearch = (text) => {
    // Filter books based on searchKeyword
    const newFilteredBooks = booksData.filter((book) =>
      book.bookName.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredBooks(newFilteredBooks); // Cập nhật filteredBooks mỗi khi searchKeyword thay đổi
  };

  return (
    <SafeAreaView style={{ ...styles.container, backgroundColor: COLORS.black }}>
      <View style={{ marginTop: SIZES.padding }}>
        {/* Search Bar */}
        <View style={{ flexDirection: 'row', alignItems: 'center' , marginLeft:15}}>
          <TextInput
            style={{ flex: 1, height: 40, borderColor: COLORS.lightGray, borderWidth: 1, color: COLORS.white, paddingHorizontal: SIZES.padding, borderRadius:10, marginRight:15}}
            placeholder="Search..."
            placeholderTextColor={COLORS.lightGray}
            onChangeText={handleSearch}
          />
          <TouchableOpacity onPress={handleSearch} style={{marginRight:15}}>
            <Icon source={icons.search_icon} size={20} color={COLORS.lightGray} />
          </TouchableOpacity>
        </View>

        {/* Render Category Data */}
        <View style={{marginLeft:20, marginTop:15}}>{renderCategoryData()}</View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Search;
