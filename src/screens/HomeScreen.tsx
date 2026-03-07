import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Destination, ChecklistItem, defaultChecklist } from '../data/destinations';

interface Trip {
  id: string;
  destination: Destination;
  date: string;
  items: ChecklistItem[];
  checkedItems: Set<string>;
}

interface HomeScreenProps {
  onNewTrip: () => void;
  onViewTrip: (trip: Trip) => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onNewTrip, onViewTrip }) => {
  // Sample trips data - in a real app this would come from storage/database
  const [trips, setTrips] = useState<Trip[]>([
    {
      id: '1',
      destination: {
        id: 'beach',
        name: 'Plaj Tatili',
        icon: '🏖️',
        description: 'Antalya',
        checklist: [],
      },
      date: '15-22 Temmuz 2024',
      items: defaultChecklist,
      checkedItems: new Set(['d1', 'd2', 'd3']),
    },
    {
      id: '2',
      destination: {
        id: 'city',
        name: 'Şehir Turu',
        icon: '🏙️',
        description: 'İstanbul',
        checklist: [],
      },
      date: '5-8 Eylül 2024',
      items: defaultChecklist,
      checkedItems: new Set(),
    },
  ]);

  const getProgress = (trip: Trip) => {
    if (trip.items.length === 0) return 0;
    return Math.round((trip.checkedItems.size / trip.items.length) * 100);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f7fa" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>✈️ Seyahatlerim</Text>
        <Text style={styles.headerSubtitle}>Hoş geldin!</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* New Trip Button */}
        <TouchableOpacity style={styles.newTripButton} onPress={onNewTrip}>
          <View style={styles.newTripContent}>
            <Text style={styles.newTripIcon}>➕</Text>
            <View style={styles.newTripText}>
              <Text style={styles.newTripTitle}>Yeni Seyahat</Text>
              <Text style={styles.newTripDesc}>
                Yeni bir tatil planla
              </Text>
            </View>
          </View>
          <Text style={styles.arrow}>→</Text>
        </TouchableOpacity>

        {/* Past Trips */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📋 Geçmiş Seyahatler</Text>
          
          {trips.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyIcon}>🧳</Text>
              <Text style={styles.emptyText}>
                Henüz seyahat yok
              </Text>
              <Text style={styles.emptySubtext}>
                Yukarıdaki butona tıklayarak ilk seyahatini oluştur!
              </Text>
            </View>
          ) : (
            trips.map((trip) => (
              <TouchableOpacity
                key={trip.id}
                style={styles.tripCard}
                onPress={() => onViewTrip(trip)}
                activeOpacity={0.7}
              >
                <View style={styles.tripHeader}>
                  <Text style={styles.tripIcon}>{trip.destination.icon}</Text>
                  <View style={styles.tripInfo}>
                    <Text style={styles.tripName}>{trip.destination.name}</Text>
                    <Text style={styles.tripDate}>{trip.date}</Text>
                  </View>
                </View>
                
                <View style={styles.tripProgress}>
                  <View style={styles.progressBar}>
                    <View
                      style={[
                        styles.progressFill,
                        { width: `${getProgress(trip)}%` },
                      ]}
                    />
                  </View>
                  <Text style={styles.progressText}>{getProgress(trip)}%</Text>
                </View>
              </TouchableOpacity>
            ))
          )}
        </View>

        {/* Stats */}
        <View style={styles.statsSection}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{trips.length}</Text>
            <Text style={styles.statLabel}>Toplam Seyahat</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>
              {trips.reduce((acc, t) => acc + t.checkedItems.size, 0)}
            </Text>
            <Text style={styles.statLabel}>Hazırlanan Item</Text>
          </View>
        </View>
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
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  newTripButton: {
    backgroundColor: '#4a90d9',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
    shadowColor: '#4a90d9',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  newTripContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  newTripIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  newTripText: {
    flex: 1,
  },
  newTripTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  newTripDesc: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 2,
  },
  arrow: {
    fontSize: 24,
    color: '#fff',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  emptyState: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  tripCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  tripHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  tripIcon: {
    fontSize: 36,
    marginRight: 12,
  },
  tripInfo: {
    flex: 1,
  },
  tripName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  tripDate: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  tripProgress: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    marginRight: 12,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4caf50',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4caf50',
    minWidth: 40,
    textAlign: 'right',
  },
  statsSection: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4a90d9',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
});

export default HomeScreen;
