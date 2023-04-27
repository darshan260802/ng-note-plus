import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { Note } from "../models";
import {
  addDoc,
  collection,
  collectionData,
  Firestore,
  orderBy,
  query,
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
}
