import React from 'react'
import { Typography, Button } from '@mui/material';


const FileUpload = ({ handleFileUpload }) => {

  return (
    <div className='borderDiv'>
      <>
        <input
          accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          style={{ display: 'none' }}
          id="raised-button-file"
          multiple
          type="file"
          onChange={handleFileUpload}
        />
        <label htmlFor="raised-button-file">
          <Button
            size="small"
            variant="contained"
            color="error"
            sx={{
              color: 'black',
              backgroundColor: 'mediumslateblue',
              borderRadius: '5px',
              padding: '5px 12px',
              margin: '1rem',
            }}
            component="span"
          >
            Upload File
          </Button>
        </label>
      </>
      <Typography>You are allowed to upload excel file.</Typography>
    </div>
  )
}

export default FileUpload