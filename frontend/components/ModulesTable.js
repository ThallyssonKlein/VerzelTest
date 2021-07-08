import { DataGrid } from '@material-ui/data-grid';

export default function ModulesTable({modules}){
    console.log(modules);
    
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
                     pageSize={5}
                     checkboxSelection
                     disableSelectionOnClick/>
}
