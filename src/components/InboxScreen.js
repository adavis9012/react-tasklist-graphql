import {graphql} from "graphql";
import gql from "graphql-tag";

import Inbox from "./Inbox";
import TaskList from "./TaskList";

const withData = graphql(
    gql`
    query  InboxQuery {
        me {
            pinnedTask: tasks(state: TASK_PINNED) {
                ...TaskListTaskFragment
            }
            inboxTasks: tasks(state: TASK_INBOX) {
                ...TaskListTaskFragment
            }
        }
    }
    ${TaskList.fragments.task}
    `,
    {
        options: {
            forceFetch: true,
            pollInterval: 10 * 1000
        },
        props({ data: {loading, error, me}}) {
            if(loading) {
                return {loading};
            }
            if(error) {
                return {error};
            }
            const {pinnedTasks, inboxTasks} = me;
            return {pinnedTasks, inboxTasks};
        }
    }
);

export default withData(Inbox);
