import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ICON_SIZE = 28;

export type ActionButtonsProps = {
  onSave: () => void;
  saved: boolean;
};

export function ActionButtons({ onSave, saved }: ActionButtonsProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} activeOpacity={0.8}>
        <Ionicons name="heart" size={ICON_SIZE} color="#fff" />
        <Text style={styles.count}>12.3K</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} activeOpacity={0.8}>
        <Ionicons name="chatbubble-ellipses" size={ICON_SIZE} color="#fff" />
        <Text style={styles.count}>480</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} activeOpacity={0.8}>
        <Ionicons name="share-social" size={ICON_SIZE} color="#fff" />
        <Text style={styles.count}>1.9K</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onSave} activeOpacity={0.8}>
        <Ionicons
          name={saved ? 'bookmark' : 'bookmark-outline'}
          size={ICON_SIZE}
          color={saved ? '#ffd54f' : '#fff'}
        />
        <Text style={[styles.count, saved && styles.savedText]}>{saved ? 'Saved' : 'Save'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 20,
  },
  button: {
    alignItems: 'center',
  },
  count: {
    marginTop: 6,
    color: '#fff',
    fontSize: 12,
  },
  savedText: {
    color: '#ffd54f',
  },
});
