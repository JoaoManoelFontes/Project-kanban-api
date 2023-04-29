import { TaskRepository } from "../../app/repositories/taskRepository";
import { Task } from "../../app/types/taskTypes";

export class InMemoryTaskRepository extends TaskRepository {
  public tasks: Task[] = [];

  async create(task: Task): Promise<Task> {
    this.tasks.push(task);
    return task;
  }

  async update(id: string, task: Partial<Task>): Promise<Task | Error> {
    const index = this.tasks.findIndex((task) => task.id === id);
    if (index === -1) return new Error("Task not found");

    this.tasks[index] = { ...this.tasks[index], ...task };
    return this.tasks[index];
  }

  async delete(id: string): Promise<void | Error> {
    const index = this.tasks.findIndex((task) => task.id === id);
    if (index === -1) {
      return new Error("Task not found");
    } else {
      this.tasks.splice(index, 1);
    }
  }

  async findById(id: string): Promise<Task | Error> {
    return (
      this.tasks.find((task) => task.id === id) || new Error("Task not found")
    );
  }
}
