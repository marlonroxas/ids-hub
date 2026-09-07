// Application configuration constants
export const APP_CONFIG = {
    // Feature flags
    features: {
        welcome: true,
        home: true,
        learning: true,
        secureBehavior: false,
        actionCenter: true,
        teamInsights: false,
        reports: false,
        resources: true,
        admin: true,
        notifications: true,
        dataStatus: true,
        roleSwitcher: false,
        koalaCopilot: false,
    },
    // Data sources
    dataSource: 'mock',
    // API endpoints
    api: {
        baseUrl: 'https://api.example.com',
        timeout: 30000,
    },
    // Theme
    theme: {
        primaryColor: '#0078D4',
        secondaryColor: '#50E6FF',
        successColor: '#107C10',
        errorColor: '#E74C3C',
    },
    // Logging
    logging: {
        enabled: true,
        level: 'warn', // 'debug' | 'info' | 'warn' | 'error'
    },
    // Pagination
    pagination: {
        pageSize: 10,
        maxPages: 100,
    },
};
export default APP_CONFIG;
