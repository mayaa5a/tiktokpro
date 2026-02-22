import React, { useMemo, useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Folder } from '../data/defaultFolders';

export type SaveModalProps = {
  visible: boolean;
  folders: Folder[];
  savedFolderIds: string[];
  folderCounts: Record<string, number>;
  onClose: () => void;
  onSelectFolder: (folderId: string) => void;
  onCreateFolder: (name: string) => Promise<void>;
};

export function SaveModal({
  visible,
  folders,
  savedFolderIds,
  folderCounts,
  onClose,
  onSelectFolder,
  onCreateFolder,
}: SaveModalProps) {
  const [creating, setCreating] = useState(false);
  const [name, setName] = useState('');

  const savedSet = useMemo(() => new Set(savedFolderIds), [savedFolderIds]);

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
          <View style={styles.header}>
            <View style={styles.handle} />
            <Text style={styles.title}>Save to folder</Text>
            <Pressable style={styles.closeButton} onPress={onClose}>
              <Ionicons name="close" size={18} color="#fff" />
            </Pressable>
          </View>

          <View style={styles.list}>
            {folders.map((folder) => (
              <Pressable
                key={folder.id}
                style={styles.folderRow}
                onPress={() => onSelectFolder(folder.id)}
              >
                <View style={styles.folderLeft}>
                  <Text style={styles.folderName}>{folder.name}</Text>
                  <Text style={styles.folderCount}>{folderCounts[folder.id] ?? 0} saved</Text>
                </View>
                {savedSet.has(folder.id) ? (
                  <Ionicons name="checkmark-circle" size={20} color="#ffd54f" />
                ) : (
                  <Ionicons name="ellipse-outline" size={20} color="#333" />
                )}
              </Pressable>
            ))}
          </View>

          {creating ? (
            <View style={styles.createRow}>
              <TextInput
                value={name}
                onChangeText={setName}
                placeholder="Folder name..."
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
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 8,
  },
  handle: {
    width: 48,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#444',
    marginBottom: 8,
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  closeButton: {
    position: 'absolute',
    right: 4,
    top: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1f1f1f',
  },
  list: {
    gap: 10,
    marginBottom: 16,
    marginTop: 12,
  },
  folderRow: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: '#1f1f1f',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  folderLeft: {
    gap: 4,
  },
  folderName: {
    color: '#fff',
    fontSize: 14,
  },
  folderCount: {
    color: '#888',
    fontSize: 12,
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
