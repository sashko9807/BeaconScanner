import { View, StyleSheet } from 'react-native';
import React from 'react';
import globalStyles from '../globals/styles'

const MainLayout = ({ children }) => {
  return (
    <View style={mainStyle.wrapper}>
      <View style={mainStyle.container}>
        {children}
      </View>
    </View>
  );
};

const mainStyle = StyleSheet.create({
  wrapper: {
    ...StyleSheet.absoluteFill,
    backgroundColor: globalStyles.colorSet.PRIMARY,
  },
  container: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    height: '100%',
    backgroundColor: globalStyles.colorSet.SECONDARY,
    overflow: 'hidden'
  },
});

export default MainLayout;