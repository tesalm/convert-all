import { StyleSheet } from 'react-native';

const fb_blue = '#497DB5';
const light_blue = "#4FC1FF";
const orange = '#FF850D';
const light_gray = '#DCDCDC';
const dark = '#262626';

const styles = StyleSheet.create({
  inputSection: {
    marginTop: 10,
    marginBottom: 10,
    justifyContent: 'center'
  },
  inputRow1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 7
  },
  inputRow2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4
  },
  textInput: {
    flex: 1,
    textAlign: 'center',
    height: 50,
    color: '#000',
    paddingHorizontal: 6,
    backgroundColor: light_gray,
    fontSize: 16
  },
  searchBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 12,
    marginHorizontal: 8,
    alignSelf: 'center'
  },
  headerBar: {
    height: 55,
    alignItems: 'center',
    paddingHorizontal: 12,
    backgroundColor: '#353535',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  toTopButton: {
    height: 50,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  unitSelection: {
    alignItems: 'center',
    backgroundColor: "#1F1F23",
    borderWidth: 2,
    borderColor: "#4C4C4F",
    borderRadius: 10,
    height: 50,
    paddingHorizontal: 8,
    justifyContent: 'center',
    flex: 1
  },
  unitSelectionDisabled: {
    alignItems: 'center',
    backgroundColor: "#3A3A3B",
    borderWidth: 2,
    borderColor: "#454546",
    borderRadius: 10,
    height: 50,
    paddingHorizontal: 8,
    justifyContent: 'center',
    flex: 1
  },
  menuButton: {
    marginLeft: 4,
    height: 50,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center'
  },
  cancelButton: {
    backgroundColor: light_gray,
    height: 50,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 9,
    borderBottomRightRadius: 9
  },
  measureIcon: {
    height: 30,
    width: 30,
    marginRight: 10,
    tintColor: orange
  },
  backButton: {
    height: 50,
    width: 60,
    justifyContent: 'center'
  },
  backIcon:{
    height: 30,
    width: 30,
    tintColor: light_blue
  },
  totopIcon:{
    height: 36,
    width: 36,
    tintColor: light_blue
  },
  menuIcon:{
    height: 40,
    width: 40,
    tintColor: orange
  },
  cancelIcon:{
    height: 24,
    width: 24,
    tintColor: '#4e4e4e'
  },
  searchImageView:{
    backgroundColor: light_gray,
    borderBottomLeftRadius: 9,
    borderTopLeftRadius: 9,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  searchIcon:{
    height: 30,
    width: 30,
    tintColor: '#4e4e4e'
  },
  containerWithMargin: {
    flex: 1,
    paddingTop: 6,
    //paddingTop: StatusBar.currentHeight || 22,
    paddingHorizontal: 8,
    paddingBottom: 15,
    backgroundColor: dark
  },
  container: {
    flex: 1,
    paddingHorizontal: 8,
    paddingTop: 20,
    paddingBottom: 30,
    backgroundColor: dark
  },
  precisionPicker: {
    width: 110,
    marginLeft: 6
  },
  text: {
    color: '#eef2ff',
    fontSize: 14
  },
  footer: {
    textAlign: 'left',
    color: light_blue,
    fontSize: 11,
    marginTop: 2,
    marginBottom: 10
  },
  textBold: {
    color: '#eef2ff',
    fontSize: 14,
    fontWeight: 'bold'
  },
  textSelected: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#6491C1'
  },
  textError: {
    fontSize: 14,
    marginHorizontal: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    color: orange
  },
  resultTextUnit: {
    color: '#eef2ff',
    fontSize: 14,
    flex: 1,
    textAlign: 'left',
    alignSelf: 'flex-start'
  },
  resultTextUnitSelected: {
    color: '#6491C1',
    fontWeight: 'bold',
    fontSize: 14,
    flex: 1,
    textAlign: 'left',
    alignSelf: 'flex-start'
  },
  resultTextValue: {
    color: '#9cdcfe',
    fontSize: 14,
    marginLeft: 12,
    textAlign: 'right',
    maxWidth: "50%"
  },
  headerWithIcon: {
    flexDirection: 'row',
    justifyContent: "center",
    marginRight: 36,
    marginTop: 26,
    marginBottom: 8,
    alignItems: 'center',
  },
  header: {
    color: orange,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 8
  },
  header1: {
    color: orange,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  resultsContainer: {
    flex: 1,
    marginVertical: 3
  },
  resultRowEven: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#323232',
    paddingHorizontal: 3,
    paddingVertical: 6
  },
  resultRowOdd: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 3,
    paddingVertical: 6
  },
  unit: {
    height: 40,
    marginTop: 4,
    marginBottom: 4,
    justifyContent: 'center',
    alignItems: 'center'
  }

});

export { styles };