import { Box, Tooltip, tooltipClasses } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Information } from 'mdi-material-ui';
import * as React from 'react';

const StyledTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#DDD3FF',
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: '#DDD3FF',
  },
}));

const CustomTooltip = (props) => {
  const { children, ...rest } = props;

  return (
    <Box display="flex">
      {children}
      <StyledTooltip arrow {...rest}>
        <div style={{ width: '100%', height: '45px' }} />
      </StyledTooltip>
    </Box>
  );
};

export default CustomTooltip;
