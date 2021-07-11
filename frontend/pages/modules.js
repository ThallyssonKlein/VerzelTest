import { GetAll, Post, Delete, GetOne } from '../api/module';
import { Delete as DeleteClass, Post as PostClass} from '../api/class';
import { useEffect, useState } from 'react';
import ModulesTable from '../components/ModulesTable';
import ClassesTable from '../components/ClassesTable';
import Modal from 'react-modal';
import GlobalStyles from '../components/GlobalStyles';
import { DateTimePicker } from '@material-ui/pickers';

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
};

export default function Modules(){
    const [modules, setModules] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [newModuleName, setNewModuleName] = useState("");
    const [selection, setSelection] = useState([]);
    const [editingClassesModalIsOpen, setEditingClassesModalIsOpen] = useState(false);
    const [classes, setClasses] = useState(null);
    const [classesSelection, setClassesSelection] = useState([]);
    const [newClassModalIsOpen, setNewClassModalIsOpen] = useState(false);
    const [newClassName, setNewClassName] = useState("");
    const [newClassWhen, setNewClassWhen] = useState(new Date());

    async function loadData(){
        const apiResponse = await GetAll();
        if(apiResponse){
            setModules(<ModulesTable modules={apiResponse} setSelection={setSelection}/>);
        }
    }

    useEffect(_ => {
        loadData();
    }, []);
    
    function openModal(){
        setModalIsOpen(true);
    }

    function openNewClassModal(){
        setNewClassModalIsOpen(true);
    }

    function closeNewClassModal(){
        setNewClassModalIsOpen(false);
        setNewClassName("");
        setNewClassWhen(new Date());
    }

    function closeModal(){
        setModalIsOpen(false);
        setNewModuleName("");
    }

    function closeClassesModal(){
        setEditingClassesModalIsOpen(false);
    }

    async function save(){
        if(validateFieldsModule()){
            const apiResponse = await Post(newModuleName);
            if(apiResponse){
                closeModal();
                loadData();
            }else{
                alert("Erro ao salvar o modulo!");
            }
        }else{
            alert("Por favor preencha o nome do módulo para salvar!");
        }
    }

    async function deleteF(){
        try {
            for(let item in selection){
                const apiResponse = await Delete(selection[item]);
                if(!apiResponse){
                    throw new Error("Erro ao deletar o item " + selection[item]);
                }
            }
            loadData();
        } catch (e){
            alert(e);
            console.log(e);
        }
    }

    async function loadDataClass(){
        const apiResponse = await GetOne(selection[0]);
        setClasses(<ClassesTable classes={apiResponse.classes}
                                 setClassesSelection={setClassesSelection}/>);
    }

    async function deleteFClasses(){
        try {
            for(let item in classesSelection){
                const apiResponse = await DeleteClass(classesSelection[item]);
                if(!apiResponse){
                    throw new Error("Erro ao deletar o item " + classesSelection[item]);
                }
            }
            loadDataClass();
        } catch (e){
            alert(e);
            console.log(e);
        }
    }

    async function editClasses(){
        if(selection.length !== 1){
            alert('Você só pode editar as aulas de um módulo por vez');
        }else{
            const apiResponse = await GetOne(selection[0]);
            setClasses(<ClassesTable classes={apiResponse.classes} setClassesSelection={setClassesSelection}/>);
            setEditingClassesModalIsOpen(true);
        }
    }

    async function saveNewClass(){
        if(validateFieldsClass()){
            const apiResponse = await PostClass(newClassName, selection[0], newClassWhen.toISOString());
            if(apiResponse){
                closeNewClassModal();
                loadDataClass();
            }else{
                alert("Erro ao salvar a classe!");
            }
        }else{
            alert("Por favor preencha o nome da classe para salvar!");
        }
    }

    function validateFieldsModule(){
        return newModuleName !== "";
    }

    function validateFieldsClass(){
        return newClassName !== "";
    }

    return <div style={{height : '100vh'}}>
                <style jsx global>
                    {`
                        .row {
                            display : flex;
                            justify-content : flex-end; 
                            padding-bottom : 10px;  
                        }
                        .column {
                            display : flex;
                            flex-direction : column;
                        }
                        .row2 {
                            display : flex;
                            justify-content : space-between;   
                        }
                        h2 {
                            color : black;
                            font-size : 30px;
                            font-family : "Biennale Regular";
                        }
                    `}
                </style>
                <div className="row">
                    <button onClick={openModal}>Novo</button>
                    <button onClick={deleteF} style={{marginLeft : 10}}>Deletar</button>
                    <button onClick={editClasses} style={{marginLeft : 10}}>Editar Aulas</button>
                </div>
                {(modules) ? modules : "Carregando..."}
                <Modal isOpen={modalIsOpen}
                       style={customStyles}
                       contentLabel="Adicionar um novo modulo">
                    <div className="row2">
                        <h2>Adicionar um novo modulo</h2>
                        <div style={{display : "flex", flexDirection : "column", paddingLeft : 10}}>
                            <button onClick={closeModal}>X</button>
                        </div>
                    </div>
                    <div className="row2">
                        <input type="text"
                               value={newModuleName}
                               placeholder="Nome do módulo"
                               onChange={e => setNewModuleName(e.target.value)}/>
                        <button onClick={save}>SALVAR</button>
                    </div>
                </Modal>
                <Modal isOpen={editingClassesModalIsOpen}
                       style={customStyles}
                       contentLabel="Editar as aulas do módulo">
                    <div className="row2">
                        <h2>Editar as aulas do módulo</h2>
                        <div style={{display : "flex", flexDirection : "column", paddingLeft : 10}}>
                            <button onClick={closeClassesModal}>X</button>
                        </div>
                    </div>
                    <div className="row">
                        <button onClick={openNewClassModal}>Novo</button>
                        <button onClick={deleteFClasses} style={{marginLeft : 10}}>Deletar</button>
                    </div>
                    <div className="row2" style={{height : '50vh'}}>
                        {classes}
                    </div>
                </Modal>
                <Modal isOpen={newClassModalIsOpen}
                       style={customStyles}
                       contentLabel="Criar uma nova aula">
                    <div className="row2">
                        <h2>Criar uma nova aula</h2>
                        <div style={{display : "flex", flexDirection : "column", paddingLeft : 10}}>
                            <button onClick={closeNewClassModal}>X</button>
                        </div>
                    </div>
                    <div className="row2">
                        <div className="column">
                            <input type="text"
                                   placeholder="Nome da classe"
                                   value={newClassName}
                                   onChange={e => setNewClassName(e.target.value)}
                                   style={{marginBottom : 10}}/>
                            <DateTimePicker value={newClassWhen}
                                            onChange={setNewClassWhen}/>
                        </div>
                        <button onClick={saveNewClass}>SALVAR</button>
                    </div>
                </Modal>
            </div>
}
