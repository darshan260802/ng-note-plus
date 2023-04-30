import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, getDocs, orderBy, query, updateDoc, where } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { Todo } from '../models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private authService: AuthService, private firestore: Firestore) { }

  async createTodo(task: string, deadline:string, priority: 'low' | 'medium' | 'high', workspaceId: string): Promise<void> {
    const todo: Todo = {
      workspaceId,
      userId: this.authService.getUser().uid,
      task,
      deadline,
      priority,
      createdAt: new Date().getTime(),
    };

    await addDoc(collection(this.firestore, "todos"), todo);
  }

  async getTodos(): Promise<Observable<Todo[]>> {
    const todos = query(
      collection(this.firestore, "todos"),
      where("userId", "==", this.authService.getUser().uid),
      orderBy("createdAt")
    );

    return collectionData(todos, {
      idField: "todoId",
    }) as Observable<Todo[]>;
  }

  async deleteTodo(todoId:string): Promise<void>{
    const task = doc(this.firestore, 'todos', todoId);
    await deleteDoc(task);
  }

  async deleteTodosForWorkspace(workspaceId:string): Promise<void>{
    const todosQuery = query(collection(this.firestore, 'todos'), where('workspaceId', '==', workspaceId));
    const querySS = await getDocs(todosQuery);
    querySS.forEach(async(doc) => {
      await deleteDoc(doc.ref);
    })
  }

  async updateTodo(todoId:string, newValues:{task:string, deadline:string, priority:'low'| 'medium' | 'high'}): Promise<void>{
    const task = doc(this.firestore, 'todos', todoId);
    await updateDoc(task, {...newValues});
  }
}
