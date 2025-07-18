import React, { useState } from "react";
import {
    Box,
    Typography,
    Stack,
    Card,
    Paper,
    TextField,
    Pagination,
    InputAdornment,
    IconButton
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import CancelIcon from '@mui/icons-material/Cancel';
import { ShowChartRounded } from '@mui/icons-material';

import type { EnrichedHolding } from '../../data/mockData';
import { useQuickSearch } from '../context/QuickSearchContext';

interface PnLPerTradeProps {
    holdings: EnrichedHolding[];
    mode: boolean;
}

const PnLPerTrade: React.FC<PnLPerTradeProps> = ({
    holdings,
    mode
}) => {
    const [page, setPage] = useState(1);
    const cardsPerPage = 2;
    const { searchValue, setSearchValue } = useQuickSearch();

    const filteredHoldings = holdings.filter((h) =>
        h.asset.toLowerCase().startsWith(searchValue.toLowerCase())
    );

    const totalPages = Math.ceil(filteredHoldings.length / cardsPerPage);
    const paginatedHoldings = filteredHoldings.slice(
        (page - 1) * cardsPerPage,
        page * cardsPerPage
    );

    return (
        <Paper elevation={3}
            sx={{
                padding: 2,
                height: 780,
                display: "flex",
                flexDirection: "column",
                width: '100%'
            }}>
            <Stack direction="row" spacing={2} sx={{ justifyContent: 'center', alignItems: 'center' }}>
                <ShowChartRounded color="primary" sx={{ fontSize: 40 }} />
                <Typography variant="h5" gutterBottom>
                    Per Asset PnL
                </Typography>
            </Stack>

            {/* Search Bar */}
            <Box sx={{ mb: 3, marginTop: 2}}>
                <TextField
                    value={searchValue}
                    onChange={(e) => {
                        setSearchValue(e.target.value);
                        setPage(1);
                    }}
                    placeholder="Search by asset"
                    variant="outlined"
                    size="small"
                    fullWidth
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon fontSize="small" />
                                </InputAdornment>
                            ),
                            endAdornment: searchValue ? (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="Clear search"
                                        sx={{ marginRight: -0.75 }}
                                        onClick={(e) => setSearchValue("")}
                                    >
                                        <CancelIcon fontSize="small" />
                                    </IconButton>
                                </InputAdornment>
                            ) : null
                        }
                    }}
                    sx={{
                        borderRadius: 2,
                        boxShadow: 1,
                        "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                        },
                    }}
                />
            </Box>

            {/* Cards */}
            <Stack spacing={2}>
                {paginatedHoldings.length === 0 ? (
                    <Typography variant="body2" color="textSecondary" textAlign="center">
                        No matching assets.
                    </Typography>
                ) : (
                    paginatedHoldings.map((h) => {
                        const invested = h.quantity * h.avgBuyPrice;
                        const current = h.quantity * h.currentPrice;
                        const gain = current - invested;
                        const gainPercent = ((gain / invested) * 100).toFixed(1);
                        const isProfit = gain >= 0;

                        const badgeBgColor = mode
                            ? (isProfit ? "#66bb6a3f" : "#d040363f")
                            : (isProfit ? "#e8f5e9" : "#ffebee");

                        return (
                            <Card
                                key={h.id}
                                variant="outlined"
                                sx={{
                                    px: 2,
                                    py: 2,
                                    borderRadius: 2,
                                    boxShadow: 1,
                                    borderRight: `3px solid ${badgeBgColor}`,
                                }}
                            >
                                <Typography variant="subtitle1" fontWeight={600}>
                                    {h.asset}
                                </Typography>

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
                        );
                    })
                )}
            </Stack>
            <br />
            <br />

            {/* Pagination */}
            {filteredHoldings.length > cardsPerPage && (
                <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
                    <Pagination
                        count={totalPages}
                        page={page}
                        onChange={(_, val) => setPage(val)}
                        color="primary"
                        shape="rounded"
                        showFirstButton
                        showLastButton
                    />
                </Box>
            )}
        </Paper>
    );
};

export default PnLPerTrade;