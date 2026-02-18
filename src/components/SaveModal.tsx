import React, { useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Folder } from '../data/defaultFolders';

export type SaveModalProps = {
  visible: boolean;
  folders: Folder[];
  onClose: () => void;
  onSelectFolder: (folderId: string) => void;
  onCreateFolder: (name: string) => Promise<void>;
};

export function SaveModal({ visible, folders, onClose, onSelectFolder, onCreateFolder }: SaveModalProps) {
  const [creating, setCreating] = useState(false);
  const [name, setName] = useState('');

  async function handleCreate() {
    if (!name.trim()) return;
    await onCreateFolder(name);
    setName('');
    setCreating(false);
  }

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose}>
        <Pressable style={styles.sheet} onPress={() => {}}>
          <View style={styles.handle} />
          <Text style={styles.title}>Save to folder</Text>

          <View style={styles.list}>
            {folders.map((folder) => (
              <Pressable
                key={folder.id}
                style={styles.folderRow}
                onPress={() => onSelectFolder(folder.id)}
              >
                <Text style={styles.folderName}>{folder.name}</Text>
              </Pressable>
            ))}
          </View>

          {creating ? (
            <View style={styles.createRow}>
              <TextInput
                value={name}
                onChangeText={setName}
                placeholder="Folder name"
                placeholderTextColor="#666"
                style={styles.input}
              />
              <Pressable style={styles.createButton} onPress={handleCreate}>
                <Text style={styles.createButtonText}>Create</Text>
              </Pressable>
              <Pressable style={styles.cancelButton} onPress={() => setCreating(false)}>
                <Text style={styles.cancelText}>Cancel</Text>
              </Pressable>
            </View>
          ) : (
            <Pressable style={styles.newFolderButton} onPress={() => setCreating(true)}>
              <Text style={styles.newFolderText}>+ New folder</Text>
            </Pressable>
          )}
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: '#141414',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    maxHeight: '70%',
  },
  handle: {
    width: 48,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#444',
    alignSelf: 'center',
    marginBottom: 12,
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
  },
  list: {
    gap: 10,
    marginBottom: 16,
  },
  folderRow: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: '#1f1f1f',
  },
  folderName: {
    color: '#fff',
    fontSize: 14,
  },
  newFolderButton: {
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#333',
    alignItems: 'center',
  },
  newFolderText: {
    color: '#fff',
    fontSize: 14,
  },
  createRow: {
    gap: 10,
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
  createButton: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  createButtonText: {
    color: '#000',
    fontWeight: '600',
  },
  cancelButton: {
    alignItems: 'center',
  },
  cancelText: {
    color: '#aaa',
  },
});
