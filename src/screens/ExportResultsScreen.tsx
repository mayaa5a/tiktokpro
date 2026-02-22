import React, { useMemo } from 'react';
import { Pressable, ScrollView, Share, StyleSheet, Text, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import MapView, { Callout, Marker, Region } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import { useAppState } from '../context/AppStateContext';
import { getPlacesForFolder } from '../utils/exportPlaces';

const DEFAULT_REGION: Region = {
  latitude: 40.741,
  longitude: -73.989,
  latitudeDelta: 0.15,
  longitudeDelta: 0.15,
};

function buildRegion(places: { lat: number; lng: number }[]): Region {
  if (places.length === 0) return DEFAULT_REGION;
  let minLat = places[0].lat;
  let maxLat = places[0].lat;
  let minLng = places[0].lng;
  let maxLng = places[0].lng;
  places.forEach((place) => {
    minLat = Math.min(minLat, place.lat);
    maxLat = Math.max(maxLat, place.lat);
    minLng = Math.min(minLng, place.lng);
    maxLng = Math.max(maxLng, place.lng);
  });
  const latitude = (minLat + maxLat) / 2;
  const longitude = (minLng + maxLng) / 2;
  return {
    latitude,
    longitude,
    latitudeDelta: Math.max(0.08, maxLat - minLat + 0.04),
    longitudeDelta: Math.max(0.08, maxLng - minLng + 0.04),
  };
}

export function ExportResultsScreen() {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { folderSaves, folders } = useAppState();
  const folderId = route.params?.folderId as string;
  const folder = folders.find((item) => item.id === folderId);
  const savedIds = folderSaves[folderId] ?? [];

  const places = useMemo(() => getPlacesForFolder(savedIds), [savedIds]);
  const region = useMemo(() => buildRegion(places), [places]);

  const shareText = useMemo(() => {
    if (places.length === 0) return 'No places found yet.';
    return places
      .map((place) => `• ${place.name} — ${place.address} (${place.hours}) — ${place.highlights}`)
      .join('\n');
  }, [places]);

  const handleShare = async () => {
    await Share.share({
      message: shareText,
      title: `Export: ${folder?.name ?? 'Folder'}`,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={18} color="#fff" />
        </Pressable>
        <Text style={styles.headerTitle}>Export: {folder?.name ?? 'Folder'}</Text>
        <Pressable style={styles.shareButton} onPress={handleShare}>
          <Ionicons name="share-outline" size={18} color="#000" />
          <Text style={styles.shareText}>Share</Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.sectionTitle}>Places List</Text>
        {places.length === 0 ? (
          <Text style={styles.emptyText}>No places found for this folder yet.</Text>
        ) : (
          <View style={styles.list}>
            {places.map((place) => (
              <View key={place.placeId} style={styles.placeItem}>
                <Text style={styles.placeName}>- {place.name}</Text>
                <Text style={styles.placeDetail}>{place.address}</Text>
                <Text style={styles.placeDetail}>Hours: {place.hours}</Text>
                <Text style={styles.placeHighlight}>Highlights: {place.highlights}</Text>
              </View>
            ))}
          </View>
        )}

        <Text style={styles.sectionTitle}>Map</Text>
        <View style={styles.mapCard}>
          <MapView style={styles.map} initialRegion={region}>
            {places.map((place) => (
              <Marker
                key={place.placeId}
                coordinate={{ latitude: place.lat, longitude: place.lng }}
              >
                <Callout>
                  <View style={styles.callout}>
                    <Text style={styles.calloutTitle}>{place.name}</Text>
                    <Text style={styles.calloutText}>{place.address}</Text>
                  </View>
                </Callout>
              </Marker>
            ))}
          </MapView>
        </View>

        <Text style={styles.footer}>Exported from TikTok Pro</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    paddingTop: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#1f1f1f',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#fff',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 999,
  },
  shareText: {
    color: '#000',
    fontSize: 12,
    fontWeight: '600',
  },
  content: {
    padding: 16,
    gap: 16,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  list: {
    gap: 12,
  },
  placeItem: {
    backgroundColor: '#141414',
    padding: 12,
    borderRadius: 12,
  },
  placeName: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
    marginBottom: 6,
  },
  placeDetail: {
    color: '#cfcfcf',
    fontSize: 12,
    marginBottom: 4,
  },
  placeHighlight: {
    color: '#ffd54f',
    fontSize: 12,
  },
  mapCard: {
    height: 260,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#1b1b1b',
  },
  map: {
    flex: 1,
  },
  callout: {
    maxWidth: 180,
  },
  calloutTitle: {
    fontWeight: '700',
    marginBottom: 4,
  },
  calloutText: {
    fontSize: 12,
  },
  emptyText: {
    color: '#777',
    fontSize: 12,
  },
  footer: {
    color: '#555',
    fontSize: 11,
    textAlign: 'center',
    marginTop: 10,
  },
});
