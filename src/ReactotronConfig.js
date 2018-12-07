/* eslint-disable no-console */
import Reactotron, {
  trackGlobalErrors,
  openInEditor,
  overlay,
  asyncStorage,
  networking
} from 'reactotron-react-native';

import sagaPlugin from 'reactotron-redux-saga';
import { reactotronRedux } from 'reactotron-redux';

const tron = Reactotron.configure({
  name: 'React Native Demo',
  host: '192.168.0.103'
})
  .use(trackGlobalErrors())
  .use(openInEditor())
  .use(overlay())
  .use(asyncStorage())
  .use(networking())
  .use(reactotronRedux())
  .use(sagaPlugin())
  .useReactNative()
  .connect();

tron.clear();

console.tron = tron;
