import { Dimensions, StyleSheet } from 'react-native';
import { metrics, colors, fonts } from 'Styles/index';

const { height: screenHeight } = Dimensions.get('window');
const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center'
  },
  gridItem: {
      backgroundColor: "#fff",
      flexGrow: 1,
      margin: 4,
      padding: 20,
      flexBasis: 0
    },
  gridItemImage: {
    borderWidth: 1.5,
    borderColor: 'white',
    borderRadius: 10,
  },
  gridItemText: {
      marginTop: 5,
      textAlign:'center',
  },
  btnSocial: {
    margin: 10,
    height: 60,
    width: 60,
    backgroundColor: 'transparent'
  },
  btnLogin: {
    backgroundColor: colors.primary
  },
  btnLoginDisabled: {
    backgroundColor: colors.primaryLight
  },
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  conteinerLogo: {
    flex: 2
  },
  conteinerBtnSocial: {
    flex: 0.7,
    flexDirection: 'row',
    paddingLeft: metrics.padding + 25,
    paddingRight: metrics.padding + 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  conteinerForm: {
    flex: 2,
    flexDirection: 'column',
    paddingLeft: metrics.padding,
    paddingRight: metrics.padding,
    justifyContent: 'space-around'
  },
  conteinerLinkSignUp: {
    flex: 0.5,
    flexDirection: 'column',
    paddingLeft: metrics.padding,
    paddingRight: metrics.padding,
    justifyContent: 'center',
    alignItems: 'center'
  },
  conteinerLinkRecovery: {
    flex: 0.5,
    flexDirection: 'column',
    paddingRight: metrics.padding,
    justifyContent: 'flex-start',
    alignItems: 'flex-end'
  },
  formInput: {
    height: 60,
    borderColor: colors.regular
  },
  imageBackground: {
    flex: 1,
    height: screenHeight - 24
  },
  linkSignUp: {
    flex: 1,
    margin: 5,
    fontSize: fonts.big,
    textAlign: 'center',
    color: colors.fontPrimary
  },
  linkRecovery: {
    fontSize: fonts.regular,
    color: colors.fontPrimary
  },
});

export default styles;
