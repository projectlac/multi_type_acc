import {
  Box,
  Card,
  CardHeader,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography
} from '@mui/material';
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import { ChangeEvent, FC, useCallback, useState } from 'react';
import _debounce from 'lodash/debounce';
import { IHistoryCheckResponse, IHistoryCheckType } from 'model/user';

interface RecentOrdersTableProps {
  className?: string;
  cryptoOrders: IHistoryCheckResponse[];
  total: number;
  changeKeyWord: (data: string) => void;
  changeType: (data: string) => void;
  changeOffset: (data: number) => void;
  changeLimit: (data: number) => void;
  type: IHistoryCheckType;
}

const RecentOrdersTable: FC<RecentOrdersTableProps> = ({
  cryptoOrders,
  total,
  changeKeyWord,
  changeType,
  changeOffset,
  changeLimit,
  type
}) => {
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);

  const [search, setSearch] = useState<string>('');

  const handlePageChange = (_event: any, newPage: number): void => {
    setPage(newPage);
    changeOffset(newPage * limit);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
    changeLimit(parseInt(event.target.value));
  };

  function handleDebounceFn(inputValue: string) {
    changeKeyWord(inputValue);
  }

  const debounceFn = useCallback(_debounce(handleDebounceFn, 500), []);

  const handleChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    debounceFn(e.target.value);
  };

  const handleTypeChange = (e: SelectChangeEvent<IHistoryCheckType>) => {
    changeType(e.target.value);
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
          label="Search tên hoặc message"
          value={search}
          onChange={handleChangeSearch}
        ></TextField>
      </Box>
      <CardHeader
        action={
          <Box width={150}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Phân loại lịch sử</InputLabel>
              <Select
                value={type}
                onChange={handleTypeChange}
                label="Phân loại lịch sử"
                autoWidth
              >
                <MenuItem value={IHistoryCheckType.DELETE_ACCOUNT}>
                  Xóa tài khoản
                </MenuItem>
                <MenuItem value={IHistoryCheckType.AMOUNT_TRANSFERRED}>
                  Nạp tiền
                </MenuItem>
                <MenuItem value={IHistoryCheckType.BUY_ACCOUNT_BY_USER}>
                  Mua tài khoản
                </MenuItem>
                <MenuItem value={IHistoryCheckType.BONUS}>
                  Admin cộng/trừ tiền
                </MenuItem>
              </Select>
            </FormControl>
          </Box>
        }
        title="Danh sách"
      />

      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Người thực hiện</TableCell>
              <TableCell>Thông tin</TableCell>
              {type === IHistoryCheckType.DELETE_ACCOUNT && (
                <TableCell>Tin thêm</TableCell>
              )}
              <TableCell align="right">Thời gian tạo</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cryptoOrders.map((cryptoOrder) => {
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
                      {cryptoOrder.user.username}
                    </Typography>
                  </TableCell>

                  <TableCell>{cryptoOrder.history_message} </TableCell>

                  {type === IHistoryCheckType.DELETE_ACCOUNT && (
                    <TableCell>
                      <Typography variant="body2" color="text.primary" noWrap>
                        {` Tài khoản: ${
                          JSON.parse(cryptoOrder.information)?.username || ''
                        }`}{' '}
                        <br />
                        {` Mã tài khoản: ${
                          JSON.parse(cryptoOrder.information)?.id || ''
                        }`}
                      </Typography>
                    </TableCell>
                  )}

                  <TableCell align="right">
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {format(new Date(cryptoOrder.created_at), 'dd/MM/yyyy')}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {format(new Date(cryptoOrder.created_at), ' HH:mm:ss')}
                    </Typography>
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
