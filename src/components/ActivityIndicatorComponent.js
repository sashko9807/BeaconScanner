import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

const ActivityIndicatorComponent = ({ text = '' }) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="small" color="#0000ff" />
      <Text>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
})

export default ActivityIndicatorComponent;
