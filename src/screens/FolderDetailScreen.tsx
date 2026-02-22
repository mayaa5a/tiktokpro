import React, { useEffect, useMemo, useRef, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Video } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import { useAppState } from '../context/AppStateContext';

export function FolderDetailScreen() {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { folderSaves, folders, videos } = useAppState();
  const folderId = route.params?.folderId as string;
  const [exporting, setExporting] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const folder = folders.find((item) => item.id === folderId);
  const savedIds = folderSaves[folderId] ?? [];

  const savedVideos = useMemo(() => {
    return videos.filter((video) => savedIds.includes(video.id));
  }, [videos, savedIds]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleExport = () => {
    if (exporting) return;
    setExporting(true);
    timeoutRef.current = setTimeout(() => {
      setExporting(false);
      navigation.navigate('ExportResults', { folderId });
    }, 1200);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>{folder?.name ?? 'Folder'}</Text>
          <Text style={styles.subtitle}>{savedVideos.length} saved</Text>
        </View>
        <Pressable style={styles.exportButton} onPress={handleExport}>
          <Ionicons name="share-outline" size={18} color="#000" />
          <Text style={styles.exportText}>{exporting ? 'Generating…' : 'Export'}</Text>
        </Pressable>
      </View>

      {savedVideos.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>No saved videos yet</Text>
        </View>
      ) : (
        <FlatList
          data={savedVideos}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Video
                source={{ uri: item.videoUri }}
                style={styles.thumbnail}
                resizeMode="cover"
                isMuted
                shouldPlay={false}
              />
              <View style={styles.meta}>
                <Text style={styles.caption}>{item.title}</Text>
                <Text style={styles.creator}>{item.caption}</Text>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: 16,
  },
  header: {
    paddingHorizontal: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },
  subtitle: {
    color: '#777',
    fontSize: 12,
    marginTop: 4,
  },
  exportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 999,
  },
  exportText: {
    color: '#000',
    fontWeight: '600',
    fontSize: 13,
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 20,
    gap: 12,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#141414',
    borderRadius: 12,
    overflow: 'hidden',
  },
  thumbnail: {
    width: 120,
    height: 90,
    backgroundColor: '#1f1f1f',
  },
  meta: {
    flex: 1,
    padding: 12,
    gap: 6,
  },
  caption: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  creator: {
    color: '#888',
    fontSize: 12,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    color: '#777',
  },
});
