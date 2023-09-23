/* eslint-disable react-hooks/exhaustive-deps */
import { useAuth } from '@/contexts/AuthGuard';
import { Box, Typography } from '@mui/material';
import { getNotification } from 'api/apiUser/userApi';
import { formatDistance } from 'date-fns';
import { vi } from 'date-fns/locale';
import { useCallback, useEffect, useState } from 'react';
import InfiniteCustom from './InfiniteCustom';

interface IProp {
  isOpen: boolean;
}
function InfiniteNotification({ isOpen }: IProp) {
  const {
    user: { id }
  } = useAuth();
  const [items, setItems] = useState([]);
  const [offset, setOffset] = useState<number>(0);
  const [totalRows, setTotalRows] = useState(0);
  const [firstFetch, setFirstFetch] = useState<boolean>(false);

  async function fetchIssues(offset) {
    let id = localStorage.getItem('numberOfFate');
    const links = await getNotification(9, offset);

    const issues = links.data.data;
    setTotalRows(links.data.total);
    const getNewsetId = localStorage.getItem(`lastestNotify-${id}`);
    !firstFetch &&
      !Boolean(getNewsetId) &&
      localStorage.setItem(`lastestNotify-${id}`, issues[0].id);
    setFirstFetch(true);

    return {
      issues
    };
  }

  const indexOfnewestNotify = () => {
    let id = localStorage.getItem('numberOfFate');
    const getNewsetId = localStorage.getItem(`lastestNotify-${id}`);
    const indexNewsestID = items.indexOf(
      items.filter((d) => d.id === +getNewsetId)[0]
    );
    localStorage.setItem('indexNewsestID', indexNewsestID.toString());
    return indexNewsestID;
  };

  useEffect(() => {
    if (firstFetch && !isOpen) {
      localStorage.setItem(`lastestNotify-${id && id}`, items[0].id);
      localStorage.setItem(`indexNewsestID-${id && id}`, '0');
    }
  }, [firstFetch, isOpen]);

  const fetchItems = useCallback(
    async (offset) => {
      try {
        const { issues } = await fetchIssues(offset);

        setItems([...items, ...issues]);
      } finally {
      }
    },
    [items]
  );

  useEffect(() => {
    fetchItems(offset);
  }, [offset]);

  const loader = (
    <div key="loader" className="loader">
      <Box>
        <Box sx={{ p: 2, minWidth: 350, display: { xs: 'block', sm: 'flex' } }}>
          <Box flex="1">
            <Typography component="span" variant="body2" color="text.secondary">
              Loading
            </Typography>
          </Box>
        </Box>
      </Box>
    </div>
  );

  return (
    <Box height={'500px'}>
      <InfiniteCustom
        loader={loader}
        fetchMore={() => setOffset((prev) => prev + 9)}
        hasMore={items.length < totalRows}
        endMessage={<p>You have seen it all</p>}
      >
        <Box>
          {items.map((item, i) => (
            <Box
              key={i}
              sx={{
                p: 2,
                width: 450,
                display: {
                  xs: 'block',
                  sm: 'flex',
                  background: `${
                    indexOfnewestNotify() > i ? '#a3fbff73' : '#fff'
                  }`,
                  borderBottom: '1px solid #9adbd8'
                }
              }}
            >
              <Box flex="1">
                <Box display="flex" justifyContent="space-between">
                  <Typography sx={{ fontWeight: 'bold' }}>
                    {item.type}
                  </Typography>
                  <Typography variant="caption" sx={{ textTransform: 'none' }}>
                    {formatDistance(new Date(item.created_at), new Date(), {
                      addSuffix: true,
                      locale: vi
                    })}
                  </Typography>
                </Box>
                <Typography
                  component="span"
                  variant="body2"
                  color="text.secondary"
                >
                  <b>{item.user.username}</b> {item.history_message}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </InfiniteCustom>
    </Box>
  );
}

export default InfiniteNotification;
