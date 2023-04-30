import { Injectable } from "@angular/core";
import { addDoc, Firestore, collection, collectionData, DocumentData, query, where, orderBy, doc, deleteDoc } from "@angular/fire/firestore";
import { AuthService } from "./auth.service";
import { Workspace } from "../models";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class WorkspaceService {
  constructor(private authService: AuthService, private firestore: Firestore) {}

  async getWorkspaces():Promise<Observable<Workspace[]>>{
    const workspaces = query(
      collection(this.firestore, 'workspaces'),
      where('userId', '==', this.authService.getUser().uid),
      orderBy('createdAt')
    );

    return collectionData(workspaces, {
      idField: 'workspaceId',
    }) as Observable<Workspace[]>;
  }

  async createWorkspace(
    name: string,
    bodyColor: string,
    textColor: string
  ): Promise<void> {
    const body: Workspace = {
      name,
      createdAt: new Date().getTime(),
      bodyColor,
      textColor,
      userId: this.authService.getUser().uid,
    };
    await addDoc(collection(this.firestore, "workspaces"), body);
  }
  async deleteWorkspace(workspaceId:string): Promise<void>{
    const workspace = doc(this.firestore, 'workspaces', workspaceId);
    await deleteDoc(workspace);
  }
}
