import React from 'react';
import {
    Toolbar,
    ToolbarButton,
    ColumnsPanelTrigger,
    FilterPanelTrigger,
    ExportCsv,
    ExportPrint
} from '@mui/x-data-grid';
import {
    TextField,
    Tooltip,
    InputAdornment,
    Divider,
    Badge,
    Menu,
    MenuItem,
    IconButton
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CancelIcon from '@mui/icons-material/Cancel';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import FilterListIcon from '@mui/icons-material/FilterList';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

import { useQuickSearch } from '../context/QuickSearchContext';

const HoldingToolbar: React.FC = () => {
    const [exportMenuOpen, setExportMenuOpen] = React.useState(false);
    const exportMenuTriggerRef = React.useRef<HTMLButtonElement>(null);

    const { searchValue, setSearchValue } = useQuickSearch();

    return (
        <Toolbar>
            <Tooltip title="Columns">
                <ColumnsPanelTrigger render={<ToolbarButton />}>
                    <ViewColumnIcon fontSize="small" />
                </ColumnsPanelTrigger>
            </Tooltip>

            <Tooltip title="Filters">
                <FilterPanelTrigger
                    render={(props, state) => (
                        <ToolbarButton {...props} color="default">
                            <Badge badgeContent={state.filterCount} color="primary" variant="dot">
                                <FilterListIcon fontSize="small" />
                            </Badge>
                        </ToolbarButton>
                    )}
                />
            </Tooltip>

            <Divider orientation="vertical" variant="middle" flexItem sx={{ mx: 0.5 }} />

            <Tooltip title="Export">
                <ToolbarButton
                    ref={exportMenuTriggerRef}
                    id="export-menu-trigger"
                    aria-controls="export-menu"
                    aria-haspopup="true"
                    aria-expanded={exportMenuOpen ? 'true' : undefined}
                    onClick={() => setExportMenuOpen(true)}
                >
                    <FileDownloadIcon fontSize="small" />
                </ToolbarButton>
            </Tooltip>

            <Menu
                id="export-menu"
                anchorEl={exportMenuTriggerRef.current}
                open={exportMenuOpen}
                onClose={() => setExportMenuOpen(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                slotProps={{
                    list: {
                        'aria-labelledby': 'export-menu-trigger',
                    },
                }}
            >
                <ExportPrint render={<MenuItem />} onClick={() => setExportMenuOpen(false)}>
                    Print
                </ExportPrint>
                <ExportCsv render={<MenuItem />} onClick={() => setExportMenuOpen(false)}>
                    Download as CSV
                </ExportCsv>
                {/* Available to MUI X Premium users */}
                {/* <ExportExcel render={<MenuItem />}>
                    Download as Excel
                </ExportExcel> */}
            </Menu>

            <Divider orientation="vertical" variant="middle" flexItem sx={{ mx: 0.5 }} />

            <TextField
                value={searchValue}
                onChange={(e) => {
                    setSearchValue(e.target.value);
                }}
                sx={{ width: 260 }}
                aria-label="Search"
                placeholder="Search..."
                size="small"
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
            />
        </Toolbar>
    );
}

export default React.memo(HoldingToolbar);