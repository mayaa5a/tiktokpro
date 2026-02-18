import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { defaultFolders, Folder } from '../data/defaultFolders';
import { seedVideos, VideoItem } from '../data/seedVideos';
import { getJson, setJson } from '../storage/storage';

export type FolderSaves = Record<string, string[]>;

type AppState = {
  videos: VideoItem[];
  folders: Folder[];
  folderSaves: FolderSaves;
  createFolder: (name: string) => Promise<Folder | null>;
  saveVideoToFolder: (videoId: string, folderId: string) => Promise<void>;
  isVideoSaved: (videoId: string) => boolean;
  getFoldersForVideo: (videoId: string) => Folder[];
};

const STORAGE_KEYS = {
  folders: 'folders',
  folderSaves: 'folderSaves',
};

const AppStateContext = createContext<AppState | null>(null);

function buildEmptySaves(folders: Folder[]): FolderSaves {
  const initial: FolderSaves = {};
  folders.forEach((folder) => {
    initial[folder.id] = [];
  });
  return initial;
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
        setFolders(storedFolders);
      } else {
        await setJson(STORAGE_KEYS.folders, defaultFolders);
      }

      if (storedSaves) {
        setFolderSaves(storedSaves);
      } else {
        const baseFolders = storedFolders && storedFolders.length > 0 ? storedFolders : defaultFolders;
        const initial = buildEmptySaves(baseFolders);
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
    isVideoSaved,
    getFoldersForVideo,
  }), [videos, folders, folderSaves, createFolder, saveVideoToFolder, isVideoSaved, getFoldersForVideo]);

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
