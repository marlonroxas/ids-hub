import '@testing-library/jest-dom';
// Mock SharePoint context
Object.assign(globalThis, {
    SPFx: {
        context: {
            pageContext: {
                user: {
                    loginName: 'test@example.com',
                    displayName: 'Test User',
                },
            },
        },
    },
});
// Mock window.fetch if needed
if (!globalThis.fetch) {
    globalThis.fetch = jest.fn();
}
