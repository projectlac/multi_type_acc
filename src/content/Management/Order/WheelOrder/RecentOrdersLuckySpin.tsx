import { useAuth } from '@/contexts/AuthGuard';
import { Card } from '@mui/material';
import { getOrderGift } from 'api/apiWheel/wheelApi';
import { IOrderGift } from 'model/gift';
import { useEffect, useState } from 'react';
import RecentOrdersTableLuckySpin from './RecentOrdersTableLuckySpin';

function RecentOrders() {
  const [data, setData] = useState<IOrderGift[]>([]);
  const { update } = useAuth();

  useEffect(() => {
    const callApi = async () => {
      await getOrderGift().then((res) => {
        const data = res.data.data;
        let temp: IOrderGift[] = [];

        data.map((d) => {
          temp.push({
            id: d.id,
            receiver: d.receiver,
            delivery_address: d.delivery_address,
            description: d.description,
            details: d.details,
            phone: d.phone,
            status: d.status,
            total: d.total,
            created_at: d.created_at,
            user: d.user
          });
        });
        setData(temp);
      });
    };
    callApi();
  }, [update]);

  return (
    <Card sx={{ mb: 5 }}>
      <RecentOrdersTableLuckySpin cryptoOrders={data} />
    </Card>
  );
}

export default RecentOrders;
