import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { TuiAlertService, TuiNotification } from "@taiga-ui/core";
import { WorkspaceService } from "src/app/Shared/workspace.service";
import { Workspace } from "src/app/models";

@Component({
  selector: "app-workspaces",
  templateUrl: "./workspaces.component.html",
  styleUrls: ["./workspaces.component.scss"],
})
export class WorkspacesComponent implements OnInit {
  workspaceForm!: FormGroup;
  workspaceColor: string = "#ABF902";
  workspaceText: string = "#5002F9";
  workspaces: Workspace[] = [];
  colors: { body: string; text: string }[] = [
    {
        "body": "#ABF902",
        "text": "#5002F9"
    },
    {
        "body": "#5C6CF9",
        "text": "#F9E95C"
    },
    {
        "body": "#4A84EF",
        "text": "#EFB54A"
    },
    {
        "body": "#73B507",
        "text": "#4907B5"
    },
    {
        "body": "#72660C",
        "text": "#0C1872"
    },
    {
        "body": "#193BFC",
        "text": "#FCDA19"
    }
];
  paletteColors = this.bodyColors;

  get bodyColors(): Map<string, string> {
    const shallowCopy = [...this.colors.map(it => ({...it}))]
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
    const index = this.colors.findIndex(it => it.body === color);
    if(index < 0) return;
    this.workspaceText = {...this.colors[index]}.text;   
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
}
