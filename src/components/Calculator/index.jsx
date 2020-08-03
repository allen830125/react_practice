import React from 'react';
import Mobile from './Mobile';
import PC from './PC';


function App() {
  const checkMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  if (checkMobile) {
    return <Mobile></Mobile>
  }
  return <PC></PC>
}

export default App;
