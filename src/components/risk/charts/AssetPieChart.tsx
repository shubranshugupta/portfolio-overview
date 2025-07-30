import React from 'react';
import { PieChart, legendClasses } from '@mui/x-charts';

import type { EnrichedHolding } from '../../../data/mockData';
import { valueFormatter } from '../../../data/mockData';
import { DataFormatType } from '../RiskChart';
import { useFilterModel } from '../../context/FilterModelContext';
import { usePortfolio } from '../../context/PortfolioContext';

interface AssetPieChartProps {
    holdings: EnrichedHolding[];
    getTopNData: (data: DataFormatType[], n: number) => DataFormatType[];
}

const AssetPieChart: React.FC<AssetPieChartProps> = ({ holdings, getTopNData }) => {
    const TOTAL = holdings.reduce((sum, row) => sum + (row.currentPrice * row.quantity), 0);

    const assetSummaryResult: DataFormatType[] = getTopNData(
        holdings.map((row) => ({
            label: row.asset,
            value: parseFloat((row.currentPrice * row.quantity).toFixed(2)),
        })),
        9
    );

    const { setFilterModel } = useFilterModel();
    const { selectedAsset } = usePortfolio();
    const handleSectorItemClick = (asset: string | null) => {
        if(selectedAsset !== null) {
            return null;
        } else if(asset!=='Others') {
            setFilterModel({items: [
                {field: 'asset', operator: 'equals', value: asset}
            ]});
        } else {
            setFilterModel({items: []});
        }
    };

    return (
        <PieChart
            height={335}
            series={[
                {
                    data: assetSummaryResult,
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
            onItemClick={(event, identifier, item) => {
                if(typeof item.label === 'string')
                    handleSectorItemClick(item.label);
            }}
        />
    );
}

export default AssetPieChart;
