import axios from 'axios';
import { Project } from '@/types/project';

const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_ROUTE}`,
});

export async function fetchProjects(): Promise<Project[]> {
  const response = await api.get<Project[]>('/projects');
  return response.data;
}

export async function fetchFeaturedProjects(): Promise<Project[]> {
  const response = await api.get<Project[]>('/projects/featured');
  return response.data;
}

export async function fetchProjectById(id: number): Promise<Project> {
  const response = await api.get<Project>(`/projects/${id}`);
  return response.data;
}
