export declare const APP_CONFIG: {
    features: {
        welcome: boolean;
        home: boolean;
        learning: boolean;
        secureBehavior: boolean;
        actionCenter: boolean;
        teamInsights: boolean;
        reports: boolean;
        resources: boolean;
        admin: boolean;
        notifications: boolean;
        dataStatus: boolean;
        roleSwitcher: boolean;
        koalaCopilot: boolean;
    };
    dataSource: string;
    api: {
        baseUrl: string;
        timeout: number;
    };
    theme: {
        primaryColor: string;
        secondaryColor: string;
        successColor: string;
        errorColor: string;
    };
    logging: {
        enabled: boolean;
        level: string;
    };
    pagination: {
        pageSize: number;
        maxPages: number;
    };
};
export default APP_CONFIG;
