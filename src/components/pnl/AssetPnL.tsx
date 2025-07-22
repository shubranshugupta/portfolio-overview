import React, { forwardRef } from "react";
import {
    Box,
    Typography,
    Stack,
    Card,
    Paper
} from "@mui/material";
import { ShowChartRounded } from '@mui/icons-material';

import type { EnrichedHolding } from '../../data/mockData';
import { useThemeMode } from "../context/ThemeModeContext";

interface AssetPnLProps {
    holdings: EnrichedHolding[];
    assetName: String;
}

const defaultHolding: EnrichedHolding = {
    id: 0,
    asset: "NA",
    quantity: 0,
    avgBuyPrice: 0,
    currentPrice: 0,
    sector: "NA",
    pnl: 0,
    stockValue: 0,
}

type AssetPnLCellContentRef = HTMLDivElement;

const AssetPnL= forwardRef<AssetPnLCellContentRef, AssetPnLProps>(({
    holdings,
    assetName
}, ref) => {
    const filteredHoldings = holdings.find((h) => h.asset === assetName) || defaultHolding;

    const invested = filteredHoldings.quantity * filteredHoldings.avgBuyPrice;
    const current = filteredHoldings.quantity * filteredHoldings.currentPrice;
    const gain = current - invested;
    const gainPercent = ((gain / invested) * 100).toFixed(1);
    const isProfit = gain >= 0;

    const { mode } = useThemeMode();
    const badgeBgColor = mode
        ? (isProfit ? "#66bb6a3f" : "#d040363f")
        : (isProfit ? "#e8f5e9" : "#ffebee");

    return (
        <Box ref={ref} sx={{width: 500}}>
            <Stack direction="row" spacing={2} sx={{ justifyContent: 'center', alignItems: 'center' }}>
                <ShowChartRounded color="primary" sx={{ fontSize: 40 }} />
                <Typography variant="h5" gutterBottom>
                    {assetName} Overview
                </Typography>
            </Stack>
            <br/>
            <Card
                key={filteredHoldings?.id}
                variant="outlined"
                sx={{
                    px: 2,
                    py: 2,
                    borderRadius: 2,
                    boxShadow: 1,
                    borderRight: `3px solid ${badgeBgColor}`,
                }}
            >
                {/* Investment vs Current Bar */}
                <Box sx={{ mt: 1 }}>
                    <Typography variant="body2">Investment vs Current</Typography>
                    <Box
                        sx={{
                            height: 16,
                            width: "100%",
                            backgroundColor: "#e0e0e0",
                            borderRadius: 10,
                            overflow: "hidden",
                            display: "flex",
                        }}
                    >
                        <Box sx={{ width: `100%`, backgroundColor: "#2196f3" }} />
                        <Box
                            sx={{
                                width: `${Math.abs(
                                    ((current - invested) / invested) * 100
                                )}%`,
                                backgroundColor: isProfit ? "#4caf50" : "#f44336",
                            }}
                        />
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
                        <Typography variant="caption">
                            Invested: ₹{invested.toLocaleString()}
                        </Typography>
                        <Typography variant="caption">
                            Current: ₹{current.toLocaleString()}
                        </Typography>
                    </Box>
                </Box>

                {/* Profit/Loss Badge */}
                <Box sx={{ mt: 2, textAlign: "center" }}>
                    <Box
                        sx={{
                            display: "inline-block",
                            px: 3,
                            py: 1,
                            borderRadius: "30px",
                            backgroundColor: badgeBgColor,
                            border: `2px solid ${isProfit ? "green" : "red"}`,
                            boxShadow: 2,
                        }}
                    >
                        <Typography
                            variant="subtitle2"
                            sx={{ color: isProfit ? "green" : "red", fontWeight: 600 }}
                        >
                            {isProfit ? "PROFIT" : "LOSS"}
                        </Typography>
                        <Typography fontWeight="bold">
                            ₹{Math.abs(gain).toLocaleString()} ({Math.abs(Number(gainPercent)).toFixed(1)}%)
                        </Typography>
                    </Box>
                </Box>
            </Card>
        </Box>
    );
});

export default AssetPnL;