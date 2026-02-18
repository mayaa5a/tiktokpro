import React, { useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FolderList } from '../components/FolderList';
import { useAppState } from '../context/AppStateContext';

export function SavedScreen() {
  const { folders, createFolder } = useAppState();
  const navigation = useNavigation<any>();
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState('');

  async function handleCreate() {
    if (!name.trim()) return;
    await createFolder(name);
    setName('');
    setModalOpen(false);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Saved</Text>
        <Pressable style={styles.addButton} onPress={() => setModalOpen(true)}>
          <Text style={styles.addText}>+</Text>
        </Pressable>
      </View>

      <FolderList
        folders={folders}
        onPressFolder={(folder) => navigation.navigate('FolderDetail', { folderId: folder.id })}
      />

      <Modal visible={modalOpen} transparent animationType="fade" onRequestClose={() => setModalOpen(false)}>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>New folder</Text>
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="Folder name"
              placeholderTextColor="#666"
              style={styles.input}
            />
            <Pressable style={styles.modalButton} onPress={handleCreate}>
              <Text style={styles.modalButtonText}>Create</Text>
            </Pressable>
            <Pressable onPress={() => setModalOpen(false)}>
              <Text style={styles.modalCancel}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    paddingTop: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },
  addButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addText: {
    color: '#000',
    fontSize: 20,
    fontWeight: '700',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalCard: {
    width: '80%',
    backgroundColor: '#141414',
    padding: 16,
    borderRadius: 14,
    gap: 12,
  },
  modalTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#0d0d0d',
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: '#fff',
  },
  modalButton: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#000',
    fontWeight: '600',
  },
  modalCancel: {
    color: '#aaa',
    textAlign: 'center',
  },
});
