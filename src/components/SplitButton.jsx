import React , { useEffect , useState , useContext } from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import APIContext from './context/ApiContext';

const options = ['All' , 'Alive', 'Dead', 'unknown'];

export default function SplitButton() {

  const context = useContext(APIContext);
  const bigData = context[0]
  const setLastChangesData = context[2]
  const setX = context[4]

  const [status , setStatus] = useState('All');

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleClick = () => {
    console.info(`You clicked ${options[selectedIndex]}`);
  };

  const handleMenuItemClick = (event,index) => {
    setSelectedIndex(index);
    setOpen(false);
    setStatus(options[index]);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    if(status === 'Alive') {
      const aliveCharacters = bigData.filter((index) => index.status === 'Alive');
      setLastChangesData(aliveCharacters)
      setX(aliveCharacters)
    }else if (status === 'Dead') {
      const deadCharacters = bigData.filter((index) => index.status === 'Dead');
      setLastChangesData(deadCharacters)
      setX(deadCharacters)
    }else if (status === 'unknown') {
      const unknownCharacters = bigData.filter((index) => index.status === 'unknown');
      setLastChangesData(unknownCharacters)
      setX(unknownCharacters)
    }else {
      setLastChangesData(bigData)
      setX(bigData)
    }
  },[status])

  return (
    <React.Fragment>
      <ButtonGroup variant="contained" ref={anchorRef} aria-label="split button" className='!shadow-none !border-2 !border-inherit'>
        <Button onClick={handleClick} className='!font-Urbanist !bg-inherit !border-2 !border-inherit !text-black !text-lg' >{status || options[selectedIndex]}</Button>
        <Button
          className='!bg-inherit !text-black'
          size="large"
          aria-controls={open ? 'split-button-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          onClick={handleToggle}
        >
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      <Popper
        sx={{
          zIndex: 1,
        }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem>
                  {options.map((option , index) => (
                    <MenuItem
                      key={option}
                      selected={index === selectedIndex}
                      onClick={(event) => handleMenuItemClick(event , index)}
                      className='!font-Urbanist !uppercase !text-black hover:!bg-white focus:!bg-ECF0F1'>
                      {option}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </React.Fragment>
  );
}
