





'use server';
import { financialSummaryPath } from '@/config/api-urls';
import axiosInstance from '@/config/axiosInstance';

export async function fetchFinancialSummaryAction() {

  try {
    const res = await axiosInstance.get(`${financialSummaryPath}`);
    return { data: res.data, status: res.status };
  } catch (error: any) {
    throw error;
  }
}


