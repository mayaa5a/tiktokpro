import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { defaultFolders, Folder } from '../data/defaultFolders';
import { seedVideos, VideoItem } from '../data/seedVideos';
import { seedFolderSavesByName } from '../data/seedFolderSaves';
import { getJson, setJson } from '../storage/storage';

export type FolderSaves = Record<string, string[]>;

type AppState = {
  videos: VideoItem[];
  folders: Folder[];
  folderSaves: FolderSaves;
  createFolder: (name: string) => Promise<Folder | null>;
  saveVideoToFolder: (videoId: string, folderId: string) => Promise<void>;
  unsaveVideoFromFolder: (videoId: string, folderId: string) => Promise<void>;
  isVideoSaved: (videoId: string) => boolean;
  getFoldersForVideo: (videoId: string) => Folder[];
};

const STORAGE_KEYS = {
  folders: 'folders',
  folderSaves: 'tokpro_folderSaves_v1',
};

const AppStateContext = createContext<AppState | null>(null);

function buildEmptySaves(folders: Folder[]): FolderSaves {
  const initial: FolderSaves = {};
  folders.forEach((folder) => {
    initial[folder.id] = [];
  });
  return initial;
}

function ensureNYCTripFolder(folders: Folder[]): Folder[] {
  const hasNYCTrip = folders.some((folder) => folder.name === 'NYC Trip');
  if (hasNYCTrip) return folders;
  const hasF1 = folders.some((folder) => folder.id === 'f1');
  const nycFolder: Folder = {
    id: hasF1 ? `${Date.now()}-nyc` : 'f1',
    name: 'NYC Trip',
    createdAt: Date.now(),
  };
  return [nycFolder, ...folders];
}

function mergeSeedSaves(base: FolderSaves, folders: Folder[]): FolderSaves {
  const next: FolderSaves = { ...base };
  Object.entries(seedFolderSavesByName).forEach(([folderName, videoIds]) => {
    const folder = folders.find((item) => item.name === folderName);
    if (!folder) return;
    const existing = next[folder.id] ?? [];
    next[folder.id] = Array.from(new Set([...existing, ...videoIds]));
  });
  return next;
}

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [videos] = useState<VideoItem[]>(seedVideos);
  const [folders, setFolders] = useState<Folder[]>(defaultFolders);
  const [folderSaves, setFolderSaves] = useState<FolderSaves>(buildEmptySaves(defaultFolders));

  useEffect(() => {
    let isMounted = true;
    async function load() {
      const storedFolders = await getJson<Folder[]>(STORAGE_KEYS.folders);
      const storedSaves = await getJson<FolderSaves>(STORAGE_KEYS.folderSaves);

      if (!isMounted) return;

      if (storedFolders && storedFolders.length > 0) {
        const ensured = ensureNYCTripFolder(storedFolders);
        setFolders(ensured);
        if (ensured.length !== storedFolders.length) {
          await setJson(STORAGE_KEYS.folders, ensured);
        }
      } else {
        await setJson(STORAGE_KEYS.folders, defaultFolders);
      }

      const baseFolders = storedFolders && storedFolders.length > 0
        ? ensureNYCTripFolder(storedFolders)
        : defaultFolders;

      if (storedSaves) {
        const withAllFolders = { ...storedSaves };
        baseFolders.forEach((folder) => {
          if (!withAllFolders[folder.id]) withAllFolders[folder.id] = [];
        });
        setFolderSaves(withAllFolders);
        await setJson(STORAGE_KEYS.folderSaves, withAllFolders);
      } else {
        const initial = mergeSeedSaves(buildEmptySaves(baseFolders), baseFolders);
        setFolderSaves(initial);
        await setJson(STORAGE_KEYS.folderSaves, initial);
      }
    }

    load();
    return () => {
      isMounted = false;
    };
  }, []);

  const createFolder = useCallback(async (name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return null;
    const newFolder: Folder = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      name: trimmed,
      createdAt: Date.now(),
    };

    const nextFolders = [newFolder, ...folders];
    const nextSaves: FolderSaves = {
      ...folderSaves,
      [newFolder.id]: [],
    };

    setFolders(nextFolders);
    setFolderSaves(nextSaves);
    await setJson(STORAGE_KEYS.folders, nextFolders);
    await setJson(STORAGE_KEYS.folderSaves, nextSaves);
    return newFolder;
  }, [folders, folderSaves]);

  const saveVideoToFolder = useCallback(async (videoId: string, folderId: string) => {
    const existing = folderSaves[folderId] ?? [];
    if (existing.includes(videoId)) return;
    const next = {
      ...folderSaves,
      [folderId]: [...existing, videoId],
    };
    setFolderSaves(next);
    await setJson(STORAGE_KEYS.folderSaves, next);
  }, [folderSaves]);

  const unsaveVideoFromFolder = useCallback(async (videoId: string, folderId: string) => {
    const existing = folderSaves[folderId] ?? [];
    if (!existing.includes(videoId)) return;
    const next = {
      ...folderSaves,
      [folderId]: existing.filter((id) => id !== videoId),
    };
    setFolderSaves(next);
    await setJson(STORAGE_KEYS.folderSaves, next);
  }, [folderSaves]);

  const savedMap = useMemo(() => {
    const map: Record<string, string[]> = {};
    Object.entries(folderSaves).forEach(([folderId, videoIds]) => {
      videoIds.forEach((videoId) => {
        if (!map[videoId]) map[videoId] = [];
        map[videoId].push(folderId);
      });
    });
    return map;
  }, [folderSaves]);

  const isVideoSaved = useCallback((videoId: string) => {
    return !!savedMap[videoId] && savedMap[videoId].length > 0;
  }, [savedMap]);

  const getFoldersForVideo = useCallback((videoId: string) => {
    const folderIds = savedMap[videoId] ?? [];
    return folders.filter((folder) => folderIds.includes(folder.id));
  }, [folders, savedMap]);

  const value = useMemo(() => ({
    videos,
    folders,
    folderSaves,
    createFolder,
    saveVideoToFolder,
    unsaveVideoFromFolder,
    isVideoSaved,
    getFoldersForVideo,
  }), [
    videos,
    folders,
    folderSaves,
    createFolder,
    saveVideoToFolder,
    unsaveVideoFromFolder,
    isVideoSaved,
    getFoldersForVideo,
  ]);

  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  );
}

export function useAppState() {
  const ctx = useContext(AppStateContext);
  if (!ctx) {
    throw new Error('useAppState must be used within AppStateProvider');
  }
  return ctx;
}
