



'use server';
import { categoryPath } from '@/config/api-urls';
import axiosInstance from '@/config/axiosInstance';

export async function createCategoryAction(payload: any) {
  try {
    const res = await axiosInstance.post(`${categoryPath}`, payload);
    return { data: res.data, status: res.status };
  } catch (error: any) {
    throw error;
  }
}


