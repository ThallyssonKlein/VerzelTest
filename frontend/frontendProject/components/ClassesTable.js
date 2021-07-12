import { DataGrid } from '@material-ui/data-grid';
import { Patch } from '../api/class';

export default function ClassesTable({classes, setClassesSelection}){    

    async function handleDataChange({ id, props }){
        const apiResponse = await Patch(id, props.value);
        if(!apiResponse){
            alert("Erro ao salvar atualização!");
        }
    }

    return <DataGrid rows={classes}
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
                        setClassesSelection(newSelection.selectionModel);
                     }}
                     onEditCellChangeCommitted={handleDataChange}
                     pageSize={5}
                     checkboxSelection
                     disableSelectionOnClick/>
}
