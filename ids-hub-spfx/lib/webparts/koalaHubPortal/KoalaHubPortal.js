import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Icon, Nav, } from '@fluentui/react';
import logoUrl from './assets/koala-logo.svg';
import styles from './KoalaHubPortal.module.scss';
const activities = [
    { id: '1', title: 'Security awareness essentials', category: 'Security', status: 'Completed', due: 'Completed 04 Sep', owner: 'All resources' },
    { id: '2', title: 'Data protection and privacy', category: 'Compliance', status: 'In progress', due: 'Due 18 Sep', owner: 'NAB delivery teams' },
    { id: '3', title: 'Business recovery team readiness', category: 'Capability', status: 'At risk', due: 'Due 22 Sep', owner: 'Recovery leads' },
    { id: '4', title: 'Secure collaboration practices', category: 'Security', status: 'In progress', due: 'Due 30 Sep', owner: 'All resources' },
];
const routes = [
    { path: '/', view: 'overview', name: 'Overview' },
    { path: '/compliance', view: 'compliance', name: 'Resource compliance' },
    { path: '/capability', view: 'capability', name: 'Capability hub' },
    { path: '/security', view: 'security', name: 'Security behavior' },
    { path: '/resources', view: 'resources', name: 'Resources' },
    { path: '/reports', view: 'reports', name: 'Reports & insights' },
    { path: '/admin', view: 'admin', name: 'Administration' },
];
const navItems = routes.map(route => ({
    key: route.view,
    name: route.name,
    icon: route.view === 'overview' ? 'ViewDashboard' : route.view === 'compliance' ? 'ClipboardList' : route.view === 'capability' ? 'LearningTools' : route.view === 'security' ? 'Shield' : route.view === 'resources' ? 'FabricFolder' : route.view === 'reports' ? 'PieSingle' : 'Settings',
}));
const getRouteForPath = (path) => {
    const normalizedPath = path.replace(/\/+$/, '') || '/';
    return routes.find(route => route.path === normalizedPath) || routes[0];
};
const getCurrentPath = () => (typeof window === 'undefined' ? '/' : window.location.pathname);
const getRoutePath = (view) => routes.find(route => route.view === view)?.path || '/';
const statusClass = (status) => {
    if (status === 'Completed')
        return styles.statusCompleted;
    if (status === 'At risk')
        return styles.statusRisk;
    return styles.statusProgress;
};
const MetricCard = ({ label, value, detail, tone = styles.metricBlue }) => (React.createElement("div", { className: styles.metricCard },
    React.createElement("span", { className: `${styles.metricIcon} ${tone}`, "aria-hidden": "true" },
        React.createElement(Icon, { iconName: "BarChartVertical" })),
    React.createElement("div", null,
        React.createElement("p", { className: styles.metricLabel }, label),
        React.createElement("strong", { className: styles.metricValue }, value),
        React.createElement("p", { className: styles.metricDetail }, detail))));
const ActivityCard = ({ item }) => (React.createElement("article", { className: styles.activityCard },
    React.createElement("div", { className: styles.activityTopline },
        React.createElement("span", { className: styles.categoryTag }, item.category),
        React.createElement("span", { className: `${styles.statusTag} ${statusClass(item.status)}` }, item.status)),
    React.createElement("h3", null, item.title),
    React.createElement("p", { className: styles.activityOwner }, item.owner),
    React.createElement("div", { className: styles.activityFooter },
        React.createElement("span", null, item.due),
        React.createElement("button", { className: styles.textButton, type: "button" },
            "View details ",
            React.createElement(Icon, { iconName: "ChevronRight" })))));
export const KoalaHubPortal = ({ description }) => {
    const [activePath, setActivePath] = useState(getCurrentPath);
    const [navCollapsed, setNavCollapsed] = useState(false);
    const [query, setQuery] = useState('');
    const activeRoute = getRouteForPath(activePath);
    const activeView = activeRoute.view;
    const navigate = useCallback((view) => {
        const nextPath = getRoutePath(view);
        if (typeof window !== 'undefined' && window.location.pathname !== nextPath) {
            window.history.pushState({}, '', nextPath);
        }
        setActivePath(nextPath);
        setNavCollapsed(false);
    }, []);
    useEffect(() => {
        const handlePopState = () => setActivePath(getCurrentPath());
        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, []);
    const filteredActivities = useMemo(() => activities.filter(item => item.title.toLowerCase().includes(query.toLowerCase()) || item.category.toLowerCase().includes(query.toLowerCase())), [query]);
    const activeName = activeRoute.name;
    const renderOverview = () => (React.createElement(React.Fragment, null,
        React.createElement("div", { className: styles.hero },
            React.createElement("div", null,
                React.createElement("p", { className: styles.eyebrow }, "KOALA HUB / ONE STOP SHOP"),
                React.createElement("h2", null, "Clarity for every capability."),
                React.createElement("p", null, "Bring resource compliance, capability development, and secure behavior into one focused workspace."),
                React.createElement("div", { className: styles.heroActions },
                    React.createElement("button", { className: styles.primaryButton, type: "button", onClick: () => navigate('compliance') },
                        "Review compliance ",
                        React.createElement(Icon, { iconName: "ChevronRight" })),
                    React.createElement("button", { className: styles.secondaryButton, type: "button", onClick: () => navigate('reports') }, "Open insights"))),
            React.createElement("div", { className: styles.heroMark, "aria-hidden": "true" },
                React.createElement("span", null, "KOALA"),
                React.createElement("i", null))),
        React.createElement("section", { className: styles.metricGrid, "aria-label": "Koala Hub summary" },
            React.createElement(MetricCard, { label: "Resource compliance", value: "92%", detail: "+4% from last month" }),
            React.createElement(MetricCard, { label: "Capability completion", value: "78%", detail: "14 activities in progress", tone: styles.metricPurple }),
            React.createElement(MetricCard, { label: "Secure behavior", value: "925", detail: "Top notch / 1,000", tone: styles.metricRed }),
            React.createElement(MetricCard, { label: "Actions due", value: "6", detail: "2 need attention", tone: styles.metricAmber })),
        React.createElement("div", { className: styles.contentGrid },
            React.createElement("section", { className: styles.panel },
                React.createElement("div", { className: styles.panelHeader },
                    React.createElement("div", null,
                        React.createElement("p", { className: styles.eyebrow }, "YOUR WORKSPACE"),
                        React.createElement("h2", null, "Recommended next actions")),
                    React.createElement("button", { className: styles.iconButton, type: "button", "aria-label": "Download action list" },
                        React.createElement(Icon, { iconName: "Download" }))),
                React.createElement("div", { className: styles.actionList },
                    React.createElement("div", { className: styles.actionItem },
                        React.createElement("span", { className: `${styles.actionIcon} ${styles.actionRed}` },
                            React.createElement(Icon, { iconName: "Shield" })),
                        React.createElement("div", null,
                            React.createElement("strong", null, "Complete secure collaboration practices"),
                            React.createElement("p", null, "Due 30 September \u00B7 Information Security")),
                        React.createElement(Icon, { iconName: "ChevronRight" })),
                    React.createElement("div", { className: styles.actionItem },
                        React.createElement("span", { className: `${styles.actionIcon} ${styles.actionPurple}` },
                            React.createElement(Icon, { iconName: "LearningTools" })),
                        React.createElement("div", null,
                            React.createElement("strong", null, "Continue your capability pathway"),
                            React.createElement("p", null, "2 learning activities ready to start")),
                        React.createElement(Icon, { iconName: "ChevronRight" })),
                    React.createElement("div", { className: styles.actionItem },
                        React.createElement("span", { className: `${styles.actionIcon} ${styles.actionGreen}` },
                            React.createElement(Icon, { iconName: "StatusCircleCheckmark" })),
                        React.createElement("div", null,
                            React.createElement("strong", null, "Review your compliance summary"),
                            React.createElement("p", null, "All current obligations in one view")),
                        React.createElement(Icon, { iconName: "ChevronRight" })))),
            React.createElement("section", { className: `${styles.panel} ${styles.scorePanel}` },
                React.createElement("div", { className: styles.panelHeader },
                    React.createElement("div", null,
                        React.createElement("p", { className: styles.eyebrow }, "SECURE BEHAVIOR"),
                        React.createElement("h2", null, "Your score")),
                    React.createElement(Icon, { iconName: "Shield", className: styles.largeShield })),
                React.createElement("div", { className: styles.scoreRow },
                    React.createElement("strong", null, "925"),
                    React.createElement("span", null,
                        "/ 1,000",
                        React.createElement("br", null),
                        React.createElement("b", null, "Top notch"))),
                React.createElement("div", { className: styles.progressTrack },
                    React.createElement("span", { style: { width: '92.5%' } })),
                React.createElement("p", { className: styles.muted }, "Strong secure behavior. Keep building habits that protect our people and clients."),
                React.createElement("button", { className: styles.textButton, type: "button", onClick: () => navigate('security') },
                    "View security insights ",
                    React.createElement(Icon, { iconName: "ChevronRight" }))))));
    const renderActivityView = () => (React.createElement("section", { className: styles.panel },
        React.createElement("div", { className: styles.panelHeader },
            React.createElement("div", null,
                React.createElement("p", { className: styles.eyebrow }, "RESOURCE COMPLIANCE"),
                React.createElement("h2", null, "Activity register")),
            React.createElement("button", { className: styles.primaryButton, type: "button" }, "Add activity")),
        React.createElement("div", { className: styles.filterBar },
            React.createElement("div", { className: styles.searchBox },
                React.createElement(Icon, { iconName: "Search" }),
                React.createElement("input", { "aria-label": "Search activities", placeholder: "Search activities or categories", value: query, onChange: event => setQuery(event.target.value) })),
            React.createElement("button", { className: styles.filterButton, type: "button" },
                React.createElement(Icon, { iconName: "Filter" }),
                " Filters")),
        React.createElement("div", { className: styles.activityGrid }, filteredActivities.map(item => React.createElement(ActivityCard, { item: item, key: item.id }))),
        filteredActivities.length === 0 && React.createElement("p", { className: styles.emptyState }, "No activities match your search.")));
    const renderSimpleView = () => (React.createElement("section", { className: styles.panel },
        React.createElement("div", { className: styles.panelHeader },
            React.createElement("div", null,
                React.createElement("p", { className: styles.eyebrow }, activeName.toUpperCase()),
                React.createElement("h2", null, activeName)),
            React.createElement(Icon, { iconName: activeView === 'security' ? 'Shield' : 'PieSingleChart', className: styles.sectionIcon })),
        React.createElement("div", { className: styles.insightGrid },
            React.createElement("div", { className: styles.insightCard },
                React.createElement("span", { className: styles.insightNumber }, activeView === 'security' ? '925' : activeView === 'resources' ? '59' : activeView === 'admin' ? '7' : '14'),
                React.createElement("strong", null, activeView === 'security' ? 'Secure behavior score' : activeView === 'resources' ? 'Active resources' : activeView === 'admin' ? 'Configured areas' : 'Active pathways'),
                React.createElement("p", null, activeView === 'security' ? 'Top notch performance across current measures.' : activeView === 'resources' ? 'People, teams, and ownership records available to you.' : activeView === 'admin' ? 'Governed configuration areas for portal owners.' : 'Learning journeys available for your role and team.')),
            React.createElement("div", { className: styles.insightCard },
                React.createElement("span", { className: styles.insightNumber }, activeView === 'security' ? '3' : activeView === 'resources' ? '10' : activeView === 'admin' ? '3' : '78%'),
                React.createElement("strong", null, activeView === 'security' ? 'Recommended actions' : activeView === 'resources' ? 'Teams represented' : activeView === 'admin' ? 'Integration boundaries' : 'Overall completion'),
                React.createElement("p", null, activeView === 'security' ? 'Small actions that can strengthen your score.' : activeView === 'resources' ? 'Use the resource view to understand coverage and ownership.' : activeView === 'admin' ? 'Connect approved services without changing the experience.' : 'Progress is measured across required capability areas.'))),
        React.createElement("div", { className: styles.callout },
            React.createElement(Icon, { iconName: "CompassNW" }),
            React.createElement("div", null,
                React.createElement("strong", null, "Designed for the next step"),
                React.createElement("p", null, "Connect this view to the approved SharePoint, Power BI, and secure behavior services when the integration contracts are ready.")))));
    return (React.createElement("div", { className: `${styles.portal} ${navCollapsed ? styles.portalCollapsed : ''}` },
        React.createElement("header", { className: styles.header },
            React.createElement("button", { className: styles.menuButton, type: "button", "aria-label": "Toggle navigation", onClick: () => setNavCollapsed(!navCollapsed) },
                React.createElement(Icon, { iconName: "CollapseMenu" })),
            React.createElement("img", { className: styles.logo, src: logoUrl, alt: "Koala Hub" }),
            React.createElement("div", { className: styles.headerTitle },
                React.createElement("strong", null, "Koala Hub"),
                React.createElement("span", null, "Resource, capability & security portal")),
            React.createElement("div", { className: styles.headerTools },
                React.createElement("div", { className: styles.globalSearch },
                    React.createElement(Icon, { iconName: "Search" }),
                    React.createElement("input", { "aria-label": "Global search", placeholder: "Search Koala Hub" })),
                React.createElement("button", { className: styles.headerIcon, type: "button", "aria-label": "Notifications" },
                    React.createElement(Icon, { iconName: "Ringer" })),
                React.createElement("div", { className: styles.profile },
                    React.createElement("span", { className: styles.avatar }, "MR"),
                    React.createElement("span", null,
                        React.createElement("strong", null, "Marlon Roxas"),
                        React.createElement("small", null, "Portal member"))))),
        React.createElement("div", { className: styles.body },
            React.createElement("aside", { className: styles.sidebar, "aria-label": "Primary navigation" },
                React.createElement(Nav, { groups: [{ links: navItems.map(item => ({ key: item.key, name: item.name, icon: item.icon, url: getRoutePath(item.key), onClick: (event) => { event?.preventDefault(); navigate(item.key); } })) }], selectedKey: activeView }),
                React.createElement("div", { className: styles.sidebarBottom },
                    React.createElement("div", { className: styles.helpCard },
                        React.createElement(Icon, { iconName: "Help" }),
                        React.createElement("strong", null, "Need help?"),
                        React.createElement("span", null, "Visit the Koala guide")),
                    React.createElement("small", null, "iDS Hub \u00B7 Koala experience"))),
            React.createElement("main", { className: styles.main },
                React.createElement("div", { className: styles.breadcrumb },
                    React.createElement("span", null, "Koala Hub"),
                    React.createElement(Icon, { iconName: "ChevronRight" }),
                    React.createElement("strong", null, activeName)),
                React.createElement("div", { className: styles.pageHeading },
                    React.createElement("div", null,
                        React.createElement("h1", null, activeName),
                        React.createElement("p", null, description || 'A single workspace for the work that keeps our teams ready.'),
                        React.createElement("span", { className: styles.srOnly }, "iDS Hub Portal"),
                        React.createElement("span", { className: styles.srOnly }, "Welcome to the iDS Hub")),
                    React.createElement("span", { className: styles.lastUpdated },
                        React.createElement(Icon, { iconName: "Refresh" }),
                        " Updated today")),
                activeView === 'overview' && renderOverview(),
                activeView === 'compliance' && renderActivityView(),
                (activeView === 'capability' || activeView === 'security' || activeView === 'resources' || activeView === 'reports' || activeView === 'admin') && renderSimpleView())),
        React.createElement("footer", { className: styles.footer },
            React.createElement("span", null, "Koala Hub"),
            React.createElement("span", null, "Built for clearer, safer delivery"),
            React.createElement("span", null, "Powered by iDS Hub"))));
};
export default KoalaHubPortal;
