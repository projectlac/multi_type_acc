import { useAuth } from '@/contexts/AuthGuard';
import { Card } from '@mui/material';
import { getHero, getWeapon } from 'api/apiTag/tagApi';
import { ITag } from 'model/tag';
import { useEffect, useState } from 'react';
import RecentOrdersTable from './RecentOrdersTable';
import { IHistoryCheckResponse, IHistoryCheckType } from 'model/user';
import { getHistoryByAdmin2 } from 'api/user';

function HistoryTable() {
  const [data, setData] = useState<IHistoryCheckResponse[]>([]);
  const [limit, setLimit] = useState<number>(10);
  const [offset, setOffset] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);

  const [type, setType] = useState<IHistoryCheckType>(
    IHistoryCheckType.DELETE_ACCOUNT
  );
  const [keyWord, setKeyWord] = useState<string>('');

  const { update } = useAuth();

  const changeLimit = (limit: number) => {
    setLimit(limit);
  };
  const changeOffset = (offset: number) => {
    setOffset(offset);
  };
  const changeType = (type: IHistoryCheckType) => {
    setType(type);
  };
  const changeKeyWord = (keyWord: string) => {
    setKeyWord(keyWord);
  };

  useEffect(() => {
    const callApi = async () => {
      const res = await getHistoryByAdmin2({
        limit,
        offset,
        type,
        keyword: keyWord
      });
      setData(res.data.data || []);
      setTotal(res.data.total || 0);
    };
    callApi();
  }, [update, limit, offset, type, keyWord]);
  return (
    <Card sx={{ mb: 5 }}>
      <RecentOrdersTable
        cryptoOrders={data}
        total={total}
        changeKeyWord={changeKeyWord}
        changeType={changeType}
        changeOffset={changeOffset}
        changeLimit={changeLimit}
        type={type}
      />
    </Card>
  );
}

export default HistoryTable;
