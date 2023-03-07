import { useAuth } from '@/contexts/AuthGuard';
import { Card } from '@mui/material';
import { get500PaymentHistory } from 'api/apiUser/userApi';
import { IHistoryData } from 'model/tag';
import { useEffect, useState } from 'react';
import RecentOrdersTable from './RecentOrdersTable';

function RecentOrdersTag() {
  const [data, setData] = useState<IHistoryData[]>([]);
  const { update } = useAuth();
  useEffect(() => {
    const callApi = async () => {
      await get500PaymentHistory(500).then((res) => setData(res.data.data));
    };
    callApi();
  }, [update]);
  return (
    <Card sx={{ mb: 5 }}>
      <RecentOrdersTable cryptoOrders={data} />
    </Card>
  );
}

export default RecentOrdersTag;
