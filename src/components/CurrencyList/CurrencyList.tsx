import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { SelectChangeEvent } from '@mui/material/Select';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  CircularProgress,
  Alert,
} from '@mui/material';
import { 
  Refresh as RefreshIcon,
  Sort as SortIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
} from '@mui/icons-material';
import type { RootState } from '../../store/types';
import { setPage, setPageSize, setTotalItems } from '../../store/slices/pagination';
import { setSort, resetSort } from '../../store/slices/sort';
import { currencyApi } from '../../services/api';
import type { Currency } from '../../types';

const CurrencyList: React.FC = () => {
  const dispatch = useDispatch();
  const { page, pageSize, totalItems } = useSelector(
    (state: RootState) => state.pagination
  );
  const { direction } = useSelector((state: RootState) => state.sort);
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCurrencies = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const rates = await currencyApi.getRates();
      const currencyList = currencyApi.convertRates(rates);
      setCurrencies(currencyList);
      dispatch(setTotalItems(currencyList.length));
    } catch {
      setError('Ошибка при загрузке курсов валют');
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchCurrencies();
    const interval = setInterval(fetchCurrencies, 30000);
    return () => clearInterval(interval);
  }, [fetchCurrencies]);

  const handleChangePage = (_: unknown, newPage: number) => {
    dispatch(setPage(newPage + 1));
  };

  const handleSelectChange = (event: SelectChangeEvent<number>) => {
    dispatch(setPageSize(Number(event.target.value)));
  };

  const handleTablePaginationChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    dispatch(setPageSize(Number(event.target.value)));
  };

  const handleSortChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value;
    switch (value) {
      case 'asc':
        dispatch(setSort('asc'));
        break;
      case 'desc':
        dispatch(setSort('desc'));
        break;
      default:
        dispatch(resetSort());
    }
  };

  const sortedCurrencies = [...currencies].sort((a, b) => {
    if (direction === null) return 0;
    const rateA = parseFloat(a.rate);
    const rateB = parseFloat(b.rate);
    return direction === 'asc' ? rateA - rateB : rateB - rateA;
  });

  const paginatedCurrencies = sortedCurrencies.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  if (loading && currencies.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Box display="flex" gap={2} alignItems="center">
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel>Размер страницы</InputLabel>
            <Select
              value={pageSize}
              label="Размер страницы"
              onChange={handleSelectChange}
            >
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={25}>25</MenuItem>
              <MenuItem value={50}>50</MenuItem>
              <MenuItem value={100}>100</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: 180 }}>
            <InputLabel>Сортировка</InputLabel>
            <Select
              value={direction || 'none'}
              label="Сортировка"
              onChange={handleSortChange}
            >
              <MenuItem value="none">
                <Box display="flex" alignItems="center" gap={1}>
                  <SortIcon fontSize="small" />
                  <Typography>Без сортировки</Typography>
                </Box>
              </MenuItem>
              <MenuItem value="asc">
                <Box display="flex" alignItems="center" gap={1}>
                  <ArrowUpwardIcon fontSize="small" />
                  <Typography>По возрастанию</Typography>
                </Box>
              </MenuItem>
              <MenuItem value="desc">
                <Box display="flex" alignItems="center" gap={1}>
                  <ArrowDownwardIcon fontSize="small" />
                  <Typography>По убыванию</Typography>
                </Box>
              </MenuItem>
            </Select>
          </FormControl>
        </Box>
        <IconButton onClick={fetchCurrencies} disabled={loading}>
          <RefreshIcon />
        </IconButton>
      </Box>

      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: '40%' }}>Валюта</TableCell>
                <TableCell 
                  sx={{ width: '60%' }}
                  align="right"
                >
                  <Box display="flex" alignItems="center" justifyContent="flex-end" gap={1}>
                    <Typography>Курс</Typography>
                    {direction !== null && (
                      <Typography variant="caption" color="text.secondary">
                        ({direction === 'asc' ? 'По возрастанию' : 'По убыванию'})
                      </Typography>
                    )}
                  </Box>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedCurrencies.map((currency) => (
                <TableRow key={currency.currency}>
                  <TableCell>{currency.currency}</TableCell>
                  <TableCell align="right">
                    {parseFloat(currency.rate).toFixed(18)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <TablePagination
        component="div"
        count={totalItems}
        page={page - 1}
        onPageChange={handleChangePage}
        rowsPerPage={pageSize}
        onRowsPerPageChange={handleTablePaginationChange}
        rowsPerPageOptions={[10, 25, 50, 100]}
        labelRowsPerPage="Строк на странице:"
        labelDisplayedRows={({ from, to, count }) => `${from}-${to} из ${count}`}
      />
    </Box>
  );
};

export default CurrencyList; 