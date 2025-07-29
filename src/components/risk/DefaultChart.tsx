import React, { useState } from 'react';
import {
    Typography,
    Grid,
    Stack,
    TextField,
    MenuItem,
    Box,
} from '@mui/material';
import { PieChartRounded } from '@mui/icons-material';
import { LineChart, PieChart, legendClasses } from '@mui/x-charts';

import type { 
    EnrichedHolding, 
    PortfolioHistoryPrice, 
} from '../../data/mockData';
import { 
    valueFormatter,
    portfolioHoldingHistoryPrice  
} from '../../data/mockData';

// Type for chart data points
interface ChartData {
    label: string;
    value: number;
}

interface DefaultChartProps {
    holdings: EnrichedHolding[];
}

// Return top 3 + 'Others' if needed
function getTop3Data(data: ChartData[]): ChartData[] {
    const sorted = [...data].sort((a, b) => b.value - a.value);

    if (sorted.length > 3) {
        const top3 = sorted.slice(0, 3);
        const others = sorted.slice(3);
        const othersValue = others.reduce((sum, row) => sum + row.value, 0);
        return [...top3, { label: 'Others', value: parseFloat(othersValue.toFixed(2)) }];
    }

    return sorted;
}

// --- Component ---
const DefaultChart: React.FC<DefaultChartProps> = ({ holdings }) => {
    const TOTAL = holdings.reduce((sum, row) => sum + (row.currentPrice * row.quantity), 0)

    // --- Sector Summary (Group by sector) ---
    const sectorSummaryMap = holdings.reduce<Record<string, number>>((acc, hold) => {
        const { sector, stockValue } = hold;
        acc[sector] = (acc[sector] || 0) + stockValue;
        return acc;
    }, {});

    const sectorSummaryResult: ChartData[] = getTop3Data(
        Object.entries(sectorSummaryMap).map(([label, value]) => ({
            label,
            value: parseFloat(value.toFixed(2)),
        }))
    );

    // --- Asset Summary (Each asset individually) ---
    const assetSummaryResult: ChartData[] = getTop3Data(
        holdings.map((row) => ({
            label: row.asset,
            value: parseFloat((row.currentPrice * row.quantity).toFixed(2)),
        }))
    );

    // Top 5 Asset History Price
    const top5AssetHistory: PortfolioHistoryPrice[] = assetSummaryResult
        .slice(0, 5)
        .map((hold) => ({
            id: portfolioHoldingHistoryPrice.find(h => h.asset === hold.label)?.id || -1,
            asset: hold.label,
            history: portfolioHoldingHistoryPrice.find(h => h.asset === hold.label)?.history || 
                { date: [], price: [] },
        }));
    
    const [exposure, setExposure] = useState<string>('sector');

    let heading = '';
    let chartJsx: React.ReactNode = null;
    if (exposure === 'sector' || exposure === 'asset') {
        heading = exposure === 'sector' ? 'Sector Exposure' : 'Asset Exposure';
        chartJsx = (
            <PieChart
                series={[
                    {
                        data: exposure === 'sector' ? sectorSummaryResult : assetSummaryResult,
                        innerRadius: 50,
                        outerRadius: 120,
                        paddingAngle: 1,
                        cornerRadius: 3,
                        highlightScope: { fade: 'global', highlight: 'item' },
                        faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                        valueFormatter: (value) => {
                            const percent = (value.value/TOTAL)*100;
                            return `${valueFormatter(value)} (${percent.toFixed(1)}%)`
                        }
                    },
                ]}
                slotProps={{
                    legend: {
                        direction: 'horizontal',
                        position: {
                            vertical: 'bottom',
                            horizontal: 'center',
                        },
                        sx: {
                            gap: '14px',
                            [`.${legendClasses.mark}`]: {
                                height: 14,
                                width: 14,
                            },
                            '.MuiChartsLegend-series': {
                                gap: '9px',
                            },
                        },
                    }
                }}
            />
        )
    } else if (exposure === 'history') {
        heading = 'Top 3 Asset History Price';
        chartJsx = (
            <LineChart
                series={
                    top5AssetHistory.slice(0, 3).map((hold) => ({
                        data: hold.history.price,
                        label: hold.asset,
                        valueFormatter: valueFormatter,
                        showMark: false
                    }))
                }
                xAxis={[{ 
                    scaleType: 'point', 
                    data: top5AssetHistory[0].history.date,
                    valueFormatter: (value) => new Date(value).toLocaleDateString('en-US', {
                        month: '2-digit',
                        year: '2-digit'
                    })
                }]}
                yAxis={[{ width: 50 }]}
                margin={{ right: 24 }}
                slotProps={{
                    legend: {
                        direction: 'horizontal',
                        position: { vertical: 'bottom', horizontal: 'center' }
                    }
                }}
            />
        );
    }

    return (
        <>
            <Stack direction="row" spacing={2} sx={{ justifyContent: 'center', alignItems: 'center' }}>
                <PieChartRounded color="primary" sx={{ fontSize: 40 }} />
                <Typography variant="h5" gutterBottom>
                    { heading }
                </Typography>
            </Stack>

            <Grid
                container
                spacing={{ xs: 2 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
                sx={{ paddingY: 2, margin: 1 }}
            >
                <Grid
                    size={{ xs: 4, sm: 8, md: 3 }}
                    sx={{ display: 'flex', justifyContent: 'center', alignItems: 'start' }}
                >
                    <TextField
                        select
                        value={exposure}
                        onChange={(event) => setExposure(event.target.value as 'sector' | 'asset')}
                        label="Chart Type"
                        sx={{ minWidth: 120, textAlign: 'left' }}
                    >
                        <MenuItem value="sector">Sector Exposure</MenuItem>
                        <MenuItem value="asset">Asset Exposure</MenuItem>
                        <MenuItem value="history">Top 3 Asset History</MenuItem>
                    </TextField>
                </Grid>
                <Grid
                    size={{ xs: 4, sm: 8, md: 9 }}
                    sx={{ display: 'flex', justifyContent: 'center', height: { xs: 400, md: 300 } }}
                >
                    {chartJsx}
                </Grid>
            </Grid>
        </>
    );
};

export default DefaultChart;
