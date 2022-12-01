import { CommonRes } from '..';
import { request } from '@src/request/index';

export interface InsertCollectType {
  collect_id: string;
  account: string;
  content: string;
  origin: string;
  type: string;
}

export const apiInsertCollect = async (
  data: InsertCollectType
): Promise<CommonRes> =>
  await request.post<CommonRes>(`/ttalk/insertCollect`, data, {
    timeout: 15000
  });

export const apiUpdateCollect = async (data: {
  account: string;
  collect_id: string;
}): Promise<CommonRes> =>
  await request.post<CommonRes>(`/ttalk/updateCollect`, data, {
    timeout: 15000
  });

export const apiDeleteCollect = async (data: {
  account: string;
  collect_id: string;
  content: string;
}): Promise<CommonRes> =>
  await request.post<CommonRes>(`/ttalk/deleteCollect`, data, {
    timeout: 15000
  });
