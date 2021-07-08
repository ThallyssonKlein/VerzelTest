import { DataGrid } from '@material-ui/data-grid';

export default function ModulesTable({modules, setSelection}){    
    return <DataGrid rows={modules}
                     columns={[
                        {
                            field : 'id',
                            headerName : 'Id',
                            width : 150,
                            editable : false
                        },
                        {
                            field: 'name',
                            headerName: 'Name',
                            width: 150,
                            editable: true,
                        }
                     ]}
                     onSelectionModelChange={(newSelection) => {
                        setSelection(newSelection.selectionModel);
                    }}
                     pageSize={5}
                     checkboxSelection
                     disableSelectionOnClick/>
}
