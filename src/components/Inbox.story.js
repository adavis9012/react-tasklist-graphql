import React from "react";
import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import Inbox from './Inbox';

function buildTask(attrs) {
   return {
       id: Math.round(Math.random() * 1000000).toString(),
       title: 'Test Task',
       subtitle: 'on Test Board',
       url: 'http://test.url',
       updateAt: Date.now(),
       ...attrs
   }
}

const pinnedTasks = [
    buildTask({state: 'TASK_PINNED'}),
    buildTask({state: 'TASK_PINNED'}),
    buildTask({state: 'TASK_PINNED'})
];
const inboxTasks = [
    buildTask({state: 'TASK_INBOX'}),
    buildTask({state: 'TASK_INBOX'}),
    buildTask({state: 'TASK_INBOX'})
];
const onSnoozeTask = action('onSnoozeTask');
const onPinTask = action('onPinTask');
const events = { onSnoozeTask, onPinTask };

storiesOf('Inbox', module)
    .addDecorator(story => <div id="content-container">{story()}</div>)
.add('loading', () => <Inbox loading={true}/>)
.add('error', () => <Inbox error={new Error('Foobar')}/>)
.add('no task', () => <Inbox pinnedTasks={[]} inboxTasks={[]} {...events} />)
.add('no pinned task', () => (
    <Inbox pinnedTasks={[]} {...{inboxTasks, ...events}} />
))
.add('no inbox task', () => (
    <Inbox
        inboxTasks={[]}
        {...{
            pinnedTasks,
            ...events
        }}
    />
))
.add('full', () => (
    <Inbox
        {...{
            pinnedTasks,
            inboxTasks,
            ...events
        }}
    />
));
