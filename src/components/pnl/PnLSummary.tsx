import React from "react";
import { Box, Typography, Paper, Stack } from "@mui/material";
import { ShowChartRounded } from '@mui/icons-material';

import { EnrichedHolding } from "../../data/mockData";
import { useThemeMode } from "../context/ThemeModeContext";
import { usePortfolio } from "../context/PortfolioContext";

interface PnLSummaryProps {
    holdings: EnrichedHolding[];
}

const PnLSummary: React.FC<PnLSummaryProps> = ({ holdings }) => {
    const { selectedAsset } = usePortfolio();

    let invested = 0;
    let current = 0;
    let gain = 0;
    let gainPercent = 0;
    let isProfit = false;
    if (selectedAsset === null) {
        invested = holdings.reduce((sum, h) => sum + h.avgBuyPrice * h.quantity, 0);
        current = holdings.reduce((sum, h) => sum + h.currentPrice * h.quantity, 0);
        gain = current - invested;
        gainPercent = invested === 0 ? 0 : ((gain / invested) * 100);
        isProfit = gain >= 0;
    } else {
        const selectedHolding = holdings.find(h => h.id === selectedAsset.id);
        invested = selectedHolding ? selectedHolding.avgBuyPrice * selectedHolding.quantity : 0;
        current = selectedHolding ? selectedHolding.currentPrice * selectedHolding.quantity : 0;
        gain = current - invested;
        gainPercent = invested === 0 ? 0 : ((gain / invested) * 100);
        isProfit = gain >= 0;
    }

    const { mode } = useThemeMode();
    const badgeBgColor = mode
        ? (isProfit ? "#66bb6a3f" : "#d040363f")
        : (isProfit ? "#e8f5e9" : "#ffebee");

    return (
        <Paper elevation={3} sx={{ padding: 1, width: '100%' }}>
            <Stack direction="row" spacing={2} sx={{ justifyContent: 'center', alignItems: 'center' }}>
                <ShowChartRounded color="primary" sx={{ fontSize: 40 }} />
                <Typography variant="h5" gutterBottom>
                    {selectedAsset ? selectedAsset.name : "Portfolio"} PnL Summary
                </Typography>
            </Stack>

            {/* Investment vs Current bar */}
            <Box sx={{ mt: 1 }}>
                <Typography variant="body1" gutterBottom>
                    Investment vs Current
                </Typography>

                <Box
                    sx={{
                        height: 16,
                        backgroundColor: "#e0e0e0",
                        borderRadius: 10,
                        overflow: "hidden",
                        display: "flex",
                    }}
                >
                    <Box
                        sx={{
                            width: `${Math.min((Math.min(current, invested) / invested) * 100, 100)}%`,
                            backgroundColor: "#2196f3",
                        }}
                    />
                    <Box
                        sx={{
                            width: `${Math.abs(((current - invested) / invested) * 100)}%`,
                            backgroundColor: isProfit ? "#4caf50" : "#f44336",
                        }}
                    />
                </Box>

                <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
                    <Typography variant="caption">Invested: ₹{invested.toLocaleString()}</Typography>
                    <Typography variant="caption">Current: ₹{current.toLocaleString()}</Typography>
                </Box>
            </Box>

            {/* Profit / Loss Badge */}
            <Box sx={{ mt: 1, textAlign: "center" }}>
                <Box
                    sx={{
                        display: "inline-block",
                        px: 3,
                        py: 1.2,
                        borderRadius: "30px",
                        backgroundColor: badgeBgColor,
                        border: `2px solid ${isProfit ? "green" : "red"}`,
                        minWidth: "140px",
                        boxShadow: 2,
                    }}
                >
                    <Stack direction="column" alignItems="center" spacing={0.5}>
                        <Typography
                            variant="subtitle2"
                            sx={{ color: isProfit ? "green" : "red", fontWeight: 600 }}
                        >
                            {isProfit ? "PROFIT" : "LOSS"}
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                            ₹{Math.abs(gain).toLocaleString()} ({Math.abs(gainPercent).toFixed(1)}%)
                        </Typography>
                    </Stack>
                </Box>
            </Box>

            <Stack direction={{ xs: 'column' }}
                spacing={{ xs: 1 }}
                alignItems="center"
                justifyContent="center"
                sx={{ mt: 2, mb: 1 }}
            >
                <Box display='flex' justifyContent='space-between' gap={{ xs: 2 }}>
                    <Paper
                        key={0}
                        elevation={2}
                        sx={{ textAlign: "center", p: 1, minWidth: 130}}
                    >
                        <Typography variant="caption" color="textSecondary">
                            Total Invested
                        </Typography>
                        <Typography variant="subtitle2" fontWeight={600} color='inherit'>
                            {`₹${invested.toLocaleString()}`}
                        </Typography>
                    </Paper>
                    <Paper
                        key={1}
                        elevation={2}
                        sx={{ textAlign: "center", p: 1, minWidth: 130}}
                    >
                        <Typography variant="caption" color="textSecondary">
                            Current Value
                        </Typography>
                        <Typography variant="subtitle2" fontWeight={600} color='inherit'>
                            {`₹${current.toLocaleString()}`}
                        </Typography>
                    </Paper>
                </Box>
                <Box display='flex' justifyContent='space-between' gap={{ xs: 2 }}>
                    <Paper
                        key={2}
                        elevation={2}
                        sx={{ textAlign: "center", p: 1, minWidth: 130}}
                    >
                        <Typography variant="caption" color="textSecondary">
                            Net P&L
                        </Typography>
                        <Typography variant="subtitle2" fontWeight={600} color={isProfit ? "green" : "red"}>
                            {isProfit?"+":"-"}{`₹${Math.abs(gain).toLocaleString()}`}
                        </Typography>
                    </Paper>
                    <Paper
                        key={3}
                        elevation={2}
                        sx={{ textAlign: "center", p: 1, minWidth: 130}}
                    >
                        <Typography variant="caption" color="textSecondary">
                            Return %
                        </Typography>
                        <Typography variant="subtitle2" fontWeight={600} color={isProfit ? "green" : "red"}>
                            {isProfit?"+":"-"}{`${Math.abs(gainPercent).toFixed(1)}%`}
                        </Typography>
                    </Paper>
                </Box>
            </Stack>
        </Paper>
    );
};

export default PnLSummary;