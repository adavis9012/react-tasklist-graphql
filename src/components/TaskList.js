import React from "react";
import {propType} from "graphql-anywhere";
import PropTypes from "prop-types";
import gql from "graphql-tag";

import Task from "./Task";

function TaskList({ task, onSnoozeTask, onPinTask }) {
    const events = {
        onSnoozeTask,
        onPinTask
    };

    return (
        <div className="list-items">
            {task.map(task => <Task key={task.id} task={task} {...events} />)}
        </div>
    );
}

TaskList.fragments = {
    task: gql`
        fragment TaskListTaskFragment on Task {
            id
            updateAt
            ...TaskFragment
        }
        ${Task.fragments.task}
    `
};

TaskList.propTypes = {
    task: PropTypes.arrayOf(propType(Task.fragments.task)).isRequired,
    onSnoozeTask: PropTypes.func,
    onPinTask: PropTypes.func
};

export default TaskList;