import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TablePagination, Typography } from '@mui/material';

const ShowFetchData = ({ tableData }) => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const tableColumns = [
        { label: 'ID', field: 'employeeID' },
        { label: 'First Name', field: 'firstName' },
        { label: 'Last Name', field: 'lastName' },
        { label: 'Date Of Birth', field: 'dateOfBirth' },
        { label: 'Role', field: 'role' },
    ];

    // Calculate the start and end index based on the current page and rows per page
    const startIndex = page * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;

    // Get the data to be rendered based on the current page and rows per page
    const displayedData = tableData.slice(startIndex, endIndex);

    return (
        <>
            {
                tableData && tableData.length > 0 ?
                    (<TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    {tableColumns?.map((item, index) => (
                                        <TableCell key={index}>{item.label}</TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {displayedData?.map((row, rowIndex) => (
                                    <TableRow key={rowIndex}>
                                        <TableCell>{row.employeeID}</TableCell>
                                        <TableCell>{row.firstName}</TableCell>
                                        <TableCell>{row.lastName}</TableCell>
                                        <TableCell>{row.dateOfBirth.slice(0, 15)}</TableCell>
                                        <TableCell>{row.role}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={tableData?.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </TableContainer>) : (<Typography>No Data Found in Database</Typography>)
            }
        </>
    )
}

export default ShowFetchData