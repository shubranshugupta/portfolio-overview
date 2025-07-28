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
    date: string;
    price: number;
}

export interface PortfolioHistoryPrice {
    id: number;
    asset: string;
    history: HistoryPrice[];
}

// Extend for enriched holdings
export interface EnrichedHolding extends PortfolioHolding {
    stockValue: number;
    pnl: number;
}

// Original raw data
export const portfolioHoldings: PortfolioHolding[] = [
    {
        id: 1,
        asset: 'Tata Motors',
        quantity: 100,
        avgBuyPrice: 420.5,
        currentPrice: 445.2,
        sector: 'Automobile',
    },
    {
        id: 2,
        asset: 'Infosys',
        quantity: 50,
        avgBuyPrice: 1000.0,
        currentPrice: 1350.5,
        sector: 'IT',
    },
    {
        id: 3,
        asset: 'Reliance',
        quantity: 30,
        avgBuyPrice: 2803.4,
        currentPrice: 2700,
        sector: 'Energy',
    },
    {
        id: 4,
        asset: 'HDFC Bank',
        quantity: 75,
        avgBuyPrice: 1300,
        currentPrice: 1580,
        sector: 'Banking',
    },
    {
        id: 5,
        asset: 'SBI',
        quantity: 43,
        avgBuyPrice: 792.12,
        currentPrice: 811.02,
        sector: 'Banking',
    },
    {
        id: 6,
        asset: 'ITC',
        quantity: 23,
        avgBuyPrice: 582.3,
        currentPrice: 410.4,
        sector: 'FMCG',
    },
    {
        id: 7,
        asset: 'TCS',
        quantity: 34,
        avgBuyPrice: 3360.32,
        currentPrice: 3419.80,
        sector: 'IT',
    },
    {
        id: 8,
        asset: 'Sun Pharma',
        quantity: 60,
        avgBuyPrice: 1720.43,
        currentPrice: 1676.30,
        sector: 'Pharma',
    },
    {
        id: 9,
        asset: 'Airtel',
        quantity: 66,
        avgBuyPrice: 1997.80,
        currentPrice: 2025.00,
        sector: 'Telecom',
    },
    {
        id: 10,
        asset: 'Hindustan Unilever',
        quantity: 52,
        avgBuyPrice: 1476.30,
        currentPrice: 1700.50,
        sector: 'FMCG',
    },
];

const generatePriceHistory = (
  startPrice: number,
  endPrice: number,
  totalMonths: number
): HistoryPrice[] => {
    const history: HistoryPrice[] = [];
    const date = new Date();
    date.setMonth(date.getMonth() - (totalMonths - 1)); // Set date to the beginning

    // 1. Add the exact start price for the first date
    history.push({
        date: new Date(date).toISOString().slice(0, 10),
        price: startPrice,
    });
    date.setMonth(date.getMonth() + 1); // Move to the next month

    // Define the price boundaries for random generation
    const lowerBound = startPrice * 0.9; // startPrice - 10%
    const upperBound = endPrice * 1.1;   // endPrice + 10%

    // 2. Generate random prices for the intermediate months
    // Loop for totalMonths - 2 because start and end points are handled separately
    for (let i = 0; i < totalMonths - 2; i++) {
        const randomPrice = Math.random() * (upperBound - lowerBound) + lowerBound;
        history.push({
            date: new Date(date).toISOString().slice(0, 10),
            price: parseFloat(randomPrice.toFixed(2)),
        });
        date.setMonth(date.getMonth() + 1); // Move to the next month
    }

    // 3. Add the exact end price for the last date
    history.push({
        date: new Date(date).toISOString().slice(0, 10),
        price: endPrice,
    });

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
