import React, { useEffect, useRef } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { VideoItem } from '../data/seedVideos';
import { ActionButtons } from './ActionButtons';

const { height, width } = Dimensions.get('window');

export type VideoCardProps = {
  item: VideoItem;
  isActive: boolean;
  onPressSave: () => void;
  saved: boolean;
};

export function VideoCard({ item, isActive, onPressSave, saved }: VideoCardProps) {
  const videoRef = useRef<Video>(null);

  useEffect(() => {
    if (!videoRef.current) return;
    if (isActive) {
      videoRef.current.playAsync();
    } else {
      videoRef.current.pauseAsync();
    }
  }, [isActive]);

  return (
    <View style={styles.container}>
      <Video
        ref={videoRef}
        source={{ uri: item.videoUri }}
        style={styles.video}
        resizeMode={ResizeMode.COVER}
        isLooping
        shouldPlay={isActive}
        isMuted={false}
      />
      <View style={styles.overlay}>
        <View style={styles.left}>
          <Text style={styles.creator}>{item.creator ?? '@tokpro'}</Text>
          <Text style={styles.caption}>{item.title}</Text>
          <Text style={styles.caption}>{item.caption}</Text>
          <Text style={styles.tags}>{item.tags.join(' ')}</Text>
        </View>
        <View style={styles.right}>
          <ActionButtons onSave={onPressSave} saved={saved} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height,
    width,
    backgroundColor: '#000',
  },
  video: {
    position: 'absolute',
    height,
    width,
  },
  overlay: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 90,
  },
  left: {
    alignSelf: 'flex-end',
    width: '70%',
    gap: 6,
  },
  right: {
    alignSelf: 'flex-end',
    paddingRight: 6,
    paddingBottom: 20,
  },
  creator: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  caption: {
    color: '#fff',
    fontSize: 14,
  },
  tags: {
    color: '#cfcfcf',
    fontSize: 12,
  },
});
