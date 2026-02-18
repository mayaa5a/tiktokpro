import React, { useMemo } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Video } from 'expo-av';
import { useAppState } from '../context/AppStateContext';

export function FolderDetailScreen() {
  const route = useRoute<any>();
  const { folderSaves, folders, videos } = useAppState();
  const folderId = route.params?.folderId as string;

  const folder = folders.find((item) => item.id === folderId);
  const savedIds = folderSaves[folderId] ?? [];

  const savedVideos = useMemo(() => {
    return videos.filter((video) => savedIds.includes(video.id));
  }, [videos, savedIds]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{folder?.name ?? 'Folder'}</Text>

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
                source={{ uri: item.uri }}
                style={styles.thumbnail}
                resizeMode="cover"
                isMuted
                shouldPlay={false}
              />
              <View style={styles.meta}>
                <Text style={styles.caption}>{item.caption}</Text>
                <Text style={styles.creator}>{item.creator}</Text>
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
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    paddingHorizontal: 16,
    marginBottom: 12,
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
