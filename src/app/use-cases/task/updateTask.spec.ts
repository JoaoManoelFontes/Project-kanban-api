import { expect, test } from "vitest"
import { InMemoryTaskRepository } from "../../../database/inMemory/inMemoryTaskRepository"
import { updateTask } from "./updateTask"
import { createTaskFactory } from "../../factories/createTaskFactory"

test("Should update task", async () => {
    const repository = new InMemoryTaskRepository()

    const { id } = await repository.create(createTaskFactory())

    const { updatedTask } = await updateTask({
        taskRepository: repository,
        id,
        task: {
            title: "Updated title",
        },
    })

    expect(updatedTask.title).toEqual("Updated title")
})

test("Should not update task with inexistent id", async () => {
    const repository = new InMemoryTaskRepository()

    expect(
        async () =>
            await updateTask({
                taskRepository: repository,
                id: "inexistent id",
                task: {
                    title: "Updated title",
                },
            })
    ).rejects.toThrowError("Task not found")
})

test("Should change markAsMaking to false when update markAsDone to true  ", async () => {
    const repository = new InMemoryTaskRepository()

    const { id } = await repository.create(createTaskFactory())

    const { updatedTask } = await updateTask({
        taskRepository: repository,
        id,
        task: {
            markAsDone: true,
        },
    })

    expect(updatedTask.markAsMaking).toEqual(false)
})
