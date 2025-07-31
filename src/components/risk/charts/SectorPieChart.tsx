import React from 'react';
import { PieChart, legendClasses } from '@mui/x-charts';

import type { EnrichedHolding } from '../../../data/mockData';
import { valueFormatter } from '../../../data/mockData';
import { useFilterModel } from '../../context/FilterModelContext';
import { DataFormatType } from '../RiskChart';
import { usePortfolio } from '../../context/PortfolioContext';


interface SectorPieChartProps {
    holdings: EnrichedHolding[];
    getTopNData: (data: DataFormatType[], n: number) => DataFormatType[];
}

const SectorPieChart: React.FC<SectorPieChartProps> = ({ holdings, getTopNData }) => {
    const { selectedSector, selectedAsset } = usePortfolio();

    let TOTAL = holdings.reduce((sum, row) => sum + (row.currentPrice * row.quantity), 0);
    if (selectedSector) {
        TOTAL = holdings
            .filter(row => row.sector === selectedSector)
            .reduce((sum, row) => sum + (row.currentPrice * row.quantity), 0);
    }


    const { setFilterModel } = useFilterModel();
    const handleSectorItemClick = (sector: string | null) => {
        if(selectedSector !== null) {
            setFilterModel({items: [
                {field: 'sector', operator: 'is', value: selectedSector}
            ]});
        } else if(sector!=='Others') {
            setFilterModel({items: [
                {field: 'sector', operator: 'is', value: sector}
            ]});
        } else {
            setFilterModel({items: []});
        }
    };

    // --- Sector Summary (Group by sector) ---
    const sectorSummaryMap = holdings.reduce<Record<string, number>>((acc, hold) => {
        const { sector, stockValue } = hold;
        acc[sector] = (acc[sector] || 0) + stockValue;
        return acc;
    }, {});

    let sectorSummaryResult: DataFormatType[] = getTopNData(
        Object.entries(sectorSummaryMap).map(([label, value]) => ({
            label,
            value: parseFloat(value.toFixed(2)),
        })),
        4
    );

    // If a sector is selected, filter the holdings to that sector
    if (selectedSector!==null && selectedAsset!==null) {
        sectorSummaryResult = holdings.filter(item => item.sector === selectedSector)
            .reduce<DataFormatType[]>((acc, item) => {
                acc.push({ label: item.asset, value: item.currentPrice * item.quantity });
                return acc;
            }, []);
        const selectedAssetSummary = sectorSummaryResult.find(item => item.label === selectedAsset.name);
        sectorSummaryResult = sectorSummaryResult.filter(item => item.label !== selectedAsset.name);
        sectorSummaryResult = getTopNData(sectorSummaryResult, 3);
        sectorSummaryResult = [selectedAssetSummary || { label: 'Others', value: 0 }, ...sectorSummaryResult];
    }

    return (
        <PieChart
            height={230}
            series={[
                {
                    data: sectorSummaryResult,
                    innerRadius: 25,
                    outerRadius: 100,
                    paddingAngle: 1,
                    cornerRadius: 3,
                    highlightScope: { fade: 'global', highlight: 'item' },
                    faded: { innerRadius: 20, additionalRadius: -20, color: 'gray' },
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
                         gap: '10px',
                        [`.${legendClasses.mark}`]: {
                            height: 10,
                            width: 10,
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
};

export default SectorPieChart;
