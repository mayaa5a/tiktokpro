import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Folder } from '../data/defaultFolders';

export type FolderListProps = {
  folders: Folder[];
  onPressFolder: (folder: Folder) => void;
};

export function FolderList({ folders, onPressFolder }: FolderListProps) {
  return (
    <FlatList
      data={folders}
      keyExtractor={(item) => item.id}
      numColumns={2}
      columnWrapperStyle={styles.row}
      contentContainerStyle={styles.container}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.card} onPress={() => onPressFolder(item)}>
          <View style={styles.thumbnail} />
          <Text style={styles.name}>{item.name}</Text>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 16,
  },
  row: {
    gap: 16,
  },
  card: {
    flex: 1,
    backgroundColor: '#1b1b1b',
    borderRadius: 14,
    padding: 12,
    minHeight: 120,
  },
  thumbnail: {
    backgroundColor: '#2a2a2a',
    borderRadius: 10,
    height: 60,
    marginBottom: 10,
  },
  name: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});
