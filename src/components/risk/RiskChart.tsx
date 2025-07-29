import { Paper } from "@mui/material";

import DefaultChart from "./DefaultChart";
import { EnrichedHolding } from "../../data/mockData";

interface RiskChartProps {
    holdings: EnrichedHolding[];
}

const RiskChart: React.FC<RiskChartProps> = ({ holdings }) => {
    return (
        <Paper elevation={3} sx={{ padding: 2, width: '100%', minHeight: 420 }}>
            <DefaultChart holdings={holdings}/>
        </Paper>
    );
};

export default RiskChart;
