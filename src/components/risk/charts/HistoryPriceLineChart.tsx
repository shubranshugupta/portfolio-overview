import React from 'react';
import { LineChart } from '@mui/x-charts';

import type { EnrichedHolding, PortfolioHistoryPrice } from '../../../data/mockData';
import { valueFormatter, portfolioHoldingHistoryPrice } from '../../../data/mockData';
import { DataFormatType } from '../RiskChart';

interface HistoryPriceLineChartProps {
    holdings: EnrichedHolding[];
    getTopNData: (data: DataFormatType[], n: number) => DataFormatType[];
}

const HistoryPriceLineChart: React.FC<HistoryPriceLineChartProps> = ({ holdings, getTopNData }) => {
    const top3Asset: DataFormatType[] = getTopNData(
        holdings.map((row) => ({
            label: row.asset,
            value: parseFloat((row.currentPrice * row.quantity).toFixed(2)),
        })),
        3
    );
    const top5AssetHistory: PortfolioHistoryPrice[] = top3Asset
            .map((hold) => ({
                id: portfolioHoldingHistoryPrice.find(h => h.asset === hold.label)?.id || -1,
                asset: hold.label,
                history: portfolioHoldingHistoryPrice.find(h => h.asset === hold.label)?.history || 
                    { date: [], price: [] },
            }));

    return (
        <LineChart
            height={300}
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

export default HistoryPriceLineChart;