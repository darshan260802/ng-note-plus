import { Component, Inject, OnInit } from "@angular/core";
import { Form, FormBuilder, FormGroup } from "@angular/forms";
import { TuiDay } from "@taiga-ui/cdk";
import { TuiAlertService } from "@taiga-ui/core";
import { TuiNotification } from "@taiga-ui/core/enums";
import { TodoService } from "src/app/Shared/todo.service";
import { WorkspaceService } from "src/app/Shared/workspace.service";
import { Todo, Workspace } from "src/app/models";

@Component({
  selector: "app-todos",
  templateUrl: "./todos.component.html",
  styleUrls: ["./todos.component.scss"],
})
export class TodosComponent implements OnInit {
  todosForm!: FormGroup;
  updateForm!: FormGroup;
  today: Date = new Date();
  tuiToday:TuiDay = new TuiDay(this.today.getFullYear(), this.today.getMonth(), this.today.getDate());
  workspaces: Workspace[] = [];
  todos: Todo[] = [];
  showDialog: boolean = false;
  updateIndex: number | null = null;
  isEdit: boolean = false;
  priorities:string[] = ['low', 'medium', 'high']

  constructor(
    private fb: FormBuilder,
    private wsService: WorkspaceService,
    private todoService: TodoService,
    @Inject(TuiAlertService) private readonly alertService: TuiAlertService
  ) {}

  async ngOnInit(): Promise<void> {
    this.todosForm = this.fb.group({
      task: this.fb.control(""),
      deadline: this.fb.control(this.tuiToday),
      priority: this.fb.control("low"),
      workspace: this.fb.control(""),
    });

    

    this.updateForm = this.fb.group({
      task: this.fb.control(""),
      deadline: this.fb.control(""),
      priority: this.fb.control("low"),
    });

    (await this.wsService.getWorkspaces()).subscribe((data: Workspace[]) => {
      this.workspaces = data;
      if (!data.length) return;
      this.todosForm.get("workspace")?.setValue(data[0].name);
    });

    (await this.todoService.getTodos()).subscribe((data: Todo[]) => {
      this.todos = data;
      console.log(data);
      
    });
  }

  handleSubmit(): void {
    const task = this.todosForm.get("task")?.value;
    const {year, month, day} = this.todosForm.get("deadline")?.value;
    const priority = this.todosForm.get("priority")?.value;
    const workspaceId = this.workspaces.find(
      (it) => it.name === this.todosForm.get("workspace")?.value
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

    if (!task?.length) {
      this.alertService
        .open("Task is required !", {
          label: "Error",
          status: TuiNotification.Error,
          autoClose: 4000,
          hasCloseButton: true,
          hasIcon: true,
        })
        .subscribe();
      return;
    }
    
    

    this.todoService.createTodo(
      task,
      new Date(year, month, day).toISOString(),
      priority,
      workspaceId
    );
    this.todosForm.setValue({
      task: "",
      deadline: this.tuiToday,
      priority: "low",
      workspace: this.todosForm.get("workspace")?.value,
    });
  }

  getWorkspaceNames(): string[] {
    return this.workspaces.map((item) => item.name);
  }
  getWorkspaceName(wId:string):string{
    return this.workspaces.find(w => w.workspaceId === wId)?.name ?? '';
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


  setUpdateTodo(index: number): void {
    this.updateIndex = index;
    this.isEdit = false;
    this.showDialog = true;
  }

  setEdit(index: number): void {
    const dt = new Date(this.todos[index].deadline)
    const tuiDate = new TuiDay(dt.getFullYear(), dt.getMonth(), dt.getDate())
    this.updateForm.setValue({
      task: this.todos[index].task,
      deadline: tuiDate,
      priority: this.todos[index].priority,
    });
    this.isEdit = true;
  }

  cancelEdit(): void {
    this.updateForm.reset();
    this.isEdit = false;
  }

  deleteTodo(): void {
    if (this.updateIndex === null) return;
    const todoId = this.todos[this.updateIndex].todoId;
    this.todoService.deleteTodo(todoId as string);
    this.updateForm.reset();
    this.showDialog = false;
  }

  updateTodo(): void {
    if (this.updateIndex === null) return;
    const task = this.updateForm.get("task")?.value;
    const {year, month, day} = this.updateForm.get("deadline")?.value;
    const priority = this.updateForm.get("priority")?.value;
    const todoId = this.todos[this.updateIndex].todoId;

    if (!task?.length) {
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
    
    this.todoService.updateTodo(todoId as string, {
      task,
      deadline: new Date(year, month, day).toISOString(),
      priority
    });

    this.isEdit = false;
  }
}
