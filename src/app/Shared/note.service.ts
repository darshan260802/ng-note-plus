import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { Note } from "../models";
import {
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  Firestore,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "@angular/fire/firestore";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class NoteService {
  constructor(private authService: AuthService, private firestore: Firestore) {}

  async createNote(title: string, noteStr:string, tag:string, workspaceId: string): Promise<void> {
    const note: Note = {
      workspaceId,
      userId: this.authService.getUser().uid,
      title,
      note: noteStr,
      tag,
      createdAt: new Date().getTime(),
    };

    await addDoc(collection(this.firestore, "notes"), note);
  }

  async getNotes(): Promise<Observable<Note[]>> {
    const notes = query(
      collection(this.firestore, "notes"),
      where("userId", "==", this.authService.getUser().uid),
      orderBy("createdAt")
    );

    return collectionData(notes, {
      idField: "noteId",
    }) as Observable<Note[]>;
  }

  async deleteNote(noteId:string): Promise<void>{
    const task = doc(this.firestore, 'notes', noteId);
    await deleteDoc(task);
  }
  async deleteNotesForWorkspace(workspaceId:string): Promise<void>{
    const notesQuery = query(collection(this.firestore, 'notes'), where('workspaceId', '==', workspaceId));
    const querySS = await getDocs(notesQuery);
    querySS.forEach(async(doc) => {
      await deleteDoc(doc.ref);
    })
  }
  async updateNote(noteId:string, newValues:{title:string, note:string, tag:string}): Promise<void>{
    const task = doc(this.firestore, 'notes', noteId);
    await updateDoc(task, {...newValues});
  }


}
