import { useAuth } from '@/contexts/AuthGuard';
import { Card } from '@mui/material';
import { getListGiftById } from 'api/apiWheel/wheelApi';
import { useEffect, useState } from 'react';
import RecentOrdersTable from './RecentOrdersTable';

function RecentOrders() {
  const { update } = useAuth();

  const [data, setData] = useState<any>([]);
  useEffect(() => {
    getListGiftById().then((res) => setData(res.data));
  }, [update]);

  return (
    <Card sx={{ mb: 5 }}>
      <RecentOrdersTable cryptoOrders={data} />
    </Card>
  );
}

export default RecentOrders;
