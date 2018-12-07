import { Dimensions, StyleSheet } from 'react-native';
import { metrics, colors, fonts } from 'Styles/index';

const { height: screenHeight } = Dimensions.get('window');
const styles = StyleSheet.create({
  btnRegister: {
    backgroundColor: colors.primary
  },
  btnRegisterDisabled: {
    backgroundColor: colors.primaryLight
  },
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  conteinerLogo: {
    flex: 1.5,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 15
  },
  conteinerForm: {
    flex: 2,
    flexDirection: 'column',
    paddingLeft: metrics.padding,
    paddingRight: metrics.padding,
    justifyContent: 'space-around'
  },
  conteinerLinkLogin: {
    flex: 0.5,
    flexDirection: 'column',
    paddingLeft: metrics.padding,
    paddingRight: metrics.padding,
    justifyContent: 'center',
    alignItems: 'center'
  },
  formInput: {
    height: 60,
    borderColor: colors.regular
  },
  item: {
    margin: 5
  },
  imageBackground: { flex: 1, height: screenHeight - 24 },
  linkLogin: {
    flex: 1,
    margin: 5,
    fontSize: fonts.big,
    textAlign: 'center',
    color: colors.fontPrimary
  },
  titleSignUp: {
    fontSize: fonts.bigger,
    color: colors.primary
  }
});

export default styles;
