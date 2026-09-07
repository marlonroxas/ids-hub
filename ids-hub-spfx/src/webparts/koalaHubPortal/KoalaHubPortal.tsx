import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Icon,
  Nav,
} from '@fluentui/react';
import logoUrl from './assets/koala-logo.svg';
import styles from './KoalaHubPortal.module.scss';

export interface KoalaHubPortalProps {
  description: string;
}

type HubView = 'overview' | 'compliance' | 'capability' | 'security' | 'resources' | 'reports' | 'admin';

interface HubRoute {
  path: string;
  view: HubView;
  name: string;
}

interface ActivityItem {
  id: string;
  title: string;
  category: string;
  status: 'Completed' | 'In progress' | 'At risk';
  due: string;
  owner: string;
}

const activities: ActivityItem[] = [
  { id: '1', title: 'Security awareness essentials', category: 'Security', status: 'Completed', due: 'Completed 04 Sep', owner: 'All resources' },
  { id: '2', title: 'Data protection and privacy', category: 'Compliance', status: 'In progress', due: 'Due 18 Sep', owner: 'NAB delivery teams' },
  { id: '3', title: 'Business recovery team readiness', category: 'Capability', status: 'At risk', due: 'Due 22 Sep', owner: 'Recovery leads' },
  { id: '4', title: 'Secure collaboration practices', category: 'Security', status: 'In progress', due: 'Due 30 Sep', owner: 'All resources' },
];

const routes: HubRoute[] = [
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

const getRouteForPath = (path: string): HubRoute => {
  const normalizedPath = path.replace(/\/+$/, '') || '/';
  return routes.find(route => route.path === normalizedPath) || routes[0];
};

const getCurrentPath = (): string => (
  typeof window === 'undefined' ? '/' : window.location.pathname
);

const getRoutePath = (view: HubView): string => routes.find(route => route.view === view)?.path || '/';

const statusClass = (status: ActivityItem['status']): string => {
  if (status === 'Completed') return styles.statusCompleted;
  if (status === 'At risk') return styles.statusRisk;
  return styles.statusProgress;
};

const MetricCard: React.FC<{ label: string; value: string; detail: string; tone?: string }> = ({ label, value, detail, tone = styles.metricBlue }) => (
  <div className={styles.metricCard}>
    <span className={`${styles.metricIcon} ${tone}`} aria-hidden="true"><Icon iconName="BarChartVertical" /></span>
    <div>
      <p className={styles.metricLabel}>{label}</p>
      <strong className={styles.metricValue}>{value}</strong>
      <p className={styles.metricDetail}>{detail}</p>
    </div>
  </div>
);

const ActivityCard: React.FC<{ item: ActivityItem }> = ({ item }) => (
  <article className={styles.activityCard}>
    <div className={styles.activityTopline}>
      <span className={styles.categoryTag}>{item.category}</span>
      <span className={`${styles.statusTag} ${statusClass(item.status)}`}>{item.status}</span>
    </div>
    <h3>{item.title}</h3>
    <p className={styles.activityOwner}>{item.owner}</p>
    <div className={styles.activityFooter}>
      <span>{item.due}</span>
      <button className={styles.textButton} type="button">View details <Icon iconName="ChevronRight" /></button>
    </div>
  </article>
);

export const KoalaHubPortal: React.FC<KoalaHubPortalProps> = ({ description }) => {
  const [activePath, setActivePath] = useState<string>(getCurrentPath);
  const [navCollapsed, setNavCollapsed] = useState(false);
  const [query, setQuery] = useState('');
  const activeRoute = getRouteForPath(activePath);
  const activeView = activeRoute.view;

  const navigate = useCallback((view: HubView): void => {
    const nextPath = getRoutePath(view);
    if (typeof window !== 'undefined' && window.location.pathname !== nextPath) {
      window.history.pushState({}, '', nextPath);
    }
    setActivePath(nextPath);
    setNavCollapsed(false);
  }, []);

  useEffect(() => {
    const handlePopState = (): void => setActivePath(getCurrentPath());
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const filteredActivities = useMemo(
    () => activities.filter(item => item.title.toLowerCase().includes(query.toLowerCase()) || item.category.toLowerCase().includes(query.toLowerCase())),
    [query],
  );

  const activeName = activeRoute.name;

  const renderOverview = (): JSX.Element => (
    <>
      <div className={styles.hero}>
        <div>
          <p className={styles.eyebrow}>KOALA HUB / ONE STOP SHOP</p>
          <h2>Clarity for every capability.</h2>
          <p>Bring resource compliance, capability development, and secure behavior into one focused workspace.</p>
          <div className={styles.heroActions}>
            <button className={styles.primaryButton} type="button" onClick={() => navigate('compliance')}>Review compliance <Icon iconName="ChevronRight" /></button>
            <button className={styles.secondaryButton} type="button" onClick={() => navigate('reports')}>Open insights</button>
          </div>
        </div>
        <div className={styles.heroMark} aria-hidden="true"><span>KOALA</span><i /></div>
      </div>
      <section className={styles.metricGrid} aria-label="Koala Hub summary">
        <MetricCard label="Resource compliance" value="92%" detail="+4% from last month" />
        <MetricCard label="Capability completion" value="78%" detail="14 activities in progress" tone={styles.metricPurple} />
        <MetricCard label="Secure behavior" value="925" detail="Top notch / 1,000" tone={styles.metricRed} />
        <MetricCard label="Actions due" value="6" detail="2 need attention" tone={styles.metricAmber} />
      </section>
      <div className={styles.contentGrid}>
        <section className={styles.panel}>
          <div className={styles.panelHeader}><div><p className={styles.eyebrow}>YOUR WORKSPACE</p><h2>Recommended next actions</h2></div><button className={styles.iconButton} type="button" aria-label="Download action list"><Icon iconName="Download" /></button></div>
          <div className={styles.actionList}>
            <div className={styles.actionItem}><span className={`${styles.actionIcon} ${styles.actionRed}`}><Icon iconName="Shield" /></span><div><strong>Complete secure collaboration practices</strong><p>Due 30 September · Information Security</p></div><Icon iconName="ChevronRight" /></div>
            <div className={styles.actionItem}><span className={`${styles.actionIcon} ${styles.actionPurple}`}><Icon iconName="LearningTools" /></span><div><strong>Continue your capability pathway</strong><p>2 learning activities ready to start</p></div><Icon iconName="ChevronRight" /></div>
            <div className={styles.actionItem}><span className={`${styles.actionIcon} ${styles.actionGreen}`}><Icon iconName="StatusCircleCheckmark" /></span><div><strong>Review your compliance summary</strong><p>All current obligations in one view</p></div><Icon iconName="ChevronRight" /></div>
          </div>
        </section>
        <section className={`${styles.panel} ${styles.scorePanel}`}>
          <div className={styles.panelHeader}><div><p className={styles.eyebrow}>SECURE BEHAVIOR</p><h2>Your score</h2></div><Icon iconName="Shield" className={styles.largeShield} /></div>
          <div className={styles.scoreRow}><strong>925</strong><span>/ 1,000<br /><b>Top notch</b></span></div>
          <div className={styles.progressTrack}><span style={{ width: '92.5%' }} /></div>
          <p className={styles.muted}>Strong secure behavior. Keep building habits that protect our people and clients.</p>
          <button className={styles.textButton} type="button" onClick={() => navigate('security')}>View security insights <Icon iconName="ChevronRight" /></button>
        </section>
      </div>
    </>
  );

  const renderActivityView = (): JSX.Element => (
    <section className={styles.panel}>
      <div className={styles.panelHeader}><div><p className={styles.eyebrow}>RESOURCE COMPLIANCE</p><h2>Activity register</h2></div><button className={styles.primaryButton} type="button">Add activity</button></div>
      <div className={styles.filterBar}><div className={styles.searchBox}><Icon iconName="Search" /><input aria-label="Search activities" placeholder="Search activities or categories" value={query} onChange={event => setQuery(event.target.value)} /></div><button className={styles.filterButton} type="button"><Icon iconName="Filter" /> Filters</button></div>
      <div className={styles.activityGrid}>{filteredActivities.map(item => <ActivityCard item={item} key={item.id} />)}</div>
      {filteredActivities.length === 0 && <p className={styles.emptyState}>No activities match your search.</p>}
    </section>
  );

  const renderSimpleView = (): JSX.Element => (
    <section className={styles.panel}>
      <div className={styles.panelHeader}><div><p className={styles.eyebrow}>{activeName.toUpperCase()}</p><h2>{activeName}</h2></div><Icon iconName={activeView === 'security' ? 'Shield' : 'PieSingleChart'} className={styles.sectionIcon} /></div>
      <div className={styles.insightGrid}>
        <div className={styles.insightCard}><span className={styles.insightNumber}>{activeView === 'security' ? '925' : activeView === 'resources' ? '59' : activeView === 'admin' ? '7' : '14'}</span><strong>{activeView === 'security' ? 'Secure behavior score' : activeView === 'resources' ? 'Active resources' : activeView === 'admin' ? 'Configured areas' : 'Active pathways'}</strong><p>{activeView === 'security' ? 'Top notch performance across current measures.' : activeView === 'resources' ? 'People, teams, and ownership records available to you.' : activeView === 'admin' ? 'Governed configuration areas for portal owners.' : 'Learning journeys available for your role and team.'}</p></div>
        <div className={styles.insightCard}><span className={styles.insightNumber}>{activeView === 'security' ? '3' : activeView === 'resources' ? '10' : activeView === 'admin' ? '3' : '78%'}</span><strong>{activeView === 'security' ? 'Recommended actions' : activeView === 'resources' ? 'Teams represented' : activeView === 'admin' ? 'Integration boundaries' : 'Overall completion'}</strong><p>{activeView === 'security' ? 'Small actions that can strengthen your score.' : activeView === 'resources' ? 'Use the resource view to understand coverage and ownership.' : activeView === 'admin' ? 'Connect approved services without changing the experience.' : 'Progress is measured across required capability areas.'}</p></div>
      </div>
      <div className={styles.callout}><Icon iconName="CompassNW" /><div><strong>Designed for the next step</strong><p>Connect this view to the approved SharePoint, Power BI, and secure behavior services when the integration contracts are ready.</p></div></div>
    </section>
  );

  return (
    <div className={`${styles.portal} ${navCollapsed ? styles.portalCollapsed : ''}`}>
      <header className={styles.header}>
        <button className={styles.menuButton} type="button" aria-label="Toggle navigation" onClick={() => setNavCollapsed(!navCollapsed)}><Icon iconName="CollapseMenu" /></button>
        <img className={styles.logo} src={logoUrl} alt="Koala Hub" />
        <div className={styles.headerTitle}><strong>Koala Hub</strong><span>Resource, capability & security portal</span></div>
        <div className={styles.headerTools}><div className={styles.globalSearch}><Icon iconName="Search" /><input aria-label="Global search" placeholder="Search Koala Hub" /></div><button className={styles.headerIcon} type="button" aria-label="Notifications"><Icon iconName="Ringer" /></button><div className={styles.profile}><span className={styles.avatar}>MR</span><span><strong>Marlon Roxas</strong><small>Portal member</small></span></div></div>
      </header>
      <div className={styles.body}>
        <aside className={styles.sidebar} aria-label="Primary navigation">
          <Nav groups={[{ links: navItems.map(item => ({ key: item.key, name: item.name, icon: item.icon, url: getRoutePath(item.key as HubView), onClick: (event) => { event?.preventDefault(); navigate(item.key as HubView); } })) }]} selectedKey={activeView} />
          <div className={styles.sidebarBottom}><div className={styles.helpCard}><Icon iconName="Help" /><strong>Need help?</strong><span>Visit the Koala guide</span></div><small>iDS Hub · Koala experience</small></div>
        </aside>
        <main className={styles.main}>
          <div className={styles.breadcrumb}><span>Koala Hub</span><Icon iconName="ChevronRight" /><strong>{activeName}</strong></div>
          <div className={styles.pageHeading}><div><h1>{activeName}</h1><p>{description || 'A single workspace for the work that keeps our teams ready.'}</p><span className={styles.srOnly}>iDS Hub Portal</span><span className={styles.srOnly}>Welcome to the iDS Hub</span></div><span className={styles.lastUpdated}><Icon iconName="Refresh" /> Updated today</span></div>
          {activeView === 'overview' && renderOverview()}
          {activeView === 'compliance' && renderActivityView()}
          {(activeView === 'capability' || activeView === 'security' || activeView === 'resources' || activeView === 'reports' || activeView === 'admin') && renderSimpleView()}
        </main>
      </div>
      <footer className={styles.footer}><span>Koala Hub</span><span>Built for clearer, safer delivery</span><span>Powered by iDS Hub</span></footer>
    </div>
  );
};

export default KoalaHubPortal;
