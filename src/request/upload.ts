import axios, { AxiosResponse } from 'axios';
import { baseURL } from './url';

export async function upload(
  url: string,
  formData: FormData
): Promise<AxiosResponse<any, any>> {
  const axiosIns = await axios({
    url: `${baseURL}${url}`,
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data: formData
  });

  return axiosIns;
}
