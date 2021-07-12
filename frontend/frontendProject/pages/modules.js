import { useRouter } from 'next/router';
import {
    GetAll, Post, Delete, GetOne
} from '../api/module';
import { Delete as DeleteClass, Post as PostClass} from '../api/class';
import { validateToken } from '../api/Auth';
import { useEffect, useState } from 'react';
import ModulesTable from '../components/ModulesTable';
import ClassesTable from '../components/ClassesTable';
import Modal from 'react-modal';
import GlobalStyles from '../components/GlobalStyles';
import { DateTimePicker } from '@material-ui/pickers';
import Cookies from 'cookies';
import Head from 'next/head';
import cookieCutter from 'cookie-cutter';

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
    const [newModuleModalIsOpen, setNewModuleModalIsOpen] = useState(false);
    const [newModuleName, setNewModuleName] = useState("");
    const [selection, setSelection] = useState([]);
    const [editingClassesModalIsOpen, setEditingClassesModalIsOpen] = useState(false);
    const [classes, setClasses] = useState(null);
    const [classesSelection, setClassesSelection] = useState([]);
    const [newClassModalIsOpen, setNewClassModalIsOpen] = useState(false);
    const [newClassName, setNewClassName] = useState("");
    const [newClassWhen, setNewClassWhen] = useState(new Date());
    const router = useRouter();

    async function loadModulesData(){
        const apiResponse = await GetAll();
        if(apiResponse){
            setModules(<ModulesTable modules={apiResponse} setSelection={setSelection}/>);
        }
    }

    async function loadClassesData(){
        const apiResponse = await GetOne(selection[0]);
        setClasses(<ClassesTable classes={apiResponse.classes}
                                 setClassesSelection={setClassesSelection}/>);
    }

    useEffect(_ => {
        loadModulesData();
    }, []);
    
    function openNewModuleModal(){
        setNewModuleModalIsOpen(true);
    }

    function closeNewModuleModal(){
        setNewModuleModalIsOpen(false);
        setNewModuleName("");
    }

    function openNewClassModal(){
        setNewClassModalIsOpen(true);
    }

    function closeNewClassModal(){
        setNewClassModalIsOpen(false);
        setNewClassName("");
        setNewClassWhen(new Date());
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

    function closeClassesModal(){
        setEditingClassesModalIsOpen(false);
    }

    function validateFieldsModule(){
        return newModuleName !== "";
    }

    function validateFieldsClass(){
        return newClassName !== "";
    }

    async function save(){
        if(validateFieldsModule()){
            const apiResponse = await Post(newModuleName);
            if(apiResponse){
                closeNewModuleModal();
                loadModulesData();
            }else{
                alert("Erro ao salvar o modulo!");
            }
        }else{
            alert("Por favor preencha o nome do módulo para salvar!");
        }
    }

    async function saveNewClass(){
        if(validateFieldsClass()){
            const apiResponse = await PostClass(newClassName, selection[0], newClassWhen.toISOString());
            if(apiResponse){
                closeNewClassModal();
                loadClassesData();
            }else{
                alert("Erro ao salvar a classe!");
            }
        }else{
            alert("Por favor preencha o nome da classe para salvar!");
        }
    }

    async function deleteModules(){
        try {
            for(let item in selection){
                const apiResponse = await Delete(selection[item]);
                if(!apiResponse){
                    throw new Error("Erro ao deletar o item " + selection[item]);
                }
            }
            loadModulesData();
        } catch (e){
            alert("Erro ao deletar modulo(s)");
        }
    }

    async function deleteClasses(){
        try {
            for(let item in classesSelection){
                const apiResponse = await DeleteClass(classesSelection[item]);
                if(!apiResponse){
                    throw new Error("Erro ao deletar o item " + classesSelection[item]);
                }
            }
            loadClassesData();
        } catch (e){
            alert("Erro ao deletar classe(s)!");
        }
    }

    return <div style={{height : '100vh'}}>
                <Head>
                    <title>Administração</title>
                </Head>
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
                    <button onClick={openNewModuleModal}>Novo</button>
                    <button onClick={deleteModules} style={{marginLeft : 10}}>Deletar</button>
                    <button onClick={editClasses} style={{marginLeft : 10}}>Editar Aulas</button>
                    <button style={{marginLeft : 10}}
                            onClick={_ => {
                                cookieCutter.set("authenticated", "");
                                router.push("/login");
                            }}>Sair</button>
                </div>
                {(modules) ? modules : "Carregando..."}
                <Modal isOpen={newModuleModalIsOpen}
                       style={customStyles}
                       contentLabel="Adicionar um novo modulo">
                    <div className="row2">
                        <h2>Adicionar um novo modulo</h2>
                        <div style={{display : "flex", flexDirection : "column", paddingLeft : 10}}>
                            <button onClick={closeNewModuleModal}>X</button>
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
                        <button onClick={deleteClasses} style={{marginLeft : 10}}>Deletar</button>
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

export async function getServerSideProps(ctx) {
	const { req, res } = ctx;
	const cookies = new Cookies(req, res);

    const token = cookies.get("authenticated");
	if (!token || !validateToken(token)){
		return {
			redirect: { destination: '/login', permanent: true },
		};
	}
	return { props: {} };
}
