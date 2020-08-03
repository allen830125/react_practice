import React, { useState } from 'react';
import Draggable from 'react-draggable';
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Paper from '@material-ui/core/Paper';
import * as actionCreators from '../../../actions/calculatora';
import s from './index.module.scss';
import { handleAction } from 'redux-actions';


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

const Index = ({ value, action, setData }) => {
  const title = 'PC'
  const [open, setOpen] = useState(true)
  const [nowValue, setValue] = useState(0)
  const [isSecond, setSecond] = useState(false)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAction = (newValue, action) => {
    setData({ value: newValue, action })
    setSecond(true)
    setValue(newValue)
  }

  const handleInit = () => {
    setData({ value: 0, action: '' })
    setValue(0)
  }

  const handleCalc = (type) => {
    const lib = {
      add: +value + +nowValue,
      minu: +value - +nowValue,
      mult: +value * +nowValue,
      divi: +value / +nowValue
    }
    if (action !== 'result') {
      let newValue = +nowValue
      if (value !== 0) {
        newValue = lib[type];
      }
      handleAction(newValue, type)
    } else {
      setData({ action: type })
    }
  }

  const handleClick = (val) => {
    if (nowValue === 0 && val === '.') {
      setValue('0.')
      setSecond(false)
    } else if (nowValue === 0 || isSecond) {
      setValue(val)
      setSecond(false)
    } else {
      const newValue = nowValue.toString() + val.toString()
      setValue(newValue)
    }
  }

  const getReslt = () => {
    const lib = {
      add: +value + +nowValue,
      minu: +value - +nowValue,
      mult: +value * +nowValue,
      divi: +value / +nowValue
    }
    const newValue = lib[action] || nowValue
    setData({ value: newValue, action: 'result' })
    setSecond(true)
    setValue(newValue)
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
            <div className={`${s.item} ${s.gray}`} onClick={() => handleInit()}>
              <span>AC</span>
            </div>
            <div className={`${s.item} ${s.gray}`}>
              <span>+/-</span>
            </div>
            <div className={`${s.item} ${s.gray}`}>
              <span>%</span>
            </div>
            <div className={`${s.item} ${s.blue}`} onClick={() => handleCalc('divi')}>
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
            <div className={`${s.item} ${s.blue}`} onClick={() => handleCalc('mult')}>
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
            <div className={`${s.item} ${s.blue}`} onClick={() => handleCalc('minu')}>
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
            <div className={`${s.item} ${s.blue}`} onClick={() => handleCalc('add')}>
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
            <div className={`${s.item} ${s.black}`} onClick={() => handleClick('.')}>
              <span>.</span>
            </div>
            <div className={`${s.item} ${s.blue}`} onClick={() => getReslt()}>
              <span>=</span>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  )
}

const mapStateToProps = store => ({
  value: store.calculator.value,
  action: store.calculator.action
});

export default connect(mapStateToProps, actionCreators)(Index);