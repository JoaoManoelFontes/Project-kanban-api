import { expect, test } from "vitest"
import { InMemoryTaskRepository } from "../../../database/inMemory/inMemoryTaskRepository"
import { createTaskFactory } from "../../factories/createTaskFactory"
import { findTask } from "./findTask"

test("Should find a task", async () => {
    const repository = new InMemoryTaskRepository()

    const createdTask = await repository.create(createTaskFactory())

    const { task } = await findTask({
        taskRepository: repository,
        id: createdTask.id,
    })

    expect(task).toEqual(createdTask)
})

test("Should not find task with inexistent id", async () => {
    const repository = new InMemoryTaskRepository()

    await repository.create(createTaskFactory())

    expect(
        async () =>
            await findTask({
                taskRepository: repository,
                id: "inexistent id",
            })
    ).rejects.toThrowError("Task not found")
})
