import React from "react";
import { storiesOf } from "@storybook/react";
import {action} from "@storybook/addon-actions";
import Task from "./Task";

function buildStory(attrs) {
    const task = {
       id: Math.round(Math.random() * 100000).toString(),
        title: 'Test Task',
        subtitle: 'on Test Board',
        url: 'http://test.ul',
        state: 'TASK_INBOX',
        updateAt: Date.now(),
        ...attrs
    };
    const onPinTask =  action('onPinTask');
    const onSnoozeTask = action('onSnoozeTask');

    return <Task {...{ task, onPinTask, onSnoozeTask}} />
}

storiesOf('Task', module)
    .addDecorator(story => (
        <div className="list-items" style={{background: '#FFFFFF'}}>
            {story()}
        </div>
    ))
    .add('Inbox task', () => buildStory({state: 'TASK_INBOX'}))
    .add('Snoozed task', () => buildStory({state: 'TASK_SNOOZED'}))
    .add('Pinned task', () => buildStory({state: 'TASK_PINNED'}))
    .add('Archived task', () => buildStory({state: 'TASK_ARCHIVED'}));

