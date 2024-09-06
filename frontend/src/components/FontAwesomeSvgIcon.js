import * as React from 'react';
import PropTypes from 'prop-types';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons/faEllipsisH';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons/faTrashAlt'; // Import the Delete icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import SvgIcon from '@mui/material/SvgIcon';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

// FontAwesomeSvgIcon component
const FontAwesomeSvgIcon = React.forwardRef((props, ref) => {
  const { icon } = props;

  const {
    icon: [width, height, , , svgPathData],
  } = icon;

  return (
    <SvgIcon ref={ref} viewBox={`0 0 ${width} ${height}`}>
      {typeof svgPathData === 'string' ? (
        <path d={svgPathData} />
      ) : (
        svgPathData.map((d, i) => (
          <path key={i} style={{ opacity: i === 0 ? 0.4 : 1 }} d={d} />
        ))
      )}
    </SvgIcon>
  );
});

FontAwesomeSvgIcon.propTypes = {
  icon: PropTypes.any.isRequired,
};


// Main component
  export default function FontAwesomeSvgIconDemo(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  // Open the popover
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Close the popover
  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  function handleDelete(){
    props.onDelete();
    handleClose();
  }

  return (
    <div>
      <Stack direction="row" spacing={2}>
        <IconButton aria-label="Example" onClick={handleClick}>
          <FontAwesomeSvgIcon icon={faEllipsisH} />
        </IconButton>
      </Stack>

      {/* Popover */}
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <Stack direction="row" spacing={1} padding={1} alignItems="center" sx={{color:"#F5004F"}} onClick={handleDelete}>
          <FontAwesomeSvgIcon icon={faTrashAlt} />
          <Typography>Delete</Typography>
        </Stack>
      </Popover>
    </div>
  );
}
