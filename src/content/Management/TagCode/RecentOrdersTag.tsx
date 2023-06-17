import { useAuth } from '@/contexts/AuthGuard';
import { Card } from '@mui/material';
import { getListTagCode } from 'api/apiTag/tagApi';
import { ITag } from 'model/tag';
import { useEffect, useState } from 'react';
import RecentOrdersTable from './RecentOrdersTable';

function RecentOrdersTag() {
  const [data, setData] = useState<ITag>(null);
  const { update } = useAuth();
  useEffect(() => {
    const callApi = async () => {
      const res = await getListTagCode();
      setData({ data: res.data.data, total: res.data.total });
    };
    callApi();
  }, [update]);
  return (
    <Card sx={{ mb: 5 }}>
      <RecentOrdersTable cryptoOrders={data?.data} />
    </Card>
  );
}

export default RecentOrdersTag;
