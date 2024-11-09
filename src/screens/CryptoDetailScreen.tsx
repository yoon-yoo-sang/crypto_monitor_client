import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const CryptoDetailScreen = () => {
  //   const navigation = useNavigation();
  const currentPrice = '$56,000';
  const dopamineIndex = 75;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Bitcoin</Text>
        <TouchableOpacity style={styles.openButton}>
          <Text style={styles.openButtonText}>Open Upbit</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          Current Price: <Text style={styles.infoValue}>{currentPrice}</Text>
        </Text>
        <Text style={styles.infoText}>
          Dopamine Index: <Text style={styles.infoValue}>{dopamineIndex}</Text>
        </Text>
      </View>

      <View style={styles.graphContainer}>
        {/* 그래프를 표시할 공간 - 그래프 라이브러리를 사용하여 추가 가능 */}
        <Text style={styles.placeholderText}>Graph Placeholder</Text>
      </View>

      <TouchableOpacity style={styles.exploreButton}>
        <Text style={styles.exploreButtonText}>Explore More</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5ff',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  openButton: {
    backgroundColor: '#4F61FF',
    padding: 10,
    borderRadius: 5,
  },
  openButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  infoContainer: {
    backgroundColor: '#e6e6fa',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  infoText: {
    fontSize: 18,
    marginBottom: 5,
  },
  infoValue: {
    fontWeight: 'bold',
  },
  graphContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
  },
  placeholderText: {
    fontSize: 16,
    color: '#888',
  },
  exploreButton: {
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  exploreButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CryptoDetailScreen;
