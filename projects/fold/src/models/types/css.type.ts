export type CssColor = 'neutral' | 'primary' | 'success' | 'warning' | 'gray';
export type CssColorDistribution = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

export type CssColorClasses = `${CssColor}-${CssColorDistribution}`;
export type CssBgColorClasses = `bg-${CssColorClasses}`;
