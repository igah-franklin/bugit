




// 'use server';
// import { transactionPath } from '@/config/api-urls';
// import axiosInstance from '@/config/axiosInstance';



// export async function fetchTransactionsAction(year: string, month: string) {
 
//   try {
//     const res = await axiosInstance.get(`${transactionPath}?year=${year}&month=${month}`);
//     return { data: res.data, status: res.status };
//   } catch (error: any) {
//     throw error;
//   }
// }

'use server';
import { transactionPath } from '@/config/api-urls';
import axiosInstance from '@/config/axiosInstance';

interface ITransactionQueryProps {
  year?: string; 
  month?: string; 
}

export async function fetchTransactionsAction({
  year,
  month,
}: ITransactionQueryProps) {
  try {
    // Construct query parameters conditionally
    const queryParams = new URLSearchParams();
    if (year) queryParams.append('year', year);
    if (month) queryParams.append('month', month);

    //const res = await axiosInstance.get(`${transactionPath}?year=${year}&month=${month}`);
    const res = await axiosInstance.get(`${transactionPath}?${queryParams.toString()}`);
    return { data: res.data, status: res.status };
  } catch (error: any) {
    console.error('Error fetching transactions:', error.message);
    throw new Error('Failed to fetch transactions. Please try again later.');
  }
}

