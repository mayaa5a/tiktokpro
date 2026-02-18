import React, { useCallback, useRef, useState } from 'react';
import { Dimensions, FlatList, StyleSheet, Text, View, ViewToken } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { VideoCard } from '../components/VideoCard';
import { SaveModal } from '../components/SaveModal';
import { useAppState } from '../context/AppStateContext';
import { VideoItem } from '../data/seedVideos';

const { height } = Dimensions.get('window');

export function HomeScreen() {
  const { videos, folders, saveVideoToFolder, createFolder, isVideoSaved } = useAppState();
  const [activeId, setActiveId] = useState(videos[0]?.id ?? '');
  const [saveOpen, setSaveOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);

  const viewabilityConfig = useRef({ itemVisiblePercentThreshold: 80 });
  const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems.length > 0) {
      const first = viewableItems[0].item as VideoItem;
      setActiveId(first.id);
    }
  });

  const openSave = useCallback((video: VideoItem) => {
    setSelectedVideo(video);
    setSaveOpen(true);
  }, []);

  const handleSelectFolder = useCallback(async (folderId: string) => {
    if (!selectedVideo) return;
    await saveVideoToFolder(selectedVideo.id, folderId);
    setSaveOpen(false);
  }, [saveVideoToFolder, selectedVideo]);

  const handleCreateFolder = useCallback(async (name: string) => {
    await createFolder(name);
  }, [createFolder]);

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safe} edges={['top']}>
        <View style={styles.topBar}>
          <Text style={styles.topTextMuted}>Following</Text>
          <Text style={styles.topText}>For You</Text>
        </View>
      </SafeAreaView>

      <FlatList
        data={videos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <VideoCard
            item={item}
            isActive={item.id === activeId}
            saved={isVideoSaved(item.id)}
            onPressSave={() => openSave(item)}
          />
        )}
        pagingEnabled
        snapToInterval={height}
        decelerationRate="fast"
        showsVerticalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged.current}
        viewabilityConfig={viewabilityConfig.current}
      />

      <SaveModal
        visible={saveOpen}
        folders={folders}
        onClose={() => setSaveOpen(false)}
        onSelectFolder={handleSelectFolder}
        onCreateFolder={handleCreateFolder}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  safe: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    paddingTop: 8,
  },
  topText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  topTextMuted: {
    color: '#888',
    fontSize: 16,
  },
});
