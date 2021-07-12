import { DataGrid } from '@material-ui/data-grid';
import { Patch } from '../api/module';

export default function ModulesTable({modules, setSelection}){    

    async function handleDataChange({ id, props }){
        const apiResponse = await Patch(id, props.value);
        if(!apiResponse){
            alert("Erro ao salvar atualização!");
        }
    }

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
                     onEditCellChangeCommitted={handleDataChange}
                     pageSize={5}
                     checkboxSelection
                     disableSelectionOnClick/>
}
