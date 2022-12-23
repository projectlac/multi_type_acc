import { useAuth } from '@/contexts/AuthGuard';
import { Card } from '@mui/material';
import { getOrder } from 'api/product/productApi';
import { IGetDeposit, IOrder } from 'model/deposit';
import { useEffect, useState } from 'react';
import RecentOrdersTable from './RecentOrdersTable';

function RecentOrders() {
  const [data, setData] = useState<IOrder[]>([]);
  const { update } = useAuth();

  useEffect(() => {
    const callApi = async () => {
      await getOrder().then((res) => {
        const data = res.data;

        let temp: IOrder[] = [];

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
            created_at: d.created_at
          });
        });
        setData(temp);
      });
    };
    callApi();
  }, [update]);

  return (
    <Card sx={{ mb: 5 }}>
      <RecentOrdersTable cryptoOrders={data} />
    </Card>
  );
}

export default RecentOrders;
