import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet } from 'react-native';
import { HomeScreen, DestinationScreen, ChecklistScreen } from './src/screens';
import { Destination, ChecklistItem } from './src/data/destinations';

type Screen = 'home' | 'destination' | 'checklist';

interface Trip {
  id: string;
  destination: Destination;
  date: string;
  items: ChecklistItem[];
  checkedItems: Set<string>;
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);

  const handleNewTrip = () => {
    setCurrentScreen('destination');
  };

  const handleSelectDestination = (destination: Destination) => {
    setSelectedDestination(destination);
    setCurrentScreen('checklist');
  };

  const handleViewTrip = (trip: Trip) => {
    // For now, just go to destination selection
    // In a real app, you'd restore the trip state
    setSelectedDestination(trip.destination);
    setCurrentScreen('checklist');
  };

  const handleBack = () => {
    setCurrentScreen('home');
    setSelectedDestination(null);
  };

  const handleBackToDestinations = () => {
    setCurrentScreen('destination');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      
      {currentScreen === 'home' && (
        <HomeScreen 
          onNewTrip={handleNewTrip}
          onViewTrip={handleViewTrip}
        />
      )}
      
      {currentScreen === 'destination' && (
        <DestinationScreen onSelectDestination={handleSelectDestination} />
      )}
      
      {currentScreen === 'checklist' && selectedDestination && (
        <ChecklistScreen 
          destination={selectedDestination} 
          onBack={currentScreen === 'checklist' && selectedDestination ? handleBackToDestinations : handleBack}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
