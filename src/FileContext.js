import React, { createContext, useState, useReducer } from 'react'

const FileContext = createContext({})

const FileProvider = ({ children }) => {
  const [files, setFiles] = useState([])

  const [state, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case 'ADD_FILE':
          return { ...state, files: [...state.files, action.file] }
        case 'REMOVE_FILE':
          return { ...state, files: state.files.reduce(f => f.name !== action.name) }
        case 'FOCUS':
          return {
            ...state,
            focusedFile: action.name
          }
      }
    },
    { files: [], focusedFile: null }
  )

  const exposed = {
    files: state.files,
    addFile: file => dispatch({ type: 'ADD_FILE', file }),
    removeFile: name => dispatch({ type: 'REMOVE_FILE', name }),
    focus: name => dispatch({ type: 'FOCUS', name }),
    focusedFile: state.focusedFile
  }

  return <FileContext.Provider value={exposed}>{children}</FileContext.Provider>
}

export { FileContext, FileProvider }
