import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import globalStyles from '../styles/globalStyles';

const coinData = [
  {
    id: '1',
    name: 'Bitcoin (BTC)',
    priceChange: '5.2%',
    volume: '$3.2B',
    dopamineIndex: 75,
  },
  {
    id: '2',
    name: 'Ethereum (ETH)',
    priceChange: '3.8%',
    volume: '$1.5B',
    dopamineIndex: 68,
  },
  {
    id: '3',
    name: 'Ripple (XRP)',
    priceChange: '2.1%',
    volume: '$800M',
    dopamineIndex: 55,
  },
];

const HomeScreen = () => {
  const navigation = useNavigation();

  const renderItem = ({item}) => (
    <View style={styles.card}>
      <View>
        <Text style={styles.coinName}>{item.name}</Text>
        <Text style={styles.coinInfo}>Price Change: {item.priceChange}</Text>
        <Text style={styles.coinInfo}>Volume: {item.volume}</Text>
        <Text style={styles.coinInfo}>
          Dopamine Index: {item.dopamineIndex}
        </Text>
      </View>
      <View>
        <TouchableOpacity
          style={styles.openButton}
          onPress={() => {
            navigation.navigate('CryptoDetail');
          }}>
          <Text style={styles.openButtonText}>Open</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.appTitle}>CoinApp</Text>
        <TouchableOpacity style={styles.refreshButton}>
          <Text style={styles.refreshButtonText}>Refresh</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={coinData}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        style={styles.content}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    ...globalStyles.flex_row_spaceBetween,
    height: Platform.OS === 'ios' ? 130 : 80,
    paddingTop: Platform.OS === 'ios' ? 50 : 0,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1.5,
  },
  appTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  refreshButton: {
    backgroundColor: '#ff7f50',
    padding: 8,
    borderRadius: 5,
  },
  refreshButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  content: {
    paddingHorizontal: 20,
  },
  card: {
    ...globalStyles.flex_row_spaceBetween,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  coinName: {
    fontFamily: 'Roboto',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  coinInfo: {
    marginBottom: 3,
    color: '#979797',
    fontSize: 12,
    fontFamily: 'Roboto',
    lineHeight: 16,
  },
  openButton: {
    backgroundColor: '#ff7f50',
    padding: 8,
    borderRadius: 5,
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  openButtonText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default HomeScreen;
