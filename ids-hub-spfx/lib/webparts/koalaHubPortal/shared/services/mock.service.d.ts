import { Training, ActionItem, SecureBehaviorScore, User } from '../types';
export declare const mockUsers: User[];
export declare const mockTrainingData: Training[];
export declare const mockActionItems: ActionItem[];
export declare const mockSBSScores: SecureBehaviorScore[];
export declare class MockDataService {
    static getUsers(): Promise<User[]>;
    static getTrainingData(): Promise<Training[]>;
    static getActionItems(): Promise<ActionItem[]>;
    static getSBSScores(): Promise<SecureBehaviorScore[]>;
    static getTrainingById(id: string): Promise<Training | null>;
    static getActionItemById(id: string): Promise<ActionItem | null>;
}
export default MockDataService;
