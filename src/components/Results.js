import React from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';

import { styles } from '../styles';
import { inputToNumeral } from '../util/numerals';
import { parseCurrencyResult, parseResult } from '../util/parser';
import { toLocaleTimeString } from '../util/timezone';
import { MeasureTypes } from '../general/measure-types';


const ResultsView = (props) => {
  const flatlistRef = React.useRef();

  const renderItem = ({ item, index }) => (
    <View key={index} style={styles.resultsContainer}>
      {item.header === true ? <Text style={styles.header}>{item.name}</Text> :
        <View style={index % 2 === 1 ? styles.resultRowOdd : styles.resultRowEven}>
          <Text style={props.unitId === item.id ? styles.resultTextUnitSelected : styles.resultTextUnit}>
            {item.name}
          </Text>
          <Text style={styles.resultTextValue}>
            {parseResult(item.equation, props.input, props.precision)}
          </Text>
        </View>}
    </View>
  );

  const renderNumeralItem = ({ item, index }) => (
    <View key={index} style={styles.resultsContainer}>
      <View style={index % 2 === 1 ? styles.resultRowOdd : styles.resultRowEven}>
        <Text style={props.unitId === item.id ? styles.resultTextUnitSelected : styles.resultTextUnit}>
          {item.name}
        </Text>
        <Text style={styles.resultTextValue}>
          {inputToNumeral(props.input, item.equation, props.unitId)}
        </Text>
      </View>
    </View>
  );

  const renderTimezoneItem = ({ item, index }) => (
    <View key={index} style={styles.resultsContainer}>
      <View style={index % 2 === 1 ? styles.resultRowOdd : styles.resultRowEven}>
        <Text style={props.unitId === item.id ? styles.resultTextUnitSelected : styles.resultTextUnit}>
          {item.name}
        </Text>
        <Text style={styles.resultTextValue}>
          {toLocaleTimeString(item.id)}
        </Text>
      </View>
    </View>
  );
  
  const renderCurrencyItem = ({ item, index }) => (
    <View key={index} style={styles.resultsContainer}>
      {index === 0 && <Text style={styles.footer}>Updated {item.date}</Text>}
      <View style={index % 2 === 1 ? styles.resultRowOdd : styles.resultRowEven}>
        <Text style={ props.unitId === item.id ? styles.resultTextUnitSelected : styles.resultTextUnit}>
          {item.name}
        </Text>
        <Text style={styles.resultTextValue}>
          {parseCurrencyResult(item.rate, props.input, props.precision)}
        </Text>
      </View>
    </View>
  );
  
  const toTop = () => {
    flatlistRef.current &&
    flatlistRef.current.scrollToOffset({ y: 0, animated: false });
  }

  if (props.scrollToTop) toTop();

  if (props.loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator size='large' color='#ff850d' />
      </View>
    );
  }

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
  }
  
  return (
    <FlatList ref={flatlistRef}
      data={props.data}
      initialNumToRender={15}
      keyExtractor={(item) => item.id}
      renderItem={
        props.measure === MeasureTypes.CURRENCY ? renderCurrencyItem :
        props.measure === MeasureTypes.TIMEZONE ? renderTimezoneItem :
        props.measure === MeasureTypes.NUMERAL ? renderNumeralItem :
        renderItem}
    />
  );
};


export default ResultsView;
