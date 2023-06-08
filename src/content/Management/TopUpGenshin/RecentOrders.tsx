import { useAuth } from '@/contexts/AuthGuard';
import { Card } from '@mui/material';
import { getDeposit } from 'api/apiDeposit/account';
import { IGetDeposit } from 'model/deposit';
import { useEffect, useState } from 'react';
import RecentOrdersTable from './RecentOrdersTable';
import { TYPE_DEPOSIT } from '@/models/enum';

function RecentOrders() {
  const [data, setData] = useState<IGetDeposit[]>([]);
  const { update } = useAuth();
  const [type, setType] = useState<TYPE_DEPOSIT>(TYPE_DEPOSIT.NAP_GAME);
  const [loading, setLoading] = useState<boolean>(false);
  const changeType = () => {
    type === TYPE_DEPOSIT.CAY_THUE
      ? setType(TYPE_DEPOSIT.NAP_GAME)
      : setType(TYPE_DEPOSIT.CAY_THUE);
  };
  useEffect(() => {
    const callApi = async () => {
      setLoading(true);
      await getDeposit(type).then((res) => {
        const data = res.data.data;
        let temp: IGetDeposit[] = [];
        data.map((d) => {
          temp.push({
            id: d.transaction.id,
            pack: d.pack_list.description,
            uuid: d.uuid,
            username: d.username,
            password: d.password,
            server: d.server,
            name: d.name,
            phone: d.phone,
            note: d.note,
            status: d.transaction.status,
            created_at: d.transaction.created_at,
            transaction: d.transaction
          });
        });
        setLoading(false);

        setData(temp);
      });
    };
    callApi();
  }, [update, type]);

  return (
    <Card sx={{ mb: 5 }}>
      <RecentOrdersTable
        cryptoOrders={data}
        changeType={changeType}
        type={type}
        loading={loading}
      />
    </Card>
  );
}

export default RecentOrders;
