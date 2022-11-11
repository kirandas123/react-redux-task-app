import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Container,
  Fab,
  Grid,
  Stack,
  Typography
} from '@mui/material';

import {
  Add,  
  FormatListBulleted,
  Done,
  RotateLeft
} from '@mui/icons-material';

import {
  addTaskAsync,
  deleteTaskAsync,
  getTasksAsync,
  selectTasks
} from '../../redux/tasksSlice';

import {
  getUsersAsync,
  selectUsers
} from '../../redux/usersSlice';

import TaskCard from '../../components/TaskCard'
import TaskStateCard from '../../components/TaskStateCard'
import TaskModal from '../../components/TaskModal'
import { hasFinished } from '../../helpers/loadingState';
import { STATUS } from '../../constants';

export const TASK_STATES = [
  {
    id: 'to_do',
    title: 'To Do',
    icon: FormatListBulleted,
    iconColor: 'red'
  },
  {
    id: 'in_progress',
    title: 'In Progress',
    icon: RotateLeft,
    iconColor: 'blue'
  },
  {
    id: 'done',
    title: 'Done',
    icon: Done,
    iconColor: 'green'
  }
];

const Tasks = () => {
  const tasks = useSelector(selectTasks);
  const users = useSelector(selectUsers);
  const dispatch = useDispatch();

  const [addModelModalOpen, setAddModelModalOpen] = useState(false);
  const [task, setTask] = useState(null);

  useEffect(() => {
    if (tasks?.fetchStatus === STATUS.UNINIT) {
      dispatch(getTasksAsync())
    }
  }, [tasks?.fetchStatus, dispatch]);

  useEffect(() => {
    if (users?.status === STATUS.UNINIT) {
      dispatch(getUsersAsync())
    }
  }, [users?.status, dispatch]);

  const isLoading = hasFinished(tasks?.fetchStatus) && hasFinished(users?.status);
  if (!isLoading) {
    // TODO: replace with loading spinner or can try implementing skeleton loader based on each status
    return null;
  }

  const addTask = (task) => {
    dispatch(addTaskAsync(task));
    closeAddTaskModal();
  };

  const deleteTask = (taskId) => {
    dispatch(deleteTaskAsync(taskId));
  };

  const viewTask = (task) => {
    setTask(task);
    setAddModelModalOpen(true);
  };

  const openAddTaskModal = () => {
    resetTask();
    setAddModelModalOpen(true);
  };

  const closeAddTaskModal = () => {
    setAddModelModalOpen(false);
  };

  const resetTask = () => {
    setTask(null);
  };

  const taskModalProps = {
    addModelModalOpen,
    closeAddTaskModal,
    addTask,
    users: users?.data ?? [],
    taskStatuses: TASK_STATES,
    task
  };

  return (
    <Container style={{ marginTop: 100 }}>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="stretch"
        spacing={2}
      >
        {
          TASK_STATES.map((taskState) => {
            const taskStateProps = {
              title: taskState?.title,
              icon: taskState?.icon,
              iconColor: taskState?.iconColor
            };

            const tasksForState = tasks?.data?.filter((taskItem) => {
              return taskItem?.status === taskState?.id;
            });

            return (
              <Grid item xs={12} md={4} key={taskState?.id}>
                <TaskStateCard {...taskStateProps}>
                  <Stack spacing={2}>
                    {
                      tasksForState?.length === 0 && (
                        <Typography>No tasks to show...</Typography>
                      )
                    }
                    {
                      tasksForState?.map((taskItem) => {
                        const assignee = users?.data?.find(user => user?.id === taskItem?.assignee);
                        const taskCardProps = {
                          deleteTask,
                          viewTask,
                          task: taskItem,
                          assignee
                        };

                        return (
                          <TaskCard key={taskItem?.id} {...taskCardProps} />
                        );
                      })
                    }
                  </Stack>
                </TaskStateCard>
              </Grid>
            );
          })
        }
      </Grid>

      <Fab onClick={openAddTaskModal} color="primary" aria-label="add" style={{ position: 'fixed', bottom: 16, right: 16 }}>
        <Add />
      </Fab>

      <TaskModal {...taskModalProps} />
    </Container>
  );
};

export default Tasks;
