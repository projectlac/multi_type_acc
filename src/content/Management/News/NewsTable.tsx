import {
  Box,
  Card,
  CardHeader,
  Divider,
  IconButton,
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
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import { ChangeEvent, FC, useCallback, useState } from 'react';
import _debounce from 'lodash/debounce';
import { INews } from 'model/news';
import Delete from './Action/Delete';
import EditTag from './Action/EditTag';

interface RecentOrdersTableProps {
  className?: string;
  cryptoOrders: INews[];
  total: number;
  handleSearch: (data: string) => void
  handleOffet: (data: number) => void
  handleLimit: (data: number) => void
}


const applyPagination = (
  cryptoOrders: INews[],
  page: number,
  limit: number
): INews[] => {
  return cryptoOrders.slice(page * limit, page * limit + limit);
};

const NewsTable: FC<RecentOrdersTableProps> = ({ cryptoOrders, total, handleSearch, handleOffet, handleLimit }) => {
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);
  const [search, setSearch] = useState<string>('');


  const handlePageChange = (_event: any, newPage: number): void => {
    setPage(newPage);
    handleOffet(limit * newPage)
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
    handleLimit(parseInt(event.target.value))
  };



  const paginatedCryptoOrders = applyPagination(cryptoOrders, page, limit);

  const theme = useTheme();


  function handleDebounceFn(inputValue: string) {

    handleSearch(inputValue)
  }

  const debounceFn = useCallback(_debounce(handleDebounceFn, 500), []);
  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    debounceFn(e.target.value);
    setSearch(e.target.value);
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
          label="Search bằng tên"
          value={search}
          onChange={handleChangeSearch}
        ></TextField>
      </Box>
      <CardHeader
        title="Danh sách"
      />

      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Tên</TableCell>
              <TableCell>Danh mục</TableCell>

              <TableCell align="right">Thời gian tạo</TableCell>
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
                      {cryptoOrder.title}
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
                      {cryptoOrder.tag}
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
                      {format(new Date(cryptoOrder.created_at), 'dd/MM/yyyy')}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {format(new Date(cryptoOrder.created_at), ' HH:mm:ss')}
                    </Typography>
                  </TableCell>

                  <TableCell align="right">
                    <Tooltip title="Edit Order" arrow>
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
                        {/* <EditTwoToneIcon fontSize="small" /> */}
                        <EditTag
                          title="Sửa tag"
                          slug={cryptoOrder.slug}

                        />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Order" arrow>
                      <IconButton
                        sx={{
                          '&:hover': { background: theme.colors.error.lighter },
                          color: theme.palette.error.main
                        }}
                        color="inherit"
                        size="small"
                      >
                        <Delete
                          title="Xóa tag"
                          slug={cryptoOrder.slug}

                        />
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

NewsTable.propTypes = {
  cryptoOrders: PropTypes.array.isRequired
};

NewsTable.defaultProps = {
  cryptoOrders: []
};

export default NewsTable;
