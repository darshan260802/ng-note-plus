import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { TuiAlertService, TuiNotification } from "@taiga-ui/core";
import { NoteService } from "src/app/Shared/note.service";
import { TodoService } from "src/app/Shared/todo.service";
import { WorkspaceService } from "src/app/Shared/workspace.service";
import { Workspace } from "src/app/models";

@Component({
  selector: "app-workspaces",
  templateUrl: "./workspaces.component.html",
  styleUrls: ["./workspaces.component.scss"],
})
export class WorkspacesComponent implements OnInit {
  workspaceForm!: FormGroup;
  workspaceColor: string = "#291f9d";
  workspaceText: string = "#f8e058";
  showDialog: boolean = false;
  deleteWorkspace: Workspace | null = null;
  workspaces: Workspace[] = [];
  colors: { body: string; text: string }[] = [
    {
      body: "#291f9d",
      text: "#f8e058",
    },
    {
      body: "#dec3d7",
      text: "#191658",
    },
    {
      body: "#daade0",
      text: "#382a57",
    },
    {
      body: "#bcd6ef",
      text: "#0c148c",
    },
    {
      body: "#91f6c7",
      text: "#1a0771",
    },
    {
      body: "#2d25bb",
      text: "#dac6f9",
    },
    {
      body: "#e29efc",
      text: "#26135d",
    },
    {
      body: "#d3d4f5",
      text: "#2412a7",
    },
    {
      body: "#5dfc5a",
      text: "#2a235d",
    },
    {
      body: "#dbe9b0",
      text: "#1c0285",
    },
    {
      body: "#0219b2",
      text: "#dbceef",
    },
    {
      body: "#c6baf7",
      text: "#18135e",
    },
  ];

  paletteColors = this.bodyColors;

  get bodyColors(): Map<string, string> {
    const shallowCopy = [...this.colors.map((it) => ({ ...it }))];
    return new Map(
      shallowCopy.map((color: { body: string; text: string }) => [
        color.body,
        color.body,
      ])
    );
  }

  constructor(
    private fb: FormBuilder,
    private wsService: WorkspaceService,
    private noteService:NoteService,
    private todoService:TodoService,
    @Inject(TuiAlertService) private readonly alertService: TuiAlertService
  ) {}

  async ngOnInit(): Promise<void> {
    this.workspaceForm = this.fb.group({
      name: this.fb.control(""),
    });

    (await this.wsService.getWorkspaces()).subscribe((data: Workspace[]) => {
      this.workspaces = data;
    });
  }

  updateWorkspaceColor(color: string) {
    this.workspaceColor = color;
    const index = this.colors.findIndex((it) => it.body === color);
    if (index < 0) return;
    this.workspaceText = { ...this.colors[index] }.text;
  }

  handleSubmit() {
    const workspaceName = this.workspaceForm.get("name")?.value;
    if (!workspaceName?.length) {
      this.alertService
        .open("Workspace name is required !", {
          label: "Error",
          status: TuiNotification.Error,
          autoClose: 4000,
          hasCloseButton: true,
          hasIcon: true,
        })
        .subscribe();
      return;
    }

    this.wsService.createWorkspace(
      workspaceName,
      this.workspaceColor,
      this.workspaceText
    );
    this.workspaceForm.reset();
  }

  showDeletePrompt(index: number) {
    const workspace = this.workspaces[index];
    if(!workspace) return;
    this.deleteWorkspace = workspace;
    this.showDialog = true;
  }
  async removeWorkspace():Promise<void>{
    await this.noteService.deleteNotesForWorkspace(this.deleteWorkspace?.workspaceId as string);
    await this.todoService.deleteTodosForWorkspace(this.deleteWorkspace?.workspaceId as string);
    this.wsService.deleteWorkspace(this.deleteWorkspace?.workspaceId as string);
    this.showDialog = false;
    
  }
}
