import React from 'react';
import { FlatList, Text, TouchableOpacity, View, TextInput, Image } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { styles } from '../styles';
import { imgs } from '../general/images';
import { MeasureTypes } from '../general/measure-types';
import CustomHeaderBar from '../components/HeaderBar';
import { unitSelectionHandler } from '../redux/actions';


export class UnitSelectionView extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      dataHolder: [],
      maxInitialItems: 80
    }
    this.flatlistRef = React.createRef();
  };

  componentDidMount() {
    if (this.isTimezoneOrCurrency())
      this.setState({ dataHolder: this.props.data });
  };

  componentDidUpdate(prevProps) {
    const { measure } = this.props.quantJson.units;
    if (measure !== prevProps.quantJson.units.measure) {
      this.toTop();
      if (this.isTimezoneOrCurrency())
        this.setState({ dataHolder: this.props.data, 
                        search: '', 
                        maxInitialItems: 80 }); }
  };

  selectionHandler(unit_id) {
    const { quantJson, unitId, actions, navigation } = this.props;
    if (unitId !== unit_id)
      actions.unitSelectionHandler(unit_id, quantJson);
    navigation.navigate("Main");
  };

  renderItem = ({item, index}) => {
    if (item.header === true)
      return <Text style={styles.header}>{item.name}</Text>
    return (
      <TouchableOpacity
        style={styles.unit}
        onPress={() => this.selectionHandler(item.id)}>
        <Text
          numberOfLines={1}
          style={this.props.unitId === item.id ? styles.textSelected : styles.text}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  setTitle = () => {
    const { measure } = this.props.quantJson.units;
    if (measure === MeasureTypes.TIMEZONE)
      return 'Time zones'
    else if (measure === MeasureTypes.CURRENCY)
      return 'Currencies'
    return 'Units'
  };

  toTop = () => {
    this.flatlistRef.current &&
    this.flatlistRef.current.scrollToOffset({ y: 0, animated: false });
  };

  isTimezoneOrCurrency = () => {
    const { measure } = this.props.quantJson.units;
    if (measure === MeasureTypes.TIMEZONE || measure === MeasureTypes.CURRENCY)
      return true;
    return false;
  };

  getInitialData = () => {
    const { data } = this.props;
    const { maxInitialItems, dataHolder } = this.state;
    if (this.isTimezoneOrCurrency()) {
      return dataHolder.slice(0, maxInitialItems);
    }
    return data.slice(0, maxInitialItems);
  };

  handleLoadMore = () => {
    this.setState({
      maxInitialItems: this.state.maxInitialItems + 50
    });
  };

  searchFilter = (text) => {
    const { dataHolder } = this.state;
    if (text.length > 1) {
      const newData = dataHolder.filter(item => {
        const itemData = item.name.toLowerCase();
        const normalizedText = text.toLowerCase();
        return itemData.indexOf(normalizedText) > -1;
      });
      this.setState({ dataHolder: newData });
    }
    else if (text.length < 1)
      this.setState({ maxInitialItems: 80, dataHolder: this.props.data });
    this.setState({ search: text });
  };

  renderSearch = () => {
    const { measure } = this.props.quantJson.units;
    if (measure !== MeasureTypes.TIMEZONE && measure !== MeasureTypes.CURRENCY)
      return null;

    return (
      <View style={styles.searchBar}>
        <View style={styles.searchImageView}>
          <Image style={styles.cancelIcon} source={imgs.searchIcon} />
        </View>
        <TextInput style={styles.textInput}
          onChangeText={(text) => this.searchFilter(text)}
          selectTextOnFocus={true}
          placeholder="Search"
          value={this.state.search}
        />
        <TouchableOpacity style={styles.cancelButton} 
          activeOpacity={0.5} 
          onPress={() => this.searchFilter('')}>
          <Image style={styles.cancelIcon} source={imgs.cancelIcon} />
        </TouchableOpacity>
      </View>
    );
  };

  renderFooter = () => {
    const { data } = this.props;
    const { maxInitialItems, search } = this.state;
    if (maxInitialItems >= data.length || search) return null;
    return (
      <TouchableOpacity style={{ margin: 15, justifyContent: 'center', alignItems: 'center' }}
        onPress={this.handleLoadMore}>
        <Text style={{ color: '#ff850d' }}>Load more</Text>
      </TouchableOpacity>
    );
  };

  render() {
    if (this.props.error) return null;
    const title = this.setTitle();
    
    return (
      <>
      <CustomHeaderBar navigation={this.props.navigation} title={title} toTop={this.toTop}/>
      <View style={styles.container}>
        <FlatList ref={this.flatlistRef}
          data={this.getInitialData()}
          initialNumToRender={15}
          keyExtractor={(item) => item.id}
          renderItem={this.renderItem}
          ListHeaderComponent={this.renderSearch}
          ListFooterComponent={this.renderFooter}
        />
      </View>
      </>
    );
  }
};


const mapStateToProps = state => ({
  error: state.main.error,
  data: state.main.data,
  quantJson: state.main.quantJson,
  unitId: state.main.unitId,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      unitSelectionHandler: unitSelectionHandler,
    },
    dispatch,
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(UnitSelectionView)
