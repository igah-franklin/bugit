




'use server';
import { categoryPath } from '@/config/api-urls';
import axiosInstance from '@/config/axiosInstance';

export async function editCategoryAction(categoryId: string, payload: any) {
    console.log(payload, 'payload')
  try {
    const res = await axiosInstance.put(`${categoryPath}/${categoryId}/update`, payload);
    return { data: res.data, status: res.status };
  } catch (error: any) {
    throw error;
  }
}


