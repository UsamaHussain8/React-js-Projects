import React from "react";

export default function Task({ task, onToggle }) {
    const now = new Date();
    const [hours, minutes] = task.time.split(":").map(Number);
    const taskTime = new Date();
    taskTime.setHours(hours, minutes, 0, 0);

    const isPastDue = !task.completed && now > taskTime;

    return (
        <div
            className={`flex items-center justify-between border px-3 py-2 rounded
                ${ isPastDue ? "bg-red-200" : "bg-white" }`
            }
        >
        <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
        />
        <span
          className={`text-lg ${
            task.completed ? "line-through text-green-600" : "text-gray-800"
          }`}
        >
          {task.text} ({task.time})
        </span>
      </div>
    </div>
  );
}