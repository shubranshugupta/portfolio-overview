import React, { useState } from 'react';
import {
    Paper,
    Typography,
    Grid,
    Stack,
    TextField,
    MenuItem,
} from '@mui/material';
import { PieChartRounded } from '@mui/icons-material';
import { PieChart, legendClasses } from '@mui/x-charts';

import type { EnrichedHolding } from '../data/mockData';
import { valueFormatter } from '../data/mockData';

// Type for chart data points
interface ChartData {
    label: string;
    value: number;
}

interface RiskChartProps {
    holdings: EnrichedHolding[];
}

// Return top 4 + 'Others' if needed
function getTop4Data(data: ChartData[]): ChartData[] {
    const sorted = [...data].sort((a, b) => b.value - a.value);

    if (sorted.length > 4) {
        const top4 = sorted.slice(0, 4);
        const others = sorted.slice(4);
        const othersValue = others.reduce((sum, row) => sum + row.value, 0);
        return [...top4, { label: 'Others', value: parseFloat(othersValue.toFixed(2)) }];
    }

    return sorted;
}

// --- Chart Config ---
const pieChartSlotsProps = {
    legend: {
        direction: 'horizontal' as const,
        position: {
            vertical: 'bottom' as const,
            horizontal: 'center' as const,
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
    },
};

const pieChartSeriesProps = {
    innerRadius: 50,
    outerRadius: 120,
    paddingAngle: 1,
    cornerRadius: 3,
    highlightScope: { fade: 'global' as const, highlight: 'item' as const },
    faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
    valueFormatter,
};

// --- Component ---
const RiskChart: React.FC<RiskChartProps> = ({ holdings }) => {
    // --- Sector Summary (Group by sector) ---
    const sectorSummaryMap = holdings.reduce<Record<string, number>>((acc, hold) => {
        const { sector, stockValue } = hold;
        acc[sector] = (acc[sector] || 0) + stockValue;
        return acc;
    }, {});

    const sectorSummaryResult: ChartData[] = getTop4Data(
        Object.entries(sectorSummaryMap).map(([label, value]) => ({
            label,
            value: parseFloat(value.toFixed(2)),
        }))
    );

    // --- Asset Summary (Each asset individually) ---
    const assetSummaryResult: ChartData[] = getTop4Data(
        holdings.map((row) => ({
            label: row.asset,
            value: parseFloat((row.currentPrice * row.quantity).toFixed(2)),
        }))
    );
    const [exposure, setExposure] = useState<'sector' | 'asset'>('sector');

    const chartData: ChartData[] = exposure === 'sector' ? sectorSummaryResult : assetSummaryResult;

    return (
        <Paper elevation={3} sx={{ padding: 2, width: '100%', minHeight: 420 }}>
            <Stack direction="row" spacing={2} sx={{ justifyContent: 'center', alignItems: 'center' }}>
                <PieChartRounded color="primary" sx={{ fontSize: 40 }} />
                <Typography variant="h5" gutterBottom>
                    Risk Exposure by {exposure === 'sector' ? 'Sector' : 'Asset'}
                </Typography>
            </Stack>

            <Grid
                container
                spacing={{ xs: 2, md: 3 }}
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
                        label="Exposure Type"
                        sx={{ minWidth: 120, textAlign: 'left' }}
                    >
                        <MenuItem value="sector">Sector</MenuItem>
                        <MenuItem value="asset">Asset</MenuItem>
                    </TextField>
                </Grid>

                <Grid
                    size={{ xs: 4, sm: 8, md: 9 }}
                    sx={{ display: 'flex', justifyContent: 'center', height: 300 }}
                >
                    <PieChart
                        series={[
                            {
                                data: chartData,
                                ...pieChartSeriesProps,
                            },
                        ]}
                        slotProps={pieChartSlotsProps}
                    />
                </Grid>
            </Grid>
        </Paper>
    );
};

export default RiskChart;
