import React from 'react'
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar} from '@mui/x-data-grid';

const DataGridComponent = (props) => {
  return (
    <Box sx={{ height: 400, width: '100%' }}>
    <DataGrid
    getRowId={(row) => row.id}
      rows={props.rows}
      columns={props.columns}
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 5,
          },
        },
      }}
      slots={{toolbar: GridToolbar}}
        slotProps={{
          toolbar:{
            showQuickFilter: true,
            quickFilterProps:{debounceMs: 500}
          },
        }}
      pageSizeOptions={[5]}
      checkboxSelection
      disableRowSelectionOnClick
      disableColumnFilter
      disableDensitySelector
      disableColumnSelector
    />
  </Box>
  )
}

export default DataGridComponent