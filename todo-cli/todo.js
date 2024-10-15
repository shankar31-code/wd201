/* eslint-disable no-undef */
const todoList = () => {
  all = [];
  const add = (todoItem) => {
    all.push(todoItem);
  };
  const markAsComplete = (index) => {
    all[index].completed = true;
  };
  const today = new Date().toISOString().split("T")[0];

  const overdue = () => {
    // Write the date check condition here and return the array
    // of overdue items accordingly.
    const over = [];
    all.forEach((item) => {
      if (item.dueDate < today) {
        over.push(item);
      }
    });
    return over;
  };

  const dueToday = () => {
    // Write the date check condition here and return the array
    // of todo items that are due today accordingly.
    const due = [];
    all.forEach((item) => {
      if (item.dueDate == today) {
        due.push(item);
      }
    });
    return due;
  };

  const dueLater = () => {
    // Write the date check condition here and return the array
    // of todo items that are due later accordingly.
    const later = [];
    all.forEach((item) => {
      if (item.dueDate > today) {
        later.push(item);
      }
    });
    return later;
  };

  const toDisplayableList = (list) => {
    // Format the To-Do list here, and return the output string
    // as per the format given above.

    return list
      .map(
        (item) =>
          `[${item.completed ? "x" : " "}] ${item.title} ${
            item.dueDate === today ? "" : item.dueDate
          }`,
      )
      .join("\n");
  };

  return {
    all,
    add,
    markAsComplete,
    overdue,
    dueToday,
    dueLater,
    toDisplayableList,
  };
};
module.exports = todoList;
