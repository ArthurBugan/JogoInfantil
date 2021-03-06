import { Animated, Easing } from 'react-native';

const transitionConfig = () => ({
  transitionSpec: {
    duration: 250,
    easing: Easing.out(Easing.poly(4)),
    timing: Animated.timing,
    useNativeDriver: true,
  },
  screenInterpolator: (sceneProps) => {
    const { position, layout, scene, index, Screens } = sceneProps;
    const toIndex = index;
    const thisSceneIndex = scene.index;
    const height = layout.initHeight;
    const width = layout.initWidth;
    // const toLeft = [-width, 0, width];
    const toRigth = [width, 0, 0];

    const translateX = position.interpolate({
      inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
      outputRange: toRigth
    });

    // Since we want the card to take the same amount of time
    // to animate downwards no matter if it's 3rd on the stack
    // or 53rd, we interpolate over the entire range from 0 - thisSceneIndex
    const translateY = position.interpolate({
      inputRange: [0, thisSceneIndex],
      outputRange: [height, 0]
    });

    const slideFromRight = { transform: [{ translateX }] };
    const slideFromBottom = { transform: [{ translateY }] };

    const lastSceneIndex = Screens[Screens.length - 1].index;

    // Test whether we're skipping back more than one screen
    if (lastSceneIndex - toIndex > 1) {
      // Do not transoform the screen being navigated to
      if (scene.index === toIndex) {
        return false;
      }
      // Hide all screens in between
      if (scene.index !== lastSceneIndex) {
        return { opacity: 0 };
      }
      // Slide top screen down
      return slideFromBottom;
    }

    return slideFromRight;
  },
});

export default transitionConfig;
