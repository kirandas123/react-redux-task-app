import * as React from 'react';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import moment from 'moment';

const TaskCard = (prop) => {
  const {
    task,
    deleteTask,
    viewTask,
    assignee
  } = prop;

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="user-avatar">
            {assignee?.firstName?.charAt(0)}
          </Avatar>
        }
        title={task?.title}
        subheader={moment(task?.deadline).format('MMM DD, YYYY hh:mm a')}
      />
      <CardActions disableSpacing>
        <div style={{ marginLeft: 'auto' }}>
            <IconButton aria-label="delete" onClick={() => deleteTask(task?.id)}>
              <DeleteIcon />
            </IconButton>
            <IconButton aria-label="view" onClick={() => viewTask(task)}>
              <VisibilityIcon />
            </IconButton>
        </div>
      </CardActions>
    </Card>
  );
}

TaskCard.propTypes = {
  task: PropTypes.object.isRequired,
  assignee: PropTypes.object.isRequired,
  deleteTask: PropTypes.func.isRequired,
  viewTask: PropTypes.func.isRequired
};

TaskCard.defaultProps = {};

export default TaskCard;
