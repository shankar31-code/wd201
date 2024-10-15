/* eslint-disable no-undef */
const todoList = require("../todo");

describe("todolist test suite", () => {
  let todos;
  const today = new Date().toISOString().split("T")[0]; // today's date in ISO format

  beforeEach(() => {
    todos = todoList();
  });

  test("should add new todo", () => {
    expect(todos.all.length).toBe(0);
    todos.add({
      title: "test to do",
      completed: false,
      dueDate: today,
    });
    expect(todos.all.length).toBe(1);
  });

  test("should mark a todo as complete", () => {
    todos.add({
      title: "test to do",
      completed: false,
      dueDate: today,
    });
    expect(todos.all[0].completed).toBe(false);
    todos.markAsComplete(0);
    expect(todos.all[0].completed).toBe(true);
  });

  test("should retrieve overdue items", () => {
    todos.add({
      title: "Overdue Todo",
      dueDate: "2024-10-07",
      completed: false,
    });
    // todos.add({ title: "On Time Todo", dueDate: today, completed: false });
    const overdueItems = todos.overdue();
    expect(overdueItems.length).toBe(1);
    expect(overdueItems[0].title).toBe("Overdue Todo");
  });

  test("should retrieve due today items", () => {
    todos.add({ title: "Due Today Todo", dueDate: today, completed: false });
    //todos.add({ title: "Due Later Todo", dueDate: "2024-10-10", completed: false });
    const dueTodayItems = todos.dueToday();
    expect(dueTodayItems.length).toBe(1);
    expect(dueTodayItems[0].title).toBe("Due Today Todo");
  });

  test("should retrieve due later items", () => {
    todos.add({
      title: "Due Later Todo",
      dueDate: "2024-10-20",
      completed: false,
    });
    const dueLaterItems = todos.dueLater();
    expect(dueLaterItems.length).toBe(1);
    expect(dueLaterItems[0].title).toBe("Due Later Todo");
  });

  test("should format the displayable list correctly", () => {
    todos.add({
      title: "Overdue Todo",
      dueDate: "2024-10-07",
      completed: false,
    });
    todos.add({ title: "Due Today Todo", dueDate: today, completed: true });
    todos.add({
      title: "Due Later Todo",
      dueDate: "2024-10-20",
      completed: false,
    });

    const displayList = todos.toDisplayableList(todos.all);
    expect(displayList).toBe(
      "[ ] Overdue Todo 2024-10-07\n[x] Due Today Todo \n[ ] Due Later Todo 2024-10-20",
    );
  });
});
