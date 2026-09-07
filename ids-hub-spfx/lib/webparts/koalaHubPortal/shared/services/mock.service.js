// Mock data repository for development
export const mockUsers = [
    {
        id: '1',
        loginName: 'john.doe',
        displayName: 'John Doe',
        email: 'john.doe@example.com',
        department: 'Engineering',
        role: 'user',
        permissions: ['read', 'comment'],
    },
    {
        id: '2',
        loginName: 'jane.smith',
        displayName: 'Jane Smith',
        email: 'jane.smith@example.com',
        department: 'Security',
        role: 'manager',
        permissions: ['read', 'write', 'approve'],
    },
];
export const mockTrainingData = [
    {
        id: '1',
        title: 'Security Awareness Training 2024',
        description: 'Annual security awareness training for all employees',
        category: 'Security',
        dueDate: new Date('2024-12-31'),
        status: 'In Progress',
        completedBy: 'John Doe',
        score: 85,
        owner: 'security-team',
    },
    {
        id: '2',
        title: 'Data Protection Compliance',
        description: 'GDPR and data protection regulations training',
        category: 'Compliance',
        dueDate: new Date('2024-11-30'),
        status: 'Completed',
        completedBy: 'Jane Smith',
        completionDate: new Date('2024-11-15'),
        score: 92,
        owner: 'compliance-team',
    },
    {
        id: '3',
        title: 'Advanced TypeScript Skills',
        description: 'Level up your TypeScript skills',
        category: 'Skills',
        dueDate: new Date('2024-10-31'),
        status: 'Not Started',
        owner: 'engineering-team',
    },
];
export const mockActionItems = [
    {
        id: '1',
        title: 'Complete Security Training',
        description: 'Complete Q4 security awareness training',
        assignedTo: 'John Doe',
        dueDate: new Date('2024-12-31'),
        priority: 'High',
        status: 'In Progress',
        category: 'Training',
        relatedTraining: '1',
    },
    {
        id: '2',
        title: 'Review Access Permissions',
        description: 'Review and update access permissions for team members',
        assignedTo: 'Jane Smith',
        dueDate: new Date('2024-10-15'),
        priority: 'Critical',
        status: 'Completed',
        category: 'Security',
        completedDate: new Date('2024-10-10'),
    },
];
export const mockSBSScores = [
    {
        id: '1',
        user: 'john.doe@example.com',
        scoreValue: 78,
        scoreDate: new Date(),
        category: 'Security',
        status: 'Healthy',
        lastUpdated: new Date(),
    },
    {
        id: '2',
        user: 'jane.smith@example.com',
        scoreValue: 92,
        scoreDate: new Date(),
        category: 'Security',
        status: 'Healthy',
        lastUpdated: new Date(),
    },
];
// Mock service for returning data
export class MockDataService {
    static getUsers() {
        return Promise.resolve(mockUsers);
    }
    static getTrainingData() {
        return Promise.resolve(mockTrainingData);
    }
    static getActionItems() {
        return Promise.resolve(mockActionItems);
    }
    static getSBSScores() {
        return Promise.resolve(mockSBSScores);
    }
    static getTrainingById(id) {
        return Promise.resolve(mockTrainingData.find(t => t.id === id) || null);
    }
    static getActionItemById(id) {
        return Promise.resolve(mockActionItems.find(a => a.id === id) || null);
    }
}
export default MockDataService;
