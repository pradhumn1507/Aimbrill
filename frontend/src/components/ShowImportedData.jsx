import React from 'react'
import Table from "./Table"
import FileUpload from './FileUpload';
import { Button } from '@mui/material';


const ShowImportedData = ({ open, setOpen, data, addData, handleFileUpload }) => {

    return (
        <div style={{width:'100%', display: 'flex', flexDirection:'column', justifyContent: 'center', alignItems: 'center' }}>
            <FileUpload handleFileUpload={handleFileUpload} />
            {
                open ? (
                    <>
                        <Table tableData={data} />
                        <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', margin:'1rem', width:'100%' }}>
                            <Button variant='contained' color='error' size='small' onClick={() => setOpen(false)}> Cancel </Button>
                            <Button variant='contained' color='success' size='small' onClick={addData}> Save To Database? </Button>
                        </div>
                    </>
                ) : null
            }
        </div>
    )
}

export default ShowImportedData