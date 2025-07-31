import React, { useState } from 'react';
import {
    DataGrid,
    GridColDef,
    GridRenderCellParams,
    GridPaginationModel,
    GridFilterModel
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
import { usePortfolio } from '../context/PortfolioContext';
import { useFilterModel } from '../context/FilterModelContext';

interface PortfolioHoldingProps {
    holdings: EnrichedHolding[];
}

const PortfolioHoldingsTable: React.FC<PortfolioHoldingProps> = ({
    holdings
}) => {
    const { setSelectedAsset, setSelectedSector } = usePortfolio();
    const { filterModel, setFilterModel } = useFilterModel();
    const handleOnclick = (asset: String) => {
        const selected = holdings.find(h => h.asset === asset);
        if (selected) {
            setSelectedAsset({
                id: selected.id,
                name: selected.asset,
                sector: selected.sector
            });
            setSelectedSector(selected.sector);
        }
    }

    const columns: GridColDef<EnrichedHolding>[] = [
        {
            field: 'id',
            minWidth: 80,
            flex: 0.5,
            type: 'number',
            headerName: 'Id',
            renderHeader: () => (
                <strong>{'Id'}</strong>
            ),
            getApplyQuickFilterFn: () => null
        },
        {
            field: 'asset',
            minWidth: 100,
            flex: 1.5,
            headerName: 'Asset',
            renderHeader: () => (
                <strong>{'Asset'}</strong>
            ),
            renderCell: (params: GridRenderCellParams<any, String>) => (
                <Box onClick={() => handleOnclick(params.value as String)}
                    onMouseOver={(e) => {
                        e.currentTarget.style.cursor = 'pointer';
                        e.currentTarget.style.color = '#2a75c0e1';
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.color = 'inherit';
                    }}
                >
                    {params.value}
                </Box>
            ),
            getApplyQuickFilterFn: (value: string) => {
                return (cellValue) => {
                    if (typeof cellValue === 'string')
                        return cellValue.toLowerCase().startsWith(value.toLowerCase());
                    return false;
                }
            }
        },
        {
            field: 'sector',
            minWidth: 100,
            flex: 1.5,
            type: 'singleSelect',
            valueOptions: [...new Set(holdings.map((item) => item.sector))],
            headerName: 'Sector',
            renderHeader: () => (
                <strong>{'Sector'}</strong>
            ),
            getApplyQuickFilterFn: () => null
        },
        {
            field: 'quantity',
            minWidth: 100,
            flex: 1,
            type: 'number',
            headerName: 'Quantity',
            renderHeader: () => (
                <strong>{'Quantity'}</strong>
            ),
            getApplyQuickFilterFn: () => null
        },
        {
            field: 'avgBuyPrice',
            minWidth: 150,
            flex: 1.5,
            type: 'number',
            headerName: 'Avg Buy Price',
            renderHeader: () => (
                <strong>{'Avg Buy Price (₹)'}</strong>
            ),
            getApplyQuickFilterFn: () => null
        },
        {
            field: 'currentPrice',
            minWidth: 150,
            flex: 1.5,
            type: 'number',
            headerName: 'Current Price',
            renderHeader: () => (
                <strong>{'Current Price (₹)'}</strong>
            ),
            getApplyQuickFilterFn: () => null
        },
        {
            field: 'stockValue',
            minWidth: 150,
            flex: 1.5,
            type: 'number',
            headerName: 'Current Value',
            renderHeader: () => (
                <strong>{'Current Value (₹)'}</strong>
            ),
            getApplyQuickFilterFn: () => null
        },
        {
            field: 'pnl',
            minWidth: 100,
            flex: 1,
            headerName: 'PnL',
            renderCell: (params: GridRenderCellParams<EnrichedHolding, number>) => (
                <span style={{ color: params.value ? params.value >= 0 ? 'green' : 'red' : 'green' }}>
                    {params.value ? `${params.value.toFixed(2)}` : 0}
                </span>
            ),
            type: 'number',
            renderHeader: () => (
                <strong>{'PnL (₹)'}</strong>
            ),
            getApplyQuickFilterFn: () => null
        },
    ];

    const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
        pageSize: 15,
        page: 0,
    });

    return (
        <Paper elevation={3}
            sx={{ padding: 1, marginBottom: 1 }}
            square={false} >
            <Stack direction="row" spacing={2} sx={{ justifyContent: 'center', alignItems: 'center' }}>
                <InsertChartRounded color="primary" sx={{ fontSize: 40 }} />
                <Typography variant="h5" gutterBottom>
                    Portfolio Holdings
                </Typography>
            </Stack>
            <Box sx={{ paddingY: 1 }}>
                <DataGrid
                    rows={holdings}
                    rowHeight={38}
                    columns={columns}
                    paginationModel={paginationModel}
                    onPaginationModelChange={setPaginationModel}
                    pageSizeOptions={[15, 25, 50, 100]}
                    showToolbar
                    sx={{ height: 750 }}
                    slots={{ toolbar: HoldingToolbar }}
                    filterModel={filterModel}
                    onFilterModelChange={(model) => { setFilterModel(model) }}
                    columnVisibilityModel={{
                        sector: false,
                    }}
                />
            </Box>
        </Paper>
    );
};

export default PortfolioHoldingsTable;
