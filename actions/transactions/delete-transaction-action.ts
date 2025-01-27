


'use server';
import { transactionPath } from '@/config/api-urls';
import axiosInstance from '@/config/axiosInstance';

export async function deleteTransactionAction(categoryId: any) {
  try {
    const res = await axiosInstance.delete(`${transactionPath}/${categoryId}/delete`,);
    return { data: res.data, status: res.status };
  } catch (error: any) {
    throw error;
  }
}


