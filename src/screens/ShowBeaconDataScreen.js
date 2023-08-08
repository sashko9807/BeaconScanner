import { Image, StyleSheet, Text, View, StatusBar } from 'react-native';
import React, { useEffect, useState } from 'react';
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
  const [isPortrait, setIsPortrait] = useState(true)
  const imageSize = Image.getSize(imageUri, (width, height) => { setIsPortrait(width < height) })
  const isFocused = useIsFocused()
  useEffect(() => {

    const lockOrientation = async () => {
      if (isPortrait) {
        return await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)
      }
      return await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE)
    }

    const unlockOrientation = async () => await ScreenOrientation.unlockAsync()

    if (isFocused) {
      lockOrientation()
    } else {
      unlockOrientation()
    }



  }, [isPortrait, isFocused]);

  return (
    <View style={{ flex: 1 }}>
      <Image source={{ uri: imageUri }} style={{
        height: '100%',
        width: '100%'
      }}
        resizeMode={'cover'}
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

