import { useAuth } from '@/contexts/AuthGuard';
import { Card } from '@mui/material';
import { spinWheelHistory } from 'api/apiWheel/wheelApi';
import { ISpinHistory } from 'model/deposit';
import { useEffect, useState } from 'react';
import RecentOrdersTableLuckySpin from './RecentOrdersTableLuckySpin';

function RecentOrders() {
  const [data, setData] = useState<ISpinHistory[]>([]);
  const { update } = useAuth();

  useEffect(() => {
    const callApi = async () => {
      await spinWheelHistory().then((res) => {
        const data = res.data.data;

        let temp: ISpinHistory[] = [];

        data.map((d) => {
          temp.push({
            id: d.id,
            user: d.user,
            wheel: d.wheel,
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
      <RecentOrdersTableLuckySpin cryptoOrders={data} />
    </Card>
  );
}

export default RecentOrders;
