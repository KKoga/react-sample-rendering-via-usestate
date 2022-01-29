import React, { useState } from 'react'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

export const TestFC: React.FC<{}> = () => {
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
    setTimeout(f,200)
  }

  console.log("render")
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
      </Box>
    </>
  )
}