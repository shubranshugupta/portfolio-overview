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
    Backdrop,
    Modal,
    Fade
} from '@mui/material';
import { InsertChartRounded } from '@mui/icons-material';
import type { EnrichedHolding } from '../../data/mockData';
import HoldingToolbar from './HoldingToolbar';
import AssetPnL from '../pnl/AssetPnL';

interface PortfolioHoldingProps {
    holdings: EnrichedHolding[];
}

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2
};

const PortfolioHoldingsTable: React.FC<PortfolioHoldingProps> = ({
    holdings
}) => {
    const [selectedAsset, setSelectedAsset] = useState<String | null>(null);

    const handleOpen = (assetName: String) => setSelectedAsset(assetName);
    const handleClose = () => setSelectedAsset(null);

    const columns: GridColDef<EnrichedHolding>[] = [
        {
            field: 'id',
            width: 90,
            type: 'number',
            headerName: 'Id',
            renderHeader: () => (
                <strong>{'Id'}</strong>
            ),
            getApplyQuickFilterFn: () => null
        },
        {
            field: 'asset',
            width: 200,
            headerName: 'Asset',
            renderHeader: () => (
                <strong>{'Asset'}</strong>
            ),
            renderCell: (params: GridRenderCellParams<any, String>) => (
                <Box onClick={() => handleOpen(params.value || '')}>
                    {params.value}
                </Box>
            ),
            getApplyQuickFilterFn: (value: String) => {
                return (cellValue) => {
                    if(cellValue instanceof String)
                        return cellValue.toLowerCase().startsWith(value.toLowerCase());
                    return false;
                }
            }
        },
        {
            field: 'quantity',
            width: 200,
            type: 'number',
            headerName: 'Quantity',
            renderHeader: () => (
                <strong>{'Quantity'}</strong>
            ),
            getApplyQuickFilterFn: () => null
        },
        {
            field: 'avgBuyPrice',
            width: 200,
            type: 'number',
            headerName: 'Avg Buy Price',
            renderHeader: () => (
                <strong>{'Avg Buy Price (₹)'}</strong>
            ),
            getApplyQuickFilterFn: () => null
        },
        {
            field: 'currentPrice',
            width: 200,
            type: 'number',
            headerName: 'Current Price',
            renderHeader: () => (
                <strong>{'Current Price (₹)'}</strong>
            ),
            getApplyQuickFilterFn: () => null
        },
        {
            field: 'stockValue',
            width: 200,
            type: 'number',
            headerName: 'Current Value',
            renderHeader: () => (
                <strong>{'Current Value (₹)'}</strong>
            ),
            getApplyQuickFilterFn: () => null
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
            ),
            getApplyQuickFilterFn: () => null
        },
    ];

    const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
        pageSize: 5,
        page: 0,
    });

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
                    rows={holdings}
                    columns={columns}
                    paginationModel={paginationModel}
                    onPaginationModelChange={setPaginationModel}
                    pageSizeOptions={[5, 10, 25, 50]}
                    showToolbar
                    sx={{ height: 425 }}
                    slots={{ toolbar: HoldingToolbar }}
                />
            </Box>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={selectedAsset !== null} // Open when an asset is selected
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={selectedAsset !== null}>
                    <Box sx={modalStyle}>
                        <AssetPnL holdings={holdings} assetName={selectedAsset || "NA"} />
                    </Box>
                </Fade>
            </Modal>
        </Paper>
    );
};

export default PortfolioHoldingsTable;
