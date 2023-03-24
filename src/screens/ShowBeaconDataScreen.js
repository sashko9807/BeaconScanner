import { Image, StyleSheet, Text, View, StatusBar } from 'react-native';
import React from 'react';
import { useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';

import ActivityIndicatorComponent from '../components/ActivityIndicatorComponent';
import { getUri } from '../filesystem/filesystem';
import { WebView } from 'react-native-webview';
import * as ScreenOrientation from 'expo-screen-orientation';

import {
  hideNavigationBar,
  showNavigationBar,
} from 'react-native-navigation-bar-color';

const ShowBeaconDataScreen = ({ route }) => {
  const { dataType, data } = route.params;

  const isFocused = useIsFocused();

  useEffect(() => {
    if (!isFocused) {
      showNavigationBar();
      StatusBar.setHidden(false);
      return;
    }

    hideNavigationBar();
    StatusBar.setHidden(true);

  }, [isFocused]);

  return (
    <>
      {dataType === 'image' && <ImageData imageUri={getUri(data)} />}
      {dataType === 'plain-text' && <TextData message={data} />}
      {dataType === 'web-address' && <WebData link={data} />}
    </>
  );
};

const ImageData = ({ imageUri }) => {

  const isPortrait = Image.getSize(imageUri, (width, height) => { if (width < height) return true })
  useEffect(() => {
    // ScreenOrientation.getOrientationAsync().then((info) => {
    //   setOrientation(info);
    // });

    // const subscription = ScreenOrientation.addOrientationChangeListener((evt) => {
    //   console.log(`Changing value to ${evt.orientationInfo.orientation}`)
    //   setOrientation(evt.orientationInfo.orientation);
    // });
    // return () => {
    //   ScreenOrientation.removeOrientationChangeListener(subscription);
    // };

    const lockOrientation = async () => {
      if (isPortrait) {
        return await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)
      }
      return await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE)
    }

    lockOrientation()
  }, [isPortrait]);

  return (
    <View style={{ flex: 1 }}>
      <Image source={{ uri: imageUri }} style={{
        height: '100%',
      }}
        resizeMode={'stretch'}
      />
    </View>
  );
};

const WebData = ({ link }) => {
  return (
    <WebView
      source={{ uri: link }}
      startInLoadingState={true}
      renderLoading={() => {
        return (
          <View
            style={{
              ...StyleSheet.absoluteFill
            }}
          >
            <ActivityIndicatorComponent text="Loading" />
          </View>
        );
      }}
    />
  );
};

const TextData = ({ message }) => {
  console.log(`textdata caled`);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text style={{ fontSize: 20 }}>{message}</Text>
    </View>
  );
};

export default ShowBeaconDataScreen;

