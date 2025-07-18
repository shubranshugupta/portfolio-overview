import React, { useState } from 'react';
import {
    DataGrid,
    GridColDef,
    GridRenderCellParams,
    GridPaginationModel,
    GetApplyQuickFilterFn
} from '@mui/x-data-grid';
import {
    Paper,
    Typography,
    Box,
    Stack,
} from '@mui/material';
import { InsertChartRounded } from '@mui/icons-material';
import type { EnrichedHolding } from '../../data/mockData';
import HoldingToolbar from './HoldingToolbar';
import { useQuickSearch } from '../context/QuickSearchContext';

const columns: GridColDef<EnrichedHolding>[] = [
    {
        field: 'id',
        width: 90,
        type: 'number',
        headerName: 'Id',
        renderHeader: () => (
            <strong>{'Id'}</strong>
        )
    },
    {
        field: 'asset',
        width: 200,
        headerName: 'Asset',
        renderHeader: () => (
            <strong>{'Asset'}</strong>
        )
    },
    {
        field: 'quantity',
        width: 200,
        type: 'number',
        headerName: 'Quantity',
        renderHeader: () => (
            <strong>{'Quantity'}</strong>
        )
    },
    {
        field: 'avgBuyPrice',
        width: 200,
        type: 'number',
        headerName: 'Avg Buy Price',
        renderHeader: () => (
            <strong>{'Avg Buy Price (₹)'}</strong>
        )
    },
    {
        field: 'currentPrice',
        width: 200,
        type: 'number',
        headerName: 'Current Price',
        renderHeader: () => (
            <strong>{'Current Price (₹)'}</strong>
        )
    },
    {
        field: 'stockValue',
        width: 200,
        type: 'number',
        headerName: 'Current Value',
        renderHeader: () => (
            <strong>{'Current Value (₹)'}</strong>
        )
    },
    {
        field: 'pnl',
        width: 200,
        headerName: 'PnL',
        renderCell: (params: GridRenderCellParams<EnrichedHolding, number>) => (
            <span style={{ color: params.value ? params.value >= 0 ? 'green' : 'red' : 'green' }}>
                {params.value ? `${params.value.toFixed(2)}` : 0}
            </span>
        ),
        type: 'number',
        renderHeader: () => (
            <strong>{'PnL (₹)'}</strong>
        )
    },
];

interface PortfolioHoldingProps {
    holdings: EnrichedHolding[];
}

const PortfolioHoldingsTable: React.FC<PortfolioHoldingProps> = ({
    holdings
}) => {
    const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
        pageSize: 5,
        page: 0,
    });

    const { searchValue } = useQuickSearch();
    const filteredRows = holdings.filter(row =>
        row.asset.toLowerCase().startsWith(searchValue.toLowerCase())
    );

    return (
        <Paper elevation={3}
            sx={{ padding: 2, marginBottom: 3 }}
            square={false} >
            <Stack direction="row" spacing={2} sx={{ justifyContent: 'center', alignItems: 'center' }}>
                <InsertChartRounded color="primary" sx={{ fontSize: 40 }} />
                <Typography variant="h5" gutterBottom>
                    Portfolio Holdings
                </Typography>
            </Stack>
            <Box sx={{ paddingY: 2 }}>
                <DataGrid
                    rows={filteredRows}
                    columns={columns}
                    paginationModel={paginationModel}
                    onPaginationModelChange={setPaginationModel}
                    pageSizeOptions={[5, 10, 25, 50]}
                    showToolbar
                    sx={{ height: 425 }}
                    slots={{ toolbar: HoldingToolbar }}
                />
            </Box>
        </Paper>
    );
};

export default PortfolioHoldingsTable;
