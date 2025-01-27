

'use server';
import { categoryPath } from '@/config/api-urls';
import axiosInstance from '@/config/axiosInstance';

export async function deleteCategoryAction(categoryId: any) {
  try {
    const res = await axiosInstance.delete(`${categoryPath}/${categoryId}/delete`,);
    return { data: res.data, status: res.status };
  } catch (error: any) {
    throw error;
  }
}


