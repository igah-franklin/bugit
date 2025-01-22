



'use server';
import { categoryPath } from '@/config/api-urls';
import axiosInstance from '@/config/axiosInstance';

export async function fetchCategoryAction() {
  console.log(categoryPath, 'cate path')
  try {
    const res = await axiosInstance.get(`${categoryPath}`);
    return { data: res.data, status: res.status };
  } catch (error: any) {
    throw error;
  }
}


