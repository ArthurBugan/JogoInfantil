import { StyleSheet } from 'react-native';
import { metrics } from 'Styles/index';

const styles = StyleSheet.create({
  container: { flex: 1, padding: metrics.padding },
  imageBackground: { flex: 1, width: null },
  logo: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  logoText: { fontSize: 25, backgroundColor: 'transparent', color: '#fff' },
  groupButtons: { flex: 2 }
});

export default styles;
