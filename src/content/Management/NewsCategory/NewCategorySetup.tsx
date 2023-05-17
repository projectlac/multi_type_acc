import { useAuth } from '@/contexts/AuthGuard';
import { Card } from '@mui/material';
import { getListNewsCategory } from 'api/apiNews/newsApi';
import { INewsCategoryRespon } from 'model/news';
import { useEffect, useState } from 'react';
import NewCategoryTable from './NewCategoryTable';

function NewCategorySetup() {
  const [data, setData] = useState<INewsCategoryRespon>(null);
  const { update } = useAuth();
  useEffect(() => {
    const callApi = async () => {

      await getListNewsCategory().then((res) => {
        setData({ data: res.data, total: res.data.length });
      });


    };
    callApi();
  }, [update]);
  return (
    <Card sx={{ mb: 5 }}>
      <NewCategoryTable cryptoOrders={data?.data} />
    </Card>
  );
}

export default NewCategorySetup;
