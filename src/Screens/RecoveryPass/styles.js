import { Dimensions, StyleSheet } from 'react-native';
import { metrics, colors, fonts } from 'Styles';

const { height: screenHeight } = Dimensions.get('window');
const styles = StyleSheet.create({
  btnSend: {
    backgroundColor: colors.primary
  },
  btnSendDisabled: {
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
    flex: 1.5,
    paddingTop: 50,
    paddingLeft: metrics.padding,
    paddingRight: metrics.padding,
    justifyContent: 'space-between'
  },
  conteinerLinkLogin: {
    flex: 0.5,
    flexDirection: 'column',
    paddingLeft: metrics.padding,
    paddingRight: metrics.padding,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageBackground: {
    flex: 1,
    height: screenHeight - 24
  },
  linkLogin: {
    flex: 1,
    margin: 5,
    fontSize: fonts.big,
    textAlign: 'center',
    color: colors.fontPrimary
  },
  textRecoveryPass: {
    flex: 1,
    margin: 5,
    fontSize: fonts.small,
    color: colors.regular,
    paddingLeft: metrics.padding,
    paddingRight: metrics.padding,
    textAlign: 'center'
  },
  titleRecovery: {
    fontSize: fonts.bigger,
    color: colors.primary
  }
});

export default styles;
