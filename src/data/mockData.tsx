// Define the structure of each portfolio item
export interface PortfolioHolding {
    id: number;
    asset: string;
    quantity: number;
    avgBuyPrice: number;
    currentPrice: number;
    sector: string;
}

export interface HistoryPrice {
    date: string[];
    price: number[];
}

export interface PortfolioHistoryPrice {
    id: number;
    asset: string;
    history: HistoryPrice;
}

// Extend for enriched holdings
export interface EnrichedHolding extends PortfolioHolding {
    stockValue: number;
    pnl: number;
}

// Original raw data
export const portfolioHoldings: PortfolioHolding[] = [
    { id: 1, asset: 'Tata Motors', quantity: 100, avgBuyPrice: 420.5, currentPrice: 445.2, sector: 'Automobile' },
    { id: 2, asset: 'Infosys', quantity: 50, avgBuyPrice: 1000.0, currentPrice: 1350.5, sector: 'IT' },
    { id: 3, asset: 'Reliance', quantity: 30, avgBuyPrice: 2803.4, currentPrice: 2700, sector: 'Energy' },
    { id: 4, asset: 'HDFC Bank', quantity: 75, avgBuyPrice: 1300, currentPrice: 1580, sector: 'Banking' },
    { id: 5, asset: 'SBI', quantity: 43, avgBuyPrice: 792.12, currentPrice: 811.02, sector: 'Banking' },
    { id: 6, asset: 'ITC', quantity: 23, avgBuyPrice: 582.3, currentPrice: 410.4, sector: 'FMCG' },
    { id: 7, asset: 'TCS', quantity: 34, avgBuyPrice: 3360.32, currentPrice: 3419.80, sector: 'IT' },
    { id: 8, asset: 'Sun Pharma', quantity: 60, avgBuyPrice: 1720.43, currentPrice: 1676.30, sector: 'Pharma' },
    { id: 9, asset: 'Airtel', quantity: 66, avgBuyPrice: 1997.80, currentPrice: 2025.00, sector: 'Telecom' },
    { id: 10, asset: 'Hindustan Unilever', quantity: 52, avgBuyPrice: 1476.30, currentPrice: 1700.50, sector: 'FMCG' },
    { id: 11, asset: 'L&T', quantity: 20, avgBuyPrice: 3500.0, currentPrice: 3580.0, sector: 'Capital Goods' },
    { id: 12, asset: 'ICICI Bank', quantity: 80, avgBuyPrice: 1100.0, currentPrice: 1150.75, sector: 'Banking' },
    { id: 13, asset: 'Asian Paints', quantity: 30, avgBuyPrice: 2900.0, currentPrice: 2850.2, sector: 'Chemicals' },
    { id: 14, asset: 'Maruti Suzuki', quantity: 10, avgBuyPrice: 12500.0, currentPrice: 12800.0, sector: 'Automobile' },
    { id: 15, asset: 'Wipro', quantity: 150, avgBuyPrice: 480.0, currentPrice: 475.5, sector: 'IT' },
    { id: 16, asset: 'Bajaj Finance', quantity: 15, avgBuyPrice: 7000.0, currentPrice: 7120.0, sector: 'Financial Services' },
    { id: 17, asset: 'Cipla', quantity: 50, avgBuyPrice: 1500.0, currentPrice: 1545.0, sector: 'Pharma' },
    { id: 18, asset: 'Tata Steel', quantity: 300, avgBuyPrice: 170.0, currentPrice: 180.25, sector: 'Metals' },
    { id: 19, asset: 'Titan Company', quantity: 25, avgBuyPrice: 3400.0, currentPrice: 3350.0, sector: 'Consumer Durables' },
    { id: 20, asset: 'Adani Ports', quantity: 60, avgBuyPrice: 1350.0, currentPrice: 1380.0, sector: 'Infrastructure' },
    { id: 21, asset: 'Mahindra & Mahindra', quantity: 35, avgBuyPrice: 2800.0, currentPrice: 2910.0, sector: 'Automobile' },
    { id: 22, asset: 'HCL Technologies', quantity: 55, avgBuyPrice: 1400.0, currentPrice: 1440.0, sector: 'IT' },
    { id: 23, asset: 'Nestle India', quantity: 40, avgBuyPrice: 2500.0, currentPrice: 2550.0, sector: 'FMCG' },
    { id: 24, asset: 'NTPC', quantity: 200, avgBuyPrice: 360.0, currentPrice: 375.0, sector: 'Power' },
    { id: 25, asset: 'JSW Steel', quantity: 100, avgBuyPrice: 900.0, currentPrice: 925.0, sector: 'Metals' },
    { id: 26, asset: 'Dr. Reddy\'s Labs', quantity: 18, avgBuyPrice: 6200.0, currentPrice: 6250.0, sector: 'Pharma' },
    { id: 27, asset: 'Britannia Industries', quantity: 22, avgBuyPrice: 5300.0, currentPrice: 5280.0, sector: 'FMCG' },
    { id: 28, asset: 'Axis Bank', quantity: 70, avgBuyPrice: 1200.0, currentPrice: 1230.0, sector: 'Banking' },
    { id: 29, asset: 'Adani Enterprises', quantity: 28, avgBuyPrice: 3100.0, currentPrice: 3150.0, sector: 'Conglomerate' },
    { id: 30, asset: 'Kotak Mahindra Bank', quantity: 45, avgBuyPrice: 1700.0, currentPrice: 1680.0, sector: 'Banking' },
    { id: 31, asset: 'Tech Mahindra', quantity: 60, avgBuyPrice: 1300.0, currentPrice: 1350.0, sector: 'IT' },
    { id: 32, asset: 'Bajaj Auto', quantity: 12, avgBuyPrice: 9500.0, currentPrice: 9620.0, sector: 'Automobile' },
    { id: 33, asset: 'IndusInd Bank', quantity: 50, avgBuyPrice: 1500.0, currentPrice: 1480.0, sector: 'Banking' },
    { id: 34, asset: 'Dabur India', quantity: 120, avgBuyPrice: 600.0, currentPrice: 615.0, sector: 'FMCG' },
    { id: 35, asset: "Divi's Laboratories", quantity: 20, avgBuyPrice: 4500.0, currentPrice: 4590.0, sector: 'Pharma' },
    { id: 36, asset: 'ONGC', quantity: 250, avgBuyPrice: 270.0, currentPrice: 265.0, sector: 'Energy' },
    { id: 37, asset: 'Hindalco Industries', quantity: 100, avgBuyPrice: 680.0, currentPrice: 695.0, sector: 'Metals' },
    { id: 38, asset: 'HDFC AMC', quantity: 25, avgBuyPrice: 3900.0, currentPrice: 4010.0, sector: 'Financial Services' },
    { id: 39, asset: 'GMR Airports', quantity: 500, avgBuyPrice: 95.0, currentPrice: 98.5, sector: 'Infrastructure' },
    { id: 40, asset: 'LTIMindtree', quantity: 18, avgBuyPrice: 5100.0, currentPrice: 5050.0, sector: 'IT' },
];

const generatePriceHistory = (
    startPrice: number,
    endPrice: number,
    totalMonths: number
): HistoryPrice => {
    const history: HistoryPrice = { date: [], price: [] };
    const date = new Date();
    date.setMonth(date.getMonth() - (totalMonths - 1)); // Set date to the beginning

    // 1. Add the exact start price for the first date
    history.date.push(new Date(date).toISOString().slice(0, 10));
    history.price.push(startPrice);
    date.setMonth(date.getMonth() + 1); // Move to the next month

    // Define the price boundaries for random generation
    const lowerBound = startPrice * 0.95; // startPrice - 5%
    const upperBound = endPrice * 1.05;   // endPrice + 5%

    // 2. Generate random prices for the intermediate months
    // Loop for totalMonths - 2 because start and end points are handled separately
    for (let i = 0; i < totalMonths - 2; i++) {
        const randomPrice = Math.random() * (upperBound - lowerBound) + lowerBound;
        history.date.push(new Date(date).toISOString().slice(0, 10));
        history.price.push(parseFloat(randomPrice.toFixed(2)));
        date.setMonth(date.getMonth() + 1); // Move to the next month
    }

    // 3. Add the exact end price for the last date
    history.date.push(new Date(date).toISOString().slice(0, 10));
    history.price.push(endPrice);

    return history;
};

export const portfolioHoldingHistoryPrice: PortfolioHistoryPrice[] = portfolioHoldings.map((holding) => {
    return {
        id: holding.id,
        asset: holding.asset,
        history: generatePriceHistory(holding.avgBuyPrice, holding.currentPrice, 24),
    };
});

// Add calculated fields (stockValue, pnl)
export const enrichedHoldings: EnrichedHolding[] = portfolioHoldings.map((row) => {
    const stockValue = row.currentPrice * row.quantity;
    const pnl = (row.currentPrice - row.avgBuyPrice) * row.quantity;
    return { ...row, stockValue, pnl };
});

export const valueFormatter = (param: { value: number } | number | string | null | undefined): string => {
    const formatter = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
    });

    if (param === undefined || param === null) {
        return 'N/A';
    } else if (typeof param === 'number') {
        return formatter.format(param);
    } else if (typeof param === 'string' && !isNaN(Number(param))) {
        formatter.format(parseFloat(param));
    } else if (typeof param === 'object') {
        return formatter.format(param.value);
    }
    return 'N/A';
};
