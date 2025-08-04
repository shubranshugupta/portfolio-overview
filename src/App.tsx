import {
    Box,
    Grid,
    Typography,
    IconButton,
    CssBaseline,
    ThemeProvider,
    createTheme,
    Stack,
} from '@mui/material';
import { Brightness4Rounded, Brightness7Rounded } from '@mui/icons-material';

import { enrichedHoldings } from './data/mockData';
import PortfolioHoldingsTable from './components/holdingTable/PortfolioHoldingTable';
import RiskChart from './components/risk/RiskChart';
import { useThemeMode } from './components/context/ThemeModeContext';
import PnLSummary from './components/pnl/PnLSummary';
import { PortfolioProvider } from './components/context/PortfolioContext';
import { FilterModelProvider } from './components/context/FilterModelContext';

function App() {
    const { mode, setMode } = useThemeMode();

    const theme = createTheme({
        palette: {
            mode: mode ? 'dark' : 'light',
        },
        typography: {
            fontFamily: 'Roboto, Arial, sans-serif',
        },
    });

    const toggleMode = () => {
        setMode(!mode);
    };

    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Box sx={{ padding: 1, marginBottom: 3}}>
                    <Grid container spacing={1} sx={{ padding: 1 }}>
                        <Grid size={{ xs: 11 }} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Typography variant="h4" gutterBottom>
                                PORTFOLIO & RISK DASHBOARD
                            </Typography>
                        </Grid>
                        <Grid size={{ xs: 1 }} sx={{ display: 'flex', justifyContent: 'center' }}>
                            <IconButton onClick={toggleMode} color="inherit">
                                {mode ? <Brightness4Rounded /> : <Brightness7Rounded />}
                            </IconButton>
                        </Grid>
                    </Grid>

                    <PortfolioProvider>
                        <FilterModelProvider>
                            <Grid container spacing={{ xs: 2, md: 1 }}>
                                <Grid size={{ xs: 8 }}>
                                    <PortfolioHoldingsTable holdings={enrichedHoldings} />
                                </Grid>
                                <Grid size={{ xs: 12, md: 4 }}>
                                    <Stack spacing={1}>  
                                        <RiskChart holdings={enrichedHoldings} />
                                        <PnLSummary holdings={enrichedHoldings} />
                                    </Stack>
                                </Grid>                               
                            </Grid>
                        </FilterModelProvider>
                    </PortfolioProvider>
                </Box>
            </ThemeProvider>
        </div>
    );
}

export default App;