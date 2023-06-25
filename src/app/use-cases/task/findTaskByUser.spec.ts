import { expect, test } from "vitest"
import { InMemoryTaskRepository } from "../../../database/inMemory/inMemoryTaskRepository"
import { createTaskFactory } from "../../factories/createTaskFactory"
import { findTaskByUser } from "./findTaskByUser"

test("Should find tasks by user", async () => {
    const repository = new InMemoryTaskRepository()

    const task = await repository.create(createTaskFactory())
    const task2 = await repository.create(
        createTaskFactory({
            title: "Task 2",
            userId: task.userId,
        })
    )

    const { tasks } = await findTaskByUser({
        taskRepository: repository,
        userId: task.userId,
    })

    expect(tasks).toEqual([task, task2])
})

test("Should not find tasks with inexistent userId", async () => {
    const repository = new InMemoryTaskRepository()

    await repository.create(createTaskFactory())

    expect(
        async () =>
            await findTaskByUser({
                taskRepository: repository,
                userId: "inexistent id",
            })
    ).rejects.toThrowError("Inexistent user id or tasks not found")
})
