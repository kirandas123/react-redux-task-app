import React from 'react';
import PropTypes from 'prop-types';

import { styled, useTheme } from '@mui/material/styles';
import {
  Card,
  IconButton,
  CardHeader,
  Collapse,
  Avatar,
  CardContent,
  useMediaQuery
} from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const TaskStateCard = (props) => {
  const {
    title,
    icon: IconComponent,
    iconColor,
    children
  } = props;
  const theme = useTheme();
  const nonMobileScreen = useMediaQuery(theme.breakpoints.up('md'));
  const [expanded, setExpanded] = React.useState(nonMobileScreen);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const getAvatar = (icon) => {
    if (icon) {
      return (
        <Avatar sx={{ bgcolor: iconColor }} aria-label="task-state-icon">
          <IconComponent />
        </Avatar>
      );
    }

    return null;
  };

  return (
    <Card variant="outlined" style={{ padding: '20px', height: nonMobileScreen ? '100%' : 'auto', background: '#f4f5f7'  }}>
        <CardHeader
            avatar={getAvatar(IconComponent)}
            title={title}
            action={
                !nonMobileScreen
                ? (
                  <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                  >
                    <ExpandMoreIcon />
                  </ExpandMore>
                )
                : null
            }
        />

        <Collapse in={expanded || nonMobileScreen} timeout="auto" unmountOnExit>
            <CardContent>
                {children}
            </CardContent>
        </Collapse>
    </Card>
  );
};

TaskStateCard.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
  icon: PropTypes.object,
  iconColor: PropTypes.node
};

TaskStateCard.defaultProps = {
  children: null,
  icon: null,
  iconColor: ''
};

export default TaskStateCard;
