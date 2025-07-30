import React from 'react';
import {
    Toolbar,
    ToolbarButton,
    ColumnsPanelTrigger,
    FilterPanelTrigger,
    ExportCsv,
    ExportPrint,
    QuickFilter,
    QuickFilterControl,
    QuickFilterClear,
    QuickFilterTrigger,
    useGridApiContext
} from '@mui/x-data-grid';
import {
    TextField,
    Tooltip,
    InputAdornment,
    Divider,
    Badge,
    Menu,
    MenuItem,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import CancelIcon from '@mui/icons-material/Cancel';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import FilterListIcon from '@mui/icons-material/FilterList';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import RestoreIcon from '@mui/icons-material/Restore';

import { usePortfolio } from '../context/PortfolioContext';

type OwnerState = {
    expanded: boolean;
};

const StyledQuickFilter = styled(QuickFilter)({
    display: 'grid',
    alignItems: 'center'
});

const StyledToolbarButton = styled(ToolbarButton)<{ ownerState: OwnerState }>(
    ({ theme, ownerState }) => ({
        gridArea: '1 / 1',
        width: 'min-content',
        height: 'min-content',
        zIndex: 1,
        opacity: ownerState.expanded ? 0 : 1,
        pointerEvents: ownerState.expanded ? 'none' : 'auto',
        transition: theme.transitions.create(['opacity']),
    }),
);

const StyledTextField = styled(TextField)<{
    ownerState: OwnerState;
}>(({ theme, ownerState }) => ({
    gridArea: '1 / 1',
    overflowX: 'clip',
    width: ownerState.expanded ? 260 : 'var(--trigger-width)',
    opacity: ownerState.expanded ? 1 : 0,
    transition: theme.transitions.create(['width', 'opacity']),
}));

const HoldingToolbar: React.FC = () => {
    const {setSelectedAsset, setSelectedSector} = usePortfolio();
    const [exportMenuOpen, setExportMenuOpen] = React.useState(false);
    const exportMenuTriggerRef = React.useRef<HTMLButtonElement>(null);

    const [expanded, setExpanded] = React.useState(false);
    const apiRef = useGridApiContext();

    React.useEffect(() => {
        const rootElement = apiRef.current.rootElementRef.current;

        const handleKeyDown = (event: KeyboardEvent) => {
            if ((event.ctrlKey || event.metaKey) && event.key === 'p') {
                event.preventDefault();
                setExpanded(true);
            }
        };

        rootElement?.addEventListener('keydown', handleKeyDown);
        return () => rootElement?.removeEventListener('keydown', handleKeyDown);
    }, [apiRef]);

    return (
        <Toolbar>
            <Tooltip title="Reset filters">
                <ToolbarButton
                    onClick={() => {
                        apiRef.current.setFilterModel({ items: [] });
                        apiRef.current.setSortModel([]);
                        apiRef.current.setPaginationModel({ page: 0, pageSize: 5 });
                        setSelectedAsset(null);
                        setSelectedSector(null);
                    }}
                >
                    <RestoreIcon fontSize="small" />
                </ToolbarButton>
            </Tooltip>

            <Divider orientation="vertical" variant="middle" flexItem sx={{ mx: 0.5 }} />

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

            <StyledQuickFilter expanded={expanded} onExpandedChange={setExpanded}>
                <QuickFilterTrigger
                    render={(triggerProps) => (
                        <Tooltip title="Search" enterDelay={0}>
                            <StyledToolbarButton
                                {...triggerProps}
                                ownerState={{ expanded }}
                                color="default"
                                disabled={expanded}
                            >
                                <SearchIcon fontSize="small" />
                            </StyledToolbarButton>
                        </Tooltip>
                    )}
                />
                <QuickFilterControl
                    render={({ ref, ...controlProps }, state) => (
                        <StyledTextField
                            {...controlProps}
                            ownerState={{ expanded }}
                            inputRef={ref}
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
                                    endAdornment: state.value ? (
                                        <InputAdornment position="end">
                                            <QuickFilterClear
                                                edge="end"
                                                size="small"
                                                aria-label="Clear search"
                                                material={{ sx: { marginRight: -0.75 } }}
                                            >
                                                <CancelIcon fontSize="small" />
                                            </QuickFilterClear>
                                        </InputAdornment>
                                    ) : null,
                                    ...controlProps.slotProps?.input,
                                },
                                ...controlProps.slotProps,
                            }}
                        />
                    )}
                />
            </StyledQuickFilter>
        </Toolbar>
    );
}

export default React.memo(HoldingToolbar);