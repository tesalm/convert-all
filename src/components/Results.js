import React from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';

import { styles } from '../styles';
import { inputToNumeral } from '../util/numerals';
import { parseCurrencyResult, parseResult } from '../util/parser';
import { toLocaleTimeString } from '../util/timezone';
import { MeasureTypes } from '../general/measure-types';


const ResultsView = (props) => {
  const flatlistRef = React.useRef();

  const result = (item) => {
    const {input, precision, unitId, measure} = props;
    switch (measure) {
      case MeasureTypes.CURRENCY:
        return parseCurrencyResult(item.rate, input, precision);
      case MeasureTypes.TIMEZONE:
        return toLocaleTimeString(item.id);
      case MeasureTypes.NUMERAL:
        return inputToNumeral(input, item.equation, unitId);
      default:
        return parseResult(item.equation, input, precision);
    }
  };

  const renderHeader = () => {
    const {data, measure} = props;
    if (measure === MeasureTypes.CURRENCY)
      return (
        <Text style={styles.footer}>Updated  {data[0].date}</Text>
      );
    return null;
  };

  const renderItem = ({item, index}) => {
    if (item.header === true)
      return <Text style={styles.header}>{item.name}</Text>
    return (
      <View key={index}
        style={index % 2 === 1 ? styles.resultRowOdd : styles.resultRowEven}>
        <Text style={props.unitId === item.id ? styles.resultTextUnitSelected : styles.resultTextUnit}>
          {item.name}
        </Text>
        <Text style={styles.resultTextValue}>{result(item)}</Text>
      </View>
    );
  };
  
  const toTop = () => {
    if (flatlistRef.current)
      flatlistRef.current.scrollToOffset({ y: 0, animated: false });
  };

  if (props.scrollToTop) toTop();

  if (props.loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator size='large' color='#ff850d' />
      </View>
    );
  };

  if (props.error) {
    const keys = Object.keys(props.error)
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        {typeof props.error === "string" ? <Text style={styles.textError}>{props.error}</Text> :
        keys.map((key, index) => { return (
          <Text key={index} style={styles.textError}>{key}: {props.error[key]}</Text> );
        })}
      </View>
    );
  };
  
  return (
    <FlatList ref={flatlistRef}
      data={props.data}
      initialNumToRender={15}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      ListHeaderComponent={renderHeader}
    />
  );
};


export default ResultsView;
