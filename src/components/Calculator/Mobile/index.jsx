import React, { useState } from 'react';
import { createStore } from 'redux'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';
import s from './index.module.scss';


const list = {
  group1: [
    { value: 7 },
    { value: 8 },
    { value: 9 }
  ],
  group2: [
    { value: 4 },
    { value: 5 },
    { value: 6 }
  ],
  group3: [
    { value: 1 },
    { value: 2 },
    { value: 3 }
  ],
  group4: [
    { value: 0, width: true }
  ]
}
const PaperComponent = (props) => {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}

const Index = ({ value = 0, onIncrement, onDecrement }) => {
  const title = 'PC'
  const [open, setOpen] = useState(true)
  const [nowValue, setValue] = useState(0)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = () => {
  }

  const handleClick = (val) => {
    if (nowValue === 0) {
      setValue(val)
    } else {
      const newValue = nowValue.toString() + val.toString()
      setValue(newValue)
    }
  }

  const setReslt = () => {

  }

  return (
    <div className={s.content}>
      <span className={s.title}>{title}</span>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open form dialog
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title">
        <div id="draggable-dialog-title" className={s.dialog_content}>
          <div className={s.top}></div>
          <div className={s.value}>
            <span>{nowValue}</span>
          </div>
          <div className={s.group}>
            <div className={`${s.item} ${s.gray}`}>
              <span>AC</span>
            </div>
            <div className={`${s.item} ${s.gray}`}>
              <span>+/-</span>
            </div>
            <div className={`${s.item} ${s.gray}`}>
              <span>%</span>
            </div>
            <div className={`${s.item} ${s.blue}`}>
              <span>÷</span>
            </div>
          </div>
          <div className={s.group}>
            {list.group1.map(item => (
              <div
                key={item.value}
                className={`${s.item} ${s.black}`}
                onClick={() => handleClick(item.value)}>
                <span>{item.value}</span>
              </div>
            ))}
            <div className={`${s.item} ${s.blue}`}>
              <span>x</span>
            </div>
          </div>
          <div className={s.group}>
            {list.group2.map(item => (
              <div
                key={item.value}
                className={`${s.item} ${s.black}`}
                onClick={() => handleClick(item.value)}>
                <span>{item.value}</span>
              </div>
            ))}
            <div className={`${s.item} ${s.blue}`}>
              <span>-</span>
            </div>
          </div>
          <div className={s.group}>
            {list.group3.map(item => (
              <div
                key={item.value}
                className={`${s.item} ${s.black}`}
                onClick={() => handleClick(item.value)}>
                <span>{item.value}</span>
              </div>
            ))}
            <div
              className={`${s.item} ${s.blue}`}
              onClick={() => handleAdd()}>
              <span>+</span>
            </div>
          </div>
          <div className={s.group}>
            {list.group4.map(item => (
              <div
                key={item.value}
                className={`${s.item} ${s.black} ${s.width}`}
                onClick={() => handleClick(item.value)}>
                <span>{item.value}</span>
              </div>
            ))}
            <div className={`${s.item} ${s.black}`}>
              <span>.</span>
            </div>
            <div className={`${s.item} ${s.blue}`} onClick={() => setReslt()}>
              <span>=</span>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  )
}

export default Index