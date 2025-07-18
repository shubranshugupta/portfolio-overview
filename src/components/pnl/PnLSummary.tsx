import React from "react";
import { Box, Typography, Paper, Stack } from "@mui/material";
import { ShowChartRounded } from '@mui/icons-material';

import { EnrichedHolding } from "../../data/mockData";

interface PnLSummaryProps {
    holdings: EnrichedHolding[];
}

const PnLSummary: React.FC<PnLSummaryProps> = ({ holdings }) => {
    const invested = holdings.reduce((sum, h) => sum + h.avgBuyPrice * h.quantity, 0);
    const current = holdings.reduce((sum, h) => sum + h.currentPrice * h.quantity, 0);
    const gain = current - invested;
    const gainPercent = invested === 0 ? 0 : ((gain / invested) * 100);
    const isProfit = gain >= 0;

    return (
        <Paper elevation={3} sx={{ padding: 2 }}>
            <Stack direction="row" spacing={2} sx={{ justifyContent: 'center', alignItems: 'center' }}>
                <ShowChartRounded color="primary" sx={{ fontSize: 40 }} />
                <Typography variant="h5" gutterBottom>
                    Portfolio PnL Summary
                </Typography>
            </Stack>

            {/* Investment vs Current bar */}
            <Box sx={{ mt: 1 }}>
                <Typography variant="body2" gutterBottom>
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
            <Box sx={{ mt: 2, textAlign: "center" }}>
                <Box
                    sx={{
                        display: "inline-block",
                        px: 3,
                        py: 1.2,
                        borderRadius: "30px",
                        backgroundColor: isProfit ? "#e8f5e9" : "#ffebee",
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

            <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between", gap: 2 }}>
                {[
                    {
                        label: "Total Invested",
                        value: `₹${invested.toLocaleString()}`,
                        color: "inherit",
                    },
                    {
                        label: "Current Value",
                        value: `₹${current.toLocaleString()}`,
                        color: "inherit",
                    },
                    {
                        label: "Net P&L",
                        value: `₹${Math.abs(gain).toLocaleString()}`,
                        color: isProfit ? "green" : "red",
                    },
                    {
                        label: "Return %",
                        value: `${Math.abs(gainPercent).toFixed(1)}%`,
                        color: isProfit ? "green" : "red",
                    },
                ].map((item, index) => (
                    <Paper
                        key={index}
                        elevation={2}
                        sx={{
                            flex: "0 0 15%", // each box takes ~1/4 width with some spacing
                            textAlign: "center",
                            p: 2,
                        }}
                    >
                        <Typography variant="caption" color="textSecondary">
                            {item.label}
                        </Typography>
                        <Typography variant="subtitle1" fontWeight={600} color={item.color}>
                            {item.value}
                        </Typography>
                    </Paper>
                ))}
            </Box>
        </Paper>
    );
};

export default PnLSummary;