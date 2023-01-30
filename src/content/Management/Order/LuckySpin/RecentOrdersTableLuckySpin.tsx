import {
  Box,
  Card,
  CardHeader,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';
import { format } from 'date-fns';
import { ISpinHistory } from 'model/deposit';
import PropTypes from 'prop-types';
import { ChangeEvent, FC, useState } from 'react';

interface RecentOrdersTableProps {
  className?: string;
  cryptoOrders: ISpinHistory[];
}

const applyPagination = (
  cryptoOrders: ISpinHistory[],
  page: number,
  limit: number
): ISpinHistory[] => {
  return cryptoOrders.slice(page * limit, page * limit + limit);
};

const RecentOrdersTableLuckySpin: FC<RecentOrdersTableProps> = ({
  cryptoOrders
}) => {
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);

  const handlePageChange = (_event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const paginatedCryptoOrders = applyPagination(cryptoOrders, page, limit);

  return (
    <Card>
      <CardHeader title="Recent Orders" />

      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell width={'5%'}>#</TableCell>

              <TableCell width={'30%'}>Người quay</TableCell>
              <TableCell>Thông tin</TableCell>

              <TableCell align="right">Ngày quay</TableCell>
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
                      {cryptoOrder.user.username}
                    </Typography>
                    <Typography
                      variant="body1"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {cryptoOrder.user.email}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {cryptoOrder.wheel.name}
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
                    <Typography>
                      {format(new Date(cryptoOrder.created_at), 'hh:mm:ss')}
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
          count={paginatedCryptoOrders.length}
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

RecentOrdersTableLuckySpin.propTypes = {
  cryptoOrders: PropTypes.array.isRequired
};

RecentOrdersTableLuckySpin.defaultProps = {
  cryptoOrders: []
};

export default RecentOrdersTableLuckySpin;
