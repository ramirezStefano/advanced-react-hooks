// useDebugValue: useMedia
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'

//this value is used as the second argment for the useDebugValue.
const formatDebugValue = ({query, state}) => `\`${query}\` => ${state}`

function useMedia(query, initialState = false) {
  const [state, setState] = React.useState(initialState)

  //implementing the useDebugValue

  

  //implementing the extra credit 1, using the second argument of the useDebugValue()
  //that works as a formatter. 
  //used when we just want the computation to happen when devtools is open.
  React.useDebugValue({query, state}, formatDebugValue)
/*
when looking at th devtools there is a change after implementing the useDebugValue,
more information is displayed on the width and the status of the hook.
*/


  // 🐨 call React.useDebugValue here.
  // 💰 here's the formatted label I use: `\`${query}\` => ${state}`

  React.useEffect(() => {
    let mounted = true
    const mql = window.matchMedia(query)
    function onChange() {
      if (!mounted) {
        return
      }
      setState(Boolean(mql.matches))
    }

    mql.addListener(onChange)
    setState(mql.matches)

    return () => {
      mounted = false
      mql.removeListener(onChange)
    }
  }, [query])

  return state
}

function Box() {
  const isBig = useMedia('(min-width: 1000px)')
  const isMedium = useMedia('(max-width: 999px) and (min-width: 700px)')
  const isSmall = useMedia('(max-width: 699px)')
  const color = isBig ? 'green' : isMedium ? 'yellow' : isSmall ? 'red' : null

  return <div style={{width: 200, height: 200, backgroundColor: color}} />
}

function App() {
  return <Box />
}

export default App
