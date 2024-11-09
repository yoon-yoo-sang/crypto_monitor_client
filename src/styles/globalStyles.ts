import {Platform, StyleSheet} from 'react-native';
import {Dimensions} from 'react-native';

export const basicDimensions = {
  height: 812,
  width: 375,
};

export const height = parseFloat(
  (Dimensions.get('screen').height * (1 / basicDimensions.height)).toFixed(2),
);

export const width = parseFloat(
  (Dimensions.get('screen').width * (1 / basicDimensions.width)).toFixed(2),
);

export const h = (value: number) => {
  if (isNaN(value)) {
    return 0;
  }
  return height * value;
};

export const w = (value: number) => {
  if (isNaN(value)) {
    return 0;
  }
  return width * value;
};

export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;
export const screenWidth = Dimensions.get('screen').width;
export const screenHeight = Dimensions.get('screen').height;

export const aspectRatio = screenHeight / screenWidth;
export const isLowAspectRatioDevice = aspectRatio < 1.5;

const globalStyles = StyleSheet.create({
  flex_row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flex_col: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flex_row_spaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  viewShadow: {
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOpacity: 0.3,
        shadowRadius: 5,
        shadowOffset: {
          height: 2,
          width: 0,
        },
      },
      android: {
        elevation: 3,
      },
    }),
  },
});

export default globalStyles;
