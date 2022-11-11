import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  useMediaQuery,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';
import { useTheme } from '@mui/material/styles';


const initialFormState = (task) => ({
    title: task?.title ?? '',
    description: task?.description ?? '',
    assignee: task?.assignee ?? '',
    status: task?.status ?? '',
    deadline: task?.deadline ? dayjs(task?.deadline) : dayjs(new Date()),
    formErrors: {
        title: '',
        description: '',
        assignee: '',
        deadline: '',
        status: '',
    }
});

const TaskModal = (props) => {
  const {
    addModelModalOpen,
    closeAddTaskModal,
    addTask,
    users = [],
    task,
    taskStatuses
  } = props;

  const theme = useTheme();
  const nonMobileScreen = useMediaQuery(theme.breakpoints.up('md'));

  const [formFields, setFormFields] = useState({ ...initialFormState(task) });

  useEffect(() => {
    if (task?.id) {
        setFormFields(initialFormState(task))
    } else {
        setFormFields(initialFormState())
    }
  }, [task?.id, task]);

  const validateFormFields = () => {
    let hasError = false;
    let newFormFields = { ...formFields };

    if (newFormFields?.title?.length > 0) {
        newFormFields = {
            ...newFormFields,
            formErrors: {
                ...newFormFields?.formErrors,
                title: ''
            }
        };
    } else {
        hasError = true;
        newFormFields = {
            ...newFormFields,
            formErrors: {
                ...newFormFields?.formErrors,
                title: 'Title is required'
            }
        };
    }

    if (formFields?.description?.length > 0) {
        newFormFields = {
            ...newFormFields,
            formErrors: {
                ...newFormFields?.formErrors,
                description: ''
            }
        };
    } else {
        hasError = true;
        newFormFields = {
            ...newFormFields,
            formErrors: {
                ...newFormFields?.formErrors,
                description: 'Description is required'
            }
        };
    }

    if (newFormFields?.assignee?.length > 0) {
        newFormFields = {
            ...newFormFields,
            formErrors: {
                ...newFormFields?.formErrors,
                assignee: ''
            }
        };
    } else {
        hasError = true;
        newFormFields = {
            ...newFormFields,
            formErrors: {
                ...newFormFields?.formErrors,
                assignee: 'Assignee is required'
            }
        };
    }

    if (newFormFields?.status?.length > 0) {
        newFormFields = {
            ...newFormFields,
            formErrors: {
                ...newFormFields?.formErrors,
                status: ''
            }
        };
    } else {
        hasError = true;
        newFormFields = {
            ...newFormFields,
            formErrors: {
                ...newFormFields?.formErrors,
                status: 'Status is required'
            }
        };
    }

    if (newFormFields?.deadline?.isValid()) {
        newFormFields = {
            ...newFormFields,
            formErrors: {
                ...newFormFields?.formErrors,
                deadline: ''
            }
        };
    } else {
        hasError = true;
        newFormFields = {
            ...newFormFields,
            formErrors: {
                ...newFormFields?.formErrors,
                deadline: 'Invalid date'
            }
        };
    }

    return { hasError, newFormFields };
  };

  const handleFormFieldChange = (e) => {
    setFormFields({
        ...formFields,
        [e?.target?.name]: e?.target?.value
    });
  };

  const handleDatePickerChange = (value) => {
    setFormFields({
        ...formFields,
        deadline: value
    });
  };

  const validateAndAdd = () => {
    const { hasError, newFormFields } = validateFormFields();

    if (!hasError) {
        // add task here
        addTask({
            title: newFormFields?.title,
            description: newFormFields?.description,
            assignee: newFormFields?.assignee,
            status: newFormFields?.status,
            deadline: newFormFields?.deadline?.format('L')
        });
        setFormFields(initialFormState())
    } else {
        setFormFields(newFormFields);
    }
  };
  

  const readOnly = !!task?.id;

  return (
    <Dialog open={addModelModalOpen} disableEscapeKeyDown keepMounted={false}>
      <DialogTitle>Add Task</DialogTitle>
      <DialogContent>
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { mb: 1, width: nonMobileScreen ? '50ch' : '30ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <div>
                <TextField
                    InputProps={{ readOnly }}
                    id="title-field"
                    label="Title"
                    name="title"
                    required
                    value={formFields?.title}
                    onChange={handleFormFieldChange}
                    error={formFields?.formErrors?.title?.length > 0}
                />
            </div>
            <div>
                <TextField
                    InputProps={{ readOnly }}
                    id="description-field"
                    label="Description"
                    name="description"
                    multiline
                    rows={8}
                    required
                    value={formFields?.description}
                    onChange={handleFormFieldChange}
                    error={formFields?.formErrors?.description?.length > 0}
                />
            </div>
            <div>
                <FormControl
                    sx={{ mb: 2, mt: 1 }}
                    fullWidth
                    error={formFields?.formErrors?.assignee?.length > 0}
                >
                    <InputLabel id="assignee-select-label">Assignee</InputLabel>
                    <Select
                        inputProps={{ readOnly }}
                        labelId="assignee-select-label"
                        id="assignee-select"
                        value={formFields?.assignee}
                        label="Assignee"
                        name="assignee"
                        required
                        onChange={handleFormFieldChange}
                    >
                        {
                            users.map((user) => {
                                const userName = `${user?.firstName} ${user?.lastName}`;
                                return (
                                    <MenuItem key={user?.id} value={user?.id}>{userName}</MenuItem>
                                );
                            })
                        }
                    </Select>
                </FormControl>
            </div>

            <div>
                <FormControl
                    sx={{ mb: 2, mt: 1 }}
                    fullWidth
                    error={formFields?.formErrors?.status?.length > 0}
                >
                    <InputLabel id="status-select-label">Status</InputLabel>
                    <Select
                        inputProps={{ readOnly }}
                        labelId="status-select-label"
                        id="status-select"
                        value={formFields?.status}
                        label="Status"
                        name="status"
                        required
                        onChange={handleFormFieldChange}
                    >
                        {
                            taskStatuses.map((taskStatus) => {
                                return (
                                    <MenuItem key={taskStatus?.id} value={taskStatus?.id}>{taskStatus?.title}</MenuItem>
                                );
                            })
                        }
                    </Select>
                </FormControl>
            </div>

            <div>
                <DateTimePicker
                    readOnly={readOnly}
                    label="Deadline"
                    value={formFields?.deadline}
                    name="deadline"
                    onChange={handleDatePickerChange}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            error={formFields?.formErrors?.deadline?.length > 0}
                        />
                    )}
                />
            </div>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeAddTaskModal}>Cancel</Button>
        {
            !readOnly && (
              <Button onClick={validateAndAdd}>Add</Button>
            )
        }
      </DialogActions>
    </Dialog>
  );
};

TaskModal.propTypes = {
    addModelModalOpen: PropTypes.bool,
    closeAddTaskModal: PropTypes.func.isRequired,
    addTask: PropTypes.func.isRequired,
    users: PropTypes.array.isRequired,
    taskStatuses: PropTypes.array.isRequired
};

TaskModal.defaultProps = {
    addModelModalOpen: false
};

export default TaskModal;
