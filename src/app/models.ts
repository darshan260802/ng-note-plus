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

export interface Note{
    userId:string;
    workspaceId:string;
    title:string;
    tag:string;
    note:string;
    createdAt:number;
    noteId?:string;
}
export interface Todo{
    userId:string;
    workspaceId:string;
    createdAt:number;
    task:string;
    deadline:string;
    priority: 'low' | 'medium' | 'high';
    todoId?:string;
}