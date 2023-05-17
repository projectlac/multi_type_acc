import { useAuth } from '@/contexts/AuthGuard';
import { Card } from '@mui/material';
import { getNews } from 'api/apiNews/newsApi';
import { INewsRespon } from 'model/news';
import { useEffect, useState } from 'react';
import RecentOrdersTable from './NewsTable';

function NewsTableSetup() {
  const [data, setData] = useState<INewsRespon>(null);
  const [limit, setLimit] = useState<number>(0);
  const [offset, setOffset] = useState<number>(0);
  const [search, setSearch] = useState<string>('');

  const { update } = useAuth();
  useEffect(() => {
    const callApi = async () => {
      const res = await getNews(limit, offset, search)
      setData({ data: res.data.data, total: res.data.total });
    };
    callApi();
  }, [update, limit, offset, search]);

  const handleLimit = (data: number) => {
    setLimit(data)
  }
  const handleOffet = (data: number) => {
    setOffset(data)
  }
  const handleSearch = (data: string) => {
    setSearch(data)
  }
  return (
    <Card sx={{ mb: 5 }}>
      <RecentOrdersTable cryptoOrders={data?.data} total={data?.total} handleLimit={handleLimit} handleOffet={handleOffet} handleSearch={handleSearch} />
    </Card>
  );
}

export default NewsTableSetup;
