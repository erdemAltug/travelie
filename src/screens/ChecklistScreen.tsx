import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  StatusBar,
} from 'react-native';
import { Destination, ChecklistItem } from '../data/destinations';

interface ChecklistScreenProps {
  destination: Destination;
  onBack: () => void;
}

const ChecklistScreen: React.FC<ChecklistScreenProps> = ({
  destination,
  onBack,
}) => {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());

  const toggleItem = (itemId: string) => {
    const newChecked = new Set(checkedItems);
    if (newChecked.has(itemId)) {
      newChecked.delete(itemId);
    } else {
      newChecked.add(itemId);
    }
    setCheckedItems(newChecked);
  };

  const getCategoryIcon = (category: string): string => {
    switch (category) {
      case 'documents':
        return '📄';
      case 'clothing':
        return '👕';
      case 'electronics':
        return '📱';
      case 'toiletries':
        return '🧴';
      case 'medicine':
        return '💊';
      default:
        return '📦';
    }
  };

  const getCategoryName = (category: string): string => {
    switch (category) {
      case 'documents':
        return 'Evraklar';
      case 'clothing':
        return 'Kıyafetler';
      case 'electronics':
        return 'Elektronik';
      case 'toiletries':
        return 'Tuvalet Malzemeleri';
      case 'medicine':
        return 'İlaçlar';
      default:
        return 'Diğer';
    }
  };

  // Group items by category
  const groupedItems = destination.checklist.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, ChecklistItem[]>);

  const categories = Object.keys(groupedItems);

  const progress = Math.round(
    (checkedItems.size / destination.checklist.length) * 100
  );

  const handleReset = () => {
    Alert.alert(
      'Listeyi Sıfırla',
      'Tüm işaretlemeleri kaldırmak istediğinizden emin misiniz?',
      [
        { text: 'İptal', style: 'cancel' },
        {
          text: 'Sıfırla',
          style: 'destructive',
          onPress: () => setCheckedItems(new Set()),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#4a90d9" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>← Geri</Text>
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerIcon}>{destination.icon}</Text>
          <Text style={styles.headerTitle}>{destination.name}</Text>
        </View>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>
        <Text style={styles.progressText}>
          {checkedItems.size} / {destination.checklist.length} ✓
        </Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      >
        {categories.map((category) => (
          <View key={category} style={styles.categorySection}>
            <View style={styles.categoryHeader}>
              <Text style={styles.categoryIcon}>
                {getCategoryIcon(category)}
              </Text>
              <Text style={styles.categoryTitle}>
                {getCategoryName(category)}
              </Text>
            </View>

            {groupedItems[category].map((item) => {
              const isChecked = checkedItems.has(item.id);
              return (
                <TouchableOpacity
                  key={item.id}
                  style={[styles.item, isChecked && styles.itemChecked]}
                  onPress={() => toggleItem(item.id)}
                  activeOpacity={0.7}
                >
                  <View
                    style={[styles.checkbox, isChecked && styles.checkboxChecked]}
                  >
                    {isChecked && <Text style={styles.checkmark}>✓</Text>}
                  </View>
                  <Text
                    style={[styles.itemText, isChecked && styles.itemTextChecked]}
                  >
                    {item.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        ))}
      </ScrollView>

      {/* Reset Button */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
          <Text style={styles.resetButtonText}>🔄 Listeyi Sıfırla</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
  header: {
    backgroundColor: '#4a90d9',
    paddingTop: 10,
    paddingBottom: 20,
    paddingHorizontal: 16,
  },
  backButton: {
    marginBottom: 12,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    fontSize: 36,
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  progressBar: {
    flex: 1,
    height: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    marginRight: 12,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4caf50',
    borderRadius: 5,
  },
  progressText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    minWidth: 60,
    textAlign: 'right',
  },
  scrollView: {
    flex: 1,
  },
  listContent: {
    padding: 16,
  },
  categorySection: {
    marginBottom: 20,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 2,
    borderBottomColor: '#4a90d9',
  },
  categoryIcon: {
    fontSize: 24,
    marginRight: 8,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  itemChecked: {
    backgroundColor: '#e8f5e9',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#ccc',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#4caf50',
    borderColor: '#4caf50',
  },
  checkmark: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  itemText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  itemTextChecked: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  footer: {
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  resetButton: {
    backgroundColor: '#ff6b6b',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ChecklistScreen;
