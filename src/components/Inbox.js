import React from "react";
import PropTypes from 'prop-types';

import TaskList from '../components/TaskList';
import {propType} from "graphql-anywhere";

function Inbox ({ loading, error, inboxTasks, pinnedTasks, onSnoozeTask, onPinTask}) {
    let title;
    let lists = [];

    const events = {
        onSnoozeTask,
        onPinTask
    };

    if (loading) {
        title = 'Get the task, put in box';
    } else if (error) {
        title = error.toString();
    } else {
        if(pinnedTasks.length === 0 && inboxTasks.length === 0) {
            title = 'No Task';
        } else {
            title = 'Taskbox';

            if(pinnedTasks.length > 0) {
                lists = lists.concat([
                    <h4 className="list-heading" key="pinned-title">Important</h4>,
                    <TaskList key="pinned-tasks" task={pinnedTasks} {...events} />
                ]);
            }

            if(inboxTasks.length > 0) {
                lists = lists.concat([
                    <h4 className="list-heading" key="inbox-title">Tasks</h4>,
                    <TaskList key="inbox-tasks" task={inboxTasks} {...events} />
                ])
            }
        }
    }

    return (
        <div className="page list-show">
            <nav>
                <h3 className="js-edit-list title-page" style={{textAlign: 'center'}}>
                    <span className="title-wrapper">{title}</span>
                </h3>
            </nav>
            {
                lists &&
                <div className="content-scrollable list-items" style={{ paddingTop: '48px'}}>
                    {lists}
                </div>
            }
        </div>
    )
};

Inbox.propTypes = {
    loading: PropTypes.bool,
    error: PropTypes.object,
    inboxTasks: PropTypes.arrayOf(propType(TaskList.fragments.task)),
    pinnedTasks: PropTypes.arrayOf(propType(TaskList.fragments.task)),
    onSnoozeTask: PropTypes.func,
    onPinTask: PropTypes.func
};

export default Inbox;

