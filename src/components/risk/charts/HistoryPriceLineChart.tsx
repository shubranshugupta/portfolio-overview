import React from 'react';
import { LineChart } from '@mui/x-charts';
import { Tooltip, Button, ButtonGroup, Box, CardContent, ToggleButtonGroup, ToggleButton } from '@mui/material';

import type { EnrichedHolding, PortfolioHistoryPrice } from '../../../data/mockData';
import { valueFormatter, portfolioHoldingHistoryPrice } from '../../../data/mockData';
import { DataFormatType } from '../RiskChart';
import { usePortfolio } from '../../context/PortfolioContext';

interface HistoryPriceLineChartProps {
    holdings: EnrichedHolding[];
    getTopNData: (data: DataFormatType[], n: number) => DataFormatType[];
}

const HistoryPriceLineChart: React.FC<HistoryPriceLineChartProps> = ({ holdings, getTopNData }) => {
    const { selectedAsset } = usePortfolio();
    let isProfit = null;
    const [periodLen, setPeriodLen] = React.useState<12 | 24>(12);

    const top3Asset: DataFormatType[] = getTopNData(
        holdings.map((row) => ({
            label: row.asset,
            value: parseFloat((row.currentPrice * row.quantity).toFixed(2)),
        })),
        3
    );
    let assetHistory: PortfolioHistoryPrice[] = top3Asset
        .map((hold) => ({
            id: portfolioHoldingHistoryPrice.find(h => h.asset === hold.label)?.id || -1,
            asset: hold.label,
            history: portfolioHoldingHistoryPrice.find(h => h.asset === hold.label)?.history ||
                { date: [], price: [] },
        }));

    if (selectedAsset !== null) {
        const selectedHolding = holdings.find(h => h.asset === selectedAsset.name);
        isProfit = selectedHolding ? selectedHolding.currentPrice > selectedHolding.avgBuyPrice : null;
        assetHistory = [{
            id: portfolioHoldingHistoryPrice.find(h => h.asset === selectedAsset.name)?.id || -1,
            asset: selectedAsset.name,
            history: portfolioHoldingHistoryPrice.find(h => h.asset === selectedAsset.name)?.history ||
                { date: [], price: [] },
        }];
    }

    const handleDurationChange = (_: any, newDuration: 12 | 24 | null) => {
        if (newDuration) setPeriodLen(newDuration);
    };

    return (
        <CardContent sx={{ margin:0, padding:0, pt:0.5 }}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-end', // Pushes items to opposite ends
                    alignItems: 'center',
                }}
            >
                <ToggleButtonGroup
                    value={periodLen}
                    exclusive
                    onChange={handleDurationChange}
                    size="small"
                    color='secondary'
                >
                    <ToggleButton value={12} sx={{ p: 0.5 }} color='secondary'>12M</ToggleButton>
                    <ToggleButton value={24} sx={{ p: 0.5 }} color='secondary'>24M</ToggleButton>
                </ToggleButtonGroup>
            </Box>

            <LineChart
                height={240}
                series={
                    assetHistory.slice(0, 3).map((hold) => ({
                        data: hold.history.price.slice(-periodLen),
                        label: hold.asset,
                        valueFormatter: valueFormatter,
                        showMark: false,
                    }))
                }
                xAxis={[{
                    scaleType: 'point',
                    data: assetHistory[0].history.date.slice(-periodLen),
                    valueFormatter: (value) => new Date(value).toLocaleDateString('en-US', {
                        month: '2-digit',
                        year: '2-digit'
                    })
                }]}
                // yAxis={[{ width: 50 }]}
                // margin={{ right: 24 }}
                slotProps={{
                    legend: {
                        direction: 'horizontal',
                        position: { vertical: 'bottom', horizontal: 'center' }
                    }
                }}
                grid={{ vertical: true, horizontal: true }}
                colors={[
                    isProfit == null ? '#7b1fa2' : isProfit ? '#2e7d32' : '#b71c1c',
                    '#c2185b', '#039be5'
                ]}
                skipAnimation={true}
            />
        </CardContent>
    );
}

export default HistoryPriceLineChart;