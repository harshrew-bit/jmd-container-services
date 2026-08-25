import { useState, useEffect, useCallback } from 'react';
import { DataService } from '../services/dataService';
import { ContainerItem, ProjectItem, BusinessContactInfo, SiteMedia } from '../types';

export function useContainers() {
  const [containers, setContainers] = useState<ContainerItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const data = await DataService.fetchContainers();
      setContainers(data);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to load containers');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { containers, loading, error, refresh };
}

export function useContainer(id?: string) {
  const [container, setContainer] = useState<ContainerItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    if (!id) {
      setContainer(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const data = await DataService.getContainerById(id);
      setContainer(data || null);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to load container details');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { container, loading, error, refresh };
}

export function useProjects() {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const data = await DataService.fetchProjects();
      setProjects(data);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to load projects');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { projects, loading, error, refresh };
}

export function useBusinessInfo() {
  const [businessInfo, setBusinessInfo] = useState<BusinessContactInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const data = await DataService.fetchBusinessInfo();
      setBusinessInfo(data);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to load business info');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { businessInfo, loading, error, refresh };
}

export function useSiteMedia() {
  const [media, setMedia] = useState<SiteMedia | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const data = await DataService.fetchSiteMedia();
      setMedia(data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { media, loading, refresh };
}
