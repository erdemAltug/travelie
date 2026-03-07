import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { destinations, Destination } from '../data/destinations';

interface DestinationScreenProps {
  onSelectDestination: (destination: Destination) => void;
}

const DestinationScreen: React.FC<DestinationScreenProps> = ({
  onSelectDestination,
}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>✈️ Nereye Gidiyorsun?</Text>
        <Text style={styles.subtitle}>
          Tatil türünü seç, senin için kontrol listesi hazırlayalım!
        </Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.gridContainer}
        showsVerticalScrollIndicator={false}
      >
        {destinations.map((destination) => (
          <TouchableOpacity
            key={destination.id}
            style={styles.card}
            onPress={() => onSelectDestination(destination)}
            activeOpacity={0.7}
          >
            <Text style={styles.cardIcon}>{destination.icon}</Text>
            <Text style={styles.cardTitle}>{destination.name}</Text>
            <Text style={styles.cardDescription}>{destination.description}</Text>
            <View style={styles.itemCount}>
              <Text style={styles.itemCountText}>
                📋 {destination.checklist.length} item
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
  header: {
    padding: 20,
    backgroundColor: '#4a90d9',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
  },
  scrollView: {
    flex: 1,
  },
  gridContainer: {
    padding: 16,
    gap: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    alignItems: 'center',
  },
  cardIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 12,
  },
  itemCount: {
    backgroundColor: '#e8f4fd',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  itemCountText: {
    fontSize: 14,
    color: '#4a90d9',
    fontWeight: '600',
  },
});

export default DestinationScreen;
