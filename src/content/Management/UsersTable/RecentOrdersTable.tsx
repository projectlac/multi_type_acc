import Label from '@/components/Label';
import formatMoney from '@/utility/formatMoney';
import {
  Box,
  Card,
  CardHeader,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Tooltip,
  Typography,
  useTheme
} from '@mui/material';
import { IRole, IUser } from 'model/user';
import PropTypes from 'prop-types';
import {
  ChangeEvent,
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useState
} from 'react';
import ChangeCoin from './Action/ChangeCoin';
import EditTag from './Action/EditTag';
import _debounce from 'lodash/debounce';

interface RecentOrdersTableProps {
  className?: string;
  cryptoOrders: IUser[];
  setPage: Dispatch<SetStateAction<number>>;
  setLimit: Dispatch<SetStateAction<number>>;
  setSearch: Dispatch<SetStateAction<string>>;
  total: number;
}

interface Filters {
  role?: 'ADMIN' | 'MOD' | 'USER';
}

const getStatusLabel = (cryptoOrderStatus: IRole): JSX.Element => {
  const map = {
    ADMIN: {
      text: 'Admin',
      color: 'error'
    },
    ADMIN_PRODUCT: {
      text: 'Admin Product',
      color: 'error'
    },
    USER: {
      text: 'User',
      color: 'success'
    },
    MOD: {
      text: 'CTV',
      color: 'warning'
    }
  };

  const { text, color }: any = map[cryptoOrderStatus];

  return <Label color={color}>{text}</Label>;
};

const applyFilters = (cryptoOrders: IUser[], filters: Filters): IUser[] => {
  return cryptoOrders.filter((cryptoOrder) => {
    let matches = true;

    if (filters.role && cryptoOrder.role !== filters.role) {
      matches = false;
    }

    return matches;
  });
};

const applyPagination = (
  cryptoOrders: IUser[],
  page: number,
  limit: number
): IUser[] => {
  return cryptoOrders.slice(page * limit, page * limit + limit);
};

const RecentOrdersTable: FC<RecentOrdersTableProps> = ({
  cryptoOrders,
  setPage: setOffsetApi,
  setLimit: setLimitApi,
  setSearch: setSearchApi,
  total
}) => {
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);
  const [filters, setFilters] = useState<Filters>({
    role: null
  });

  const [search, setSearch] = useState<string>('');
  const handleStatusChange = (e: ChangeEvent<HTMLInputElement>): void => {
    let value = null;

    if (e.target.value !== 'all') {
      value = e.target.value;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      role: value
    }));
  };

  const handlePageChange = (_event: any, newPage: number): void => {
    setPage(newPage);
    setOffsetApi(newPage * limit);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
    setLimitApi(parseInt(event.target.value));
  };

  const paginatedCryptoOrders = applyPagination(cryptoOrders, page, limit);

  const theme = useTheme();

  function handleDebounceFn(inputValue: string) {
    setSearchApi(inputValue);
  }

  const debounceFn = useCallback(_debounce(handleDebounceFn, 500), []);

  const handleChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    debounceFn(e.target.value);
  };

  return (
    <Card>
      <Box
        sx={{
          padding: '10px 15px 0px'
        }}
      >
        <TextField
          variant="outlined"
          fullWidth
          label="Search by code"
          value={search}
          onChange={handleChangeSearch}
        ></TextField>
      </Box>
      <CardHeader
        action={
          <Box width={150}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Status</InputLabel>
              <Select
                value={filters.role || 'all'}
                onChange={handleStatusChange}
                label="Status"
                autoWidth
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="ADMIN">ADMIN</MenuItem>
                <MenuItem value="MOD">CTV</MenuItem>
                <MenuItem value="USER">USER</MenuItem>
              </Select>
            </FormControl>
          </Box>
        }
        title="Recent Orders"
      />

      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Account ID</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>

              <TableCell align="right">Web Coin</TableCell>
              <TableCell align="right">Role</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedCryptoOrders.map((cryptoOrder) => {
              return (
                <TableRow hover key={cryptoOrder.id}>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {cryptoOrder.id}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {cryptoOrder.username}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {cryptoOrder.email}
                    </Typography>
                  </TableCell>

                  <TableCell align="right">
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {formatMoney(cryptoOrder.money)}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    {getStatusLabel(cryptoOrder.role)}
                  </TableCell>
                  <TableCell align="right">
                    {cryptoOrder.role !== 'ADMIN' && (
                      <Tooltip title="Đổi role" arrow>
                        <IconButton
                          sx={{
                            '&:hover': {
                              background: theme.colors.primary.lighter
                            },
                            color: theme.palette.primary.main
                          }}
                          color="inherit"
                          size="small"
                        >
                          <EditTag
                            title="Sửa role"
                            role={cryptoOrder.role}
                            id={cryptoOrder.id}
                            type={cryptoOrder.account_type}
                            bonus={cryptoOrder.bonus}
                          />
                        </IconButton>
                      </Tooltip>
                    )}

                    <Tooltip title="Sửa tiền" arrow>
                      <IconButton
                        sx={{
                          '&:hover': { background: theme.colors.error.lighter },
                          color: theme.palette.error.main
                        }}
                        color="inherit"
                        size="small"
                      >
                        <ChangeCoin title="Sửa tiền" id={cryptoOrder.id} />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box p={2}>
        <TablePagination
          component="div"
          count={total}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25, 30]}
        />
      </Box>
    </Card>
  );
};

RecentOrdersTable.propTypes = {
  cryptoOrders: PropTypes.array.isRequired
};

RecentOrdersTable.defaultProps = {
  cryptoOrders: []
};

export default RecentOrdersTable;
