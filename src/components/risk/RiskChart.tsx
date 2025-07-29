import React, { useState } from 'react';
import {
    Typography,
    Stack,
    Paper,
    Box,
    Tabs,
    Tab,
} from '@mui/material';
import { PieChartRounded } from '@mui/icons-material';

import { EnrichedHolding } from "../../data/mockData";
import SectorPieChart from './charts/SectorPieChart';
import AssetPieChart from './charts/AssetPieChart';
import HistoryPriceLineChart from './charts/HistoryPriceLineChart';
import { usePortfolio } from '../context/PortfolioContext';

interface RiskChartProps {
    holdings: EnrichedHolding[];
}

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <Box
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && children}
        </Box>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}
export interface DataFormatType {
    label: string;
    value: number;
}

function getTopNData(data: DataFormatType[], n: number): DataFormatType[] {
    const sorted = [...data].sort((a, b) => b.value - a.value);

    if (sorted.length > n) {
        const topN = sorted.slice(0, n);
        const others = sorted.slice(n);
        const othersValue = others.reduce((sum, row) => sum + row.value, 0);
        return [...topN, { label: 'Others', value: parseFloat(othersValue.toFixed(2)) }];
    }

    return sorted;
}

const RiskChart: React.FC<RiskChartProps> = ({ holdings }) => {
    const [tabIdx, setTabIdx] = useState(0);
    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
                setTabIdx(newValue);
    };

    const { selectedAsset, selectedSector } = usePortfolio();

    return (
        <Paper elevation={3} sx={{ padding: 2, width: '100%', minHeight: 420 }}>
            <Stack direction="row" spacing={2} sx={{ justifyContent: 'center', alignItems: 'center', mb: 2 }}>
                <PieChartRounded color="primary" sx={{ fontSize: 40 }} />
                <Typography variant="h5" gutterBottom>
                    Risk Overview
                </Typography>
            </Stack>

            <Box>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs
                        value={tabIdx}
                        onChange={handleTabChange}
                        textColor="secondary"
                        indicatorColor="secondary"
                        variant="scrollable"
                        scrollButtons="auto"
                    >
                        <Tab label={`${selectedSector? selectedSector:""} Sector Exposure`} {...a11yProps(0)} />
                        <Tab label={`${selectedAsset ? selectedAsset.name+" Performance":"Asset Exposure"}`} 
                            {...a11yProps(1)} 
                        />
                        {!selectedSector && (
                            <Tab label='Top 3 Holdings Performance' {...a11yProps(2)} />
                        )}
                    </Tabs>
                </Box>
                <CustomTabPanel value={tabIdx} index={0}>
                    <SectorPieChart holdings={holdings} getTopNData={getTopNData} />
                </CustomTabPanel>
                <CustomTabPanel value={tabIdx} index={1}>
                    { selectedAsset ? (
                        <HistoryPriceLineChart holdings={holdings} getTopNData={getTopNData} />
                    ) : (
                        <AssetPieChart holdings={holdings} getTopNData={getTopNData} />
                    )}
                </CustomTabPanel>
                <CustomTabPanel value={tabIdx} index={2}>
                    <HistoryPriceLineChart holdings={holdings} getTopNData={getTopNData} />
                </CustomTabPanel>
            </Box>
        </Paper>
    );
};

export default RiskChart;
