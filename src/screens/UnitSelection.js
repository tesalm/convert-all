import { useContext, useEffect, useRef, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { styles } from '../styles';
import { MeasureTypes } from '../general/measure-types';
import CustomHeaderBar from '../components/HeaderBar';
import { unitSelectionHandler } from '../store/actions';
import AppContext from '../store/appContext';
import Search from '../components/Search';


const UnitSelectionView = ({navigation, route}) => {
  const appCtx = useContext(AppContext);
  const {state} = appCtx;
  const [search, setSearch] = useState('');
  const [dataHolder, setDataHolder] = useState([]);
  const [maxInitialItems, setMaxInitialItems] = useState(80);
  const flatlistRef = useRef(null);
  const {measure} = state.quantJson.units;

  useEffect(() => {
    if (isTimezoneOrCurrency()) setDataHolder(state.data);
    setTimeout(() => {
      try {
        const index = state.data.findIndex(e => e.id === state.unitId) - 1;
        flatlistRef.current.scrollToIndex({index: index > -1 ? index : 0});
      }
      catch {}
    });
  }, [state.data, flatlistRef]);

  const selectionHandler = unit_id => {
    const {quantJson, unitId} = state;
    if (unitId !== unit_id) unitSelectionHandler(appCtx, unit_id, quantJson);
    navigation.navigate('Main', {selectedUnit: unit_id});
  };

  const renderItem = ({item, index}) => {
    if (item.header === true)
      return <Text style={styles.header}>{item.name}</Text>;
    return (
      <TouchableOpacity
        style={styles.unit}
        onPress={() => selectionHandler(item.id)}>
        <Text
          numberOfLines={1}
          style={state.unitId === item.id ? styles.textSelected : styles.text}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  const setTitle = () => {
    if (measure === MeasureTypes.TIMEZONE) return 'Time zones';
    else if (measure === MeasureTypes.CURRENCY) return 'Currencies';
    return 'Units';
  };

  const toTop = () =>
    flatlistRef.current?.scrollToOffset({y: 0, animated: false});

  const isTimezoneOrCurrency = () => {
    if (measure === MeasureTypes.TIMEZONE || measure === MeasureTypes.CURRENCY)
      return true;
    return false;
  };

  const getInitialData = () => {
    const {data} = state;
    if (isTimezoneOrCurrency()) {
      return dataHolder.slice(0, maxInitialItems);
    }
    return data.slice(0, maxInitialItems);
  };

  const handleLoadMore = () => setMaxInitialItems(maxInitialItems + 50);

  const searchFilter = (text) => {
    if (text.length > 1) {
      const newData = dataHolder.filter(item => {
        const itemData = item.name.toLowerCase();
        const normalizedText = text.toLowerCase();
        return itemData.indexOf(normalizedText) > -1;
      });
      setDataHolder(newData);
    } else if (text.length < 1) {
      setMaxInitialItems(80);
      setDataHolder(state.data);
    }
    setSearch(text);
  };

  const renderFooter = () => {
    const {data} = state;
    if (maxInitialItems >= data.length || search) return null;
    return (
      <TouchableOpacity
        style={{margin: 15, justifyContent: 'center', alignItems: 'center'}}
        onPress={handleLoadMore}>
        <Text style={{color: '#ff850d'}}>Load more</Text>
      </TouchableOpacity>
    );
  };

  if (state.error) return null;
  const title = setTitle();

  return (
    <>
      <CustomHeaderBar navigation={navigation} title={title} toTop={toTop} />
      <View style={styles.container}>
        <FlatList
          ref={flatlistRef}
          data={getInitialData()}
          initialNumToRender={15}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          ListHeaderComponent={
            isTimezoneOrCurrency() && (
              <Search queryText={search} searchFilter={searchFilter} />
            )
          }
          ListFooterComponent={renderFooter}
          getItemLayout={(data, index) => ({
            length: 50,
            offset: 50 * index,
            index,
          })}
        />
      </View>
    </>
  );
};

export default UnitSelectionView;