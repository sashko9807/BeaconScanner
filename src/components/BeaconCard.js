import { StyleSheet, Text, View, Pressable } from 'react-native';
import globalStyles from '../globals/styles'

const BeaconCard = ({ onPress, beaconData = {} }) => {
  return (
    <View>
      <Pressable onPress={onPress}>
        <View style={styles.cardContainer}>
          <View style={styles.cardLayout}>
            <View style={styles.beaconNameAndDistance}>
              <View style={styles.beaconType}>
                <Text style={styles.beaconNameText}>{beaconData.beaconName}</Text>
              </View>
              <View style={styles.beaconDistance}>
                <Text style={styles.beaconDistanceText}>{beaconData.distance}m</Text>
              </View>
            </View>
          </View>
        </View>
      </Pressable>
    </View>
  );
};

export default BeaconCard;

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 6,
    elevation: 3,
    backgroundColor: globalStyles.colorSet.SECONDARY,
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowRadius: 1,
    marginHorizontal: 10,
    marginTop: 20,
    flexShrink: 3
  },
  cardLayout: {
    marginHorizontal: 20,
    marginVertical: 20,
  },
  beaconNameAndDistance: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    paddingBottom: 5,
  },
  beaconType: {
    alignSelf: 'flex-start'
  },
  beaconTypeText: {
    fontSize: globalStyles.fontSizeSet.fontMedium
  },
  beaconDistance: {
    alignSelf: 'flex-end',
  },
  beaconDistanceText: {
    fontSize: globalStyles.fontSizeSet.fontMedium,
  },
});
