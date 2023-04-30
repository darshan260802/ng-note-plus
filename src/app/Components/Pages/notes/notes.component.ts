import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { TuiAlertService, TuiNotification } from "@taiga-ui/core";
import { NoteService } from "src/app/Shared/note.service";
import { WorkspaceService } from "src/app/Shared/workspace.service";
import { Note, Workspace } from "src/app/models";

@Component({
  selector: "app-notes",
  templateUrl: "./notes.component.html",
  styleUrls: ["./notes.component.scss"],
})
export class NotesComponent implements OnInit {
  notesForm!: FormGroup;
  workspaces!: Workspace[];
  updateForm!: FormGroup;
  showDialog: boolean = false;
  updateIndex: number | null = null;
  isEdit: boolean = false;
  isLoading: boolean = false;
  newLoad: boolean = false;

  notes!: Note[];
  constructor(
    private fb: FormBuilder,
    private wsService: WorkspaceService,
    private noteService: NoteService,
    @Inject(TuiAlertService) private readonly alertService: TuiAlertService
  ) {}

  async ngOnInit(): Promise<void> {
    this.notesForm = this.fb.group({
      title: this.fb.control(""),
      note: this.fb.control(""),
      tag: this.fb.control(""),
      workspace: this.fb.control(""),
    });

    this.updateForm = this.fb.group({
      title: this.fb.control(""),
      note: this.fb.control(""),
      tag: this.fb.control(""),
    });

    (await this.wsService.getWorkspaces()).subscribe((data: Workspace[]) => {
      this.workspaces = data;
      if (!data.length) return;
      this.notesForm.get("workspace")?.setValue(data[0].name);
    });
    
    (await this.noteService.getNotes()).subscribe((data: Note[]) => {
      this.notes = data;
      this.isLoading = false;
      this.newLoad = false;
    });
  }

  handleSubmit(): void {
    const title = this.notesForm.get("title")?.value;
    const note = this.notesForm.get("note")?.value;
    const tag = this.notesForm.get("tag")?.value;
    const workspaceId = this.workspaces.find(
      (it) => it.name === this.notesForm.get("workspace")?.value
    )?.workspaceId;
    if (!this.workspaces?.length) {
      this.alertService
        .open("Workspace Is Required, Please Create one from workspace section! !", {
          label: "Error",
          status: TuiNotification.Error,
          autoClose: 4000,
          hasCloseButton: true,
          hasIcon: true,
        })
        .subscribe();
      return;
    }
    if (!workspaceId) return;

    if (!title?.length) {
      this.alertService
        .open("Note title is required !", {
          label: "Error",
          status: TuiNotification.Error,
          autoClose: 4000,
          hasCloseButton: true,
          hasIcon: true,
        })
        .subscribe();
      return;
    }
    if (!note?.length) {
      this.alertService
        .open("Note can not be empty !", {
          label: "Error",
          status: TuiNotification.Error,
          autoClose: 4000,
          hasCloseButton: true,
          hasIcon: true,
        })
        .subscribe();
      return;
    }
    this.noteService.createNote(title, note, tag.length ? tag : "DEFAULT", workspaceId);
    this.notesForm.setValue({
      title: "",
      note: "",
      tag: "",
      workspace: this.notesForm.get("workspace")?.value,
    });
  }

  getWorkspaceNames(): string[] {
    return this.workspaces.map((item) => item.name);
  }
  getWorkspaceColor(wId: string): string {
    return (
      this.workspaces.find((it) => it.workspaceId === wId)?.bodyColor ?? ""
    );
  }
  getWorkspaceTextColor(wId: string): string {
    return (
      this.workspaces.find((it) => it.workspaceId === wId)?.textColor ?? ""
    );
  }

  setUpdateNote(index: number): void {
    this.updateIndex = index;
    this.isEdit = false;
    this.showDialog = true;
  }

  
  setEdit(index: number): void {
    this.updateForm.setValue({
      title: this.notes[index].title,
      note: this.notes[index].note,
      tag: this.notes[index].tag,
    });
    this.isEdit = true;
  }

  cancelEdit(): void {
    this.updateForm.reset();
    this.isEdit = false;
  }

  deleteNote(): void {
    if (this.updateIndex === null) return;
    const noteId = this.notes[this.updateIndex].noteId;
    this.noteService.deleteNote(noteId as string);
    this.updateForm.reset();
    this.showDialog = false;
  }

  updateNote(): void {
    if (this.updateIndex === null) return;
    const title = this.updateForm.get("title")?.value;
    const note = this.updateForm.get("note")?.value;
    const tag = this.updateForm.get("tag")?.value;
    const noteId = this.notes[this.updateIndex].noteId;

    if (!title?.length) {
      this.alertService
        .open("Note title is required !", {
          label: "Error",
          status: TuiNotification.Error,
          autoClose: 4000,
          hasCloseButton: true,
          hasIcon: true,
        })
        .subscribe();
      return;
    }
    if (!note?.length) {
      this.alertService
        .open("Note can not be empty !", {
          label: "Error",
          status: TuiNotification.Error,
          autoClose: 4000,
          hasCloseButton: true,
          hasIcon: true,
        })
        .subscribe();
      return;
    }
    this.noteService.updateNote(noteId as string, {
      title,
      note,
      tag: tag.length ? tag : "DEFAULT",
    });

    this.isEdit = false;
  }
}
