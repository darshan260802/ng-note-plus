export interface AuthUser{
    name?: string;
    email: string;
    password: string;
}

export interface Workspace{
    name: string;
    createdAt: number;
    bodyColor:string;
    textColor: string;
    userId: string;
    workspaceId?: string;
}