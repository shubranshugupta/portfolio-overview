import { useState } from 'react';
import {
    Box,
    Grid,
    Typography,
    IconButton,
    CssBaseline,
    ThemeProvider,
    createTheme,
} from '@mui/material';
import { Brightness4Rounded, Brightness7Rounded } from '@mui/icons-material';

import { enrichedHoldings } from './data/mockData';
import PortfolioHoldingsTable from './components/holdingTable/PortfolioHoldingTable';
import RiskChart from './components/RiskChart';
import PnLPerTrade from './components/pnl/PnLPerTrade';
import { QuickSearchProvider } from './components/context/QuickSearchContext';
import PnLSummary from './components/pnl/PnLSummary';

function App() {
    const [mode, setMode] = useState<boolean>(false);

    const theme = createTheme({
        palette: {
            mode: mode ? 'dark' : 'light',
        },
        typography: {
            fontFamily: 'Roboto, Arial, sans-serif',
        },
    });

    const toggleMode = () => {
        setMode((prevMode) => !prevMode);
    };

    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Box sx={{ padding: 1, marginBottom: 3 }}>
                    <Grid container spacing={1} sx={{ padding: 1 }}>
                        <Grid size={{ xs: 11 }} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Typography variant="h4" gutterBottom>
                                Portfolio & Risk Dashboard
                            </Typography>
                        </Grid>
                        <Grid size={{ xs: 1 }} sx={{ display: 'flex', justifyContent: 'center' }}>
                            <IconButton onClick={toggleMode} color="inherit">
                                {mode ? <Brightness4Rounded /> : <Brightness7Rounded />}
                            </IconButton>
                        </Grid>
                    </Grid>

                    <QuickSearchProvider>
                        <Grid container spacing={{ xs: 2, md: 3 }} sx={{ padding: 1 }}>
                            <Grid size={{ xs: 12, md: 12 }}>
                                <PortfolioHoldingsTable holdings={enrichedHoldings} />
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <PnLSummary holdings={enrichedHoldings}/>
                                <br />
                                <RiskChart holdings={enrichedHoldings}/>
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }} sx={{ display: 'flex', justifyContent: 'center' }}>
                                <PnLPerTrade holdings={enrichedHoldings} />
                            </Grid>
                        </Grid>
                    </QuickSearchProvider>
                </Box>
            </ThemeProvider>
        </div>
    );
}

export default App;
