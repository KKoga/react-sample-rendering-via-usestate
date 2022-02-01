import React, { useState } from 'react'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { createStore } from 'redux'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

export const TestFC: React.FC<{}> = () => {
  const store = newStore()
  return (
    <Provider store={store}>
      <Child />
    </Provider>
  )
}

const Child: React.FC<{}> = () => {
  const [t1, setT1] = useState<string>("")
  const [t2, setT2] = useState<string>("")

  const f = () => {
    console.log("step1", t1)
    setT1(t1 + "a")
    console.log("step2", t2)
    setT2(t2 + "b")
  }

  const triggerDirect = () => {
    console.log("-----")
    console.log("trigger", t1, t2)
    f()
  }

  const triggerViaSetTimeout = () => {
    console.log("-----")
    console.log("trigger", t1, t2)
    setTimeout(f, 0)
  }

  const z = React.useMemo(() => {
    return <ViaDispatch />
  }, [])

  console.log("render1")
  return (
    <>
      <Box>
        View Console.
      </Box>
      <Box>
        <Button
          sx={{ textTransform: "none", margin: "2px" }}
          variant="contained"
          onClick={triggerDirect}
        >
          Direct
        </Button>
        <Button
          sx={{ textTransform: "none", margin: "2px" }}
          variant="contained"
          onClick={triggerViaSetTimeout}
        >
          ViaSetTimeout
        </Button>
        {z}
      </Box>
    </>
  )
}

// if you use multiple states, should use states container and useDispatch/useSelector
const ViaDispatch: React.FC<{}> = () => {
  const dispatch = useDispatch()
  const {t1, t2} = useSelector(state => state)
  const triggerViaDispatch = () => {
    console.log("-----")
    const action = {
      type: "viadispatch",
      t1: t1 + "a",
      t2: t2 + "b"
    }
    dispatch(action)
  }
  console.log("render2")
  return (
    <>
      <Button
        sx={{ textTransform: "none", margin: "2px" }}
        variant="contained"
        onClick={triggerViaDispatch}
      >
        ViaDispatch
      </Button>
    </>
  )
}

const newStore = () => {
  const reducer = (state, action) => {
    console.log("store-event", "state=", state, "action=", action)
    if (action.type === "viadispatch") {
      return {
         ...state,
         t1: action.t1,
         t2: action.t2,
      }
    }
    console.log("other event", action.type)
    return state
  }
  return createStore(reducer, {t1: "", t2: ""})
}
