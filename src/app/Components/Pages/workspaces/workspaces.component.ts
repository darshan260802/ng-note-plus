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
  workspaceColor: string = "#22031f";
  workspaceText: string = "#87B38D";
  workspaces: Workspace[] = [];
  colors: { body: string; text: string }[] = [
    {
      text: "#EEA47F",
      body: "#00539C",
    },
    {
      text: "#FBEAEB",
      body: "#2F3C7E",
    },
    {
      text: "#FEE715",
      body: "#101820",
    },
    {
      text: "#FCE77D",
      body: "#F96167",
    },
    {
      text: "#4831D4",
      body: "#CCF381",
    },
    {
      text: "#317773",
      body: "#E2D1F9",
    },
    {
      text: "#FCF6F5",
      body: "#990011",
    },
    {
      text: "#FFFFF",
      body: "#8AAAE5",
    },
    {
      text: "#00FFFF",
      body: "#FF69B4",
    },
    {
      text: "#EE4E34",
      body: "#FCEDDA",
    },
    {
      text: "#00008b",
      body: "#ADD8E6",
    },
    {
      text: "#EA738D",
      body: "#89ABE3",
    },
    {
      text: "#99F443",
      body: "#EC449B",
    },
    {
      text: "#F7C5CC",
      body: "#CC313D",
    },
    {
      text: "#97BC62",
      body: "#2C5F2D",
    },
    {
      text: "#FCF6F5",
      body: "#2BAE66",
    },
    {
      text: "#2C5F2D",
      body: "#FFE77A",
    },
    {
      text: "#FBF8BE",
      body: "#234E70",
    },
  ];
  paletteColors = this.bodyColors;

  get bodyColors(): Map<string, string> {
    return new Map(
      this.colors.map((color: { body: string; text: string }) => [
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
    this.workspaceText =
      this.colors.find(
        (item: { body: string; text: string }) => (item.body = color)
      )?.text ?? "";
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
