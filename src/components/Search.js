import { TouchableOpacity, View, TextInput, Image } from 'react-native';
import { styles } from '../styles';
import { imgs } from '../general/images';

const Search = ({searchFilter, queryText}) => (
  <View style={styles.searchBar}>
    <View style={styles.searchImageView}>
      <Image style={styles.cancelIcon} source={imgs.searchIcon} />
    </View>
    <TextInput
      style={styles.textInput}
      onChangeText={searchFilter}
      selectTextOnFocus={true}
      placeholder="Search"
      placeholderTextColor="gray"
      value={queryText}
    />
    <TouchableOpacity
      style={styles.cancelButton}
      activeOpacity={0.5}
      onPress={() => searchFilter('')}>
      <Image style={styles.cancelIcon} source={imgs.cancelIcon} />
    </TouchableOpacity>
  </View>
);

export default Search;