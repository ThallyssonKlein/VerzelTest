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
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

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

    return <GlobalStyles style={{height : '100vh', padding : 50}}>
                <Head>
                    <title>Administração</title>
                </Head>
                <div className="row-start">
                    <h1 className="blackh1">Administração do Site</h1>
                </div>
                <div className="row-end">
                    <Button variant="contained" color="primary" onClick={openNewModuleModal}>
                        Novo
                    </Button>
                    <Button variant="contained"
                            color="primary"
                            onClick={deleteModules}
                            style={{marginLeft : 10}}>
                                Deletar
                    </Button>
                    <Button variant="contained"
                            color="primary"
                            onClick={editClasses}
                            style={{marginLeft : 10}}>
                                Editar Aulas
                    </Button>
                    <Button variant="contained"
                            color="primary"
                            style={{marginLeft : 10}}
                            onClick={_ => {
                                cookieCutter.set("authenticated", "");
                                router.push("/login");
                            }}>
                                Sair
                    </Button>
                </div>
                {(modules) ? modules : "Carregando..."}
                <Modal isOpen={newModuleModalIsOpen}
                       style={customStyles}
                       contentLabel="Adicionar um novo modulo">
                    <div className="row-space-between">
                        <h2>Adicionar um novo modulo</h2>
                        <div style={{display : "flex", flexDirection : "column", paddingLeft : 10}}>
                            <Button variant="contained" color="primary" onClick={closeNewModuleModal}>X</Button>
                        </div>
                    </div>
                    <div className="col">
                        <TextField value={newModuleName}
                                   placeholder="Nome do módulo"
                                   onChange={e => setNewModuleName(e.target.value)}
                                   style={{marginBottom : 20, marginTop : 20}}/>
                        <Button variant="contained" color="primary" onClick={save}>SALVAR</Button>
                    </div>
                </Modal>
                <Modal isOpen={editingClassesModalIsOpen}
                       style={customStyles}
                       contentLabel="Editar as aulas do módulo">
                    <div className="row-space-between" style={{marginBottom : 20}}>
                        <h2>Editar as aulas do módulo</h2>
                        <div style={{display : "flex", flexDirection : "column", paddingLeft : 10}}>
                            <Button variant="contained" color="primary" onClick={closeClassesModal}>X</Button>
                        </div>
                    </div>
                    <div className="row-end">
                        <Button variant="contained"
                                color="primary"
                                onClick={openNewClassModal}>
                                    Novo
                        </Button>
                        <Button variant="contained"
                                color="primary"
                                onClick={deleteClasses}
                                style={{marginLeft : 10}}>
                                    Deletar
                        </Button>
                    </div>
                    <div className="row-space-between" style={{height : '50vh'}}>
                        {classes}
                    </div>
                </Modal>
                <Modal isOpen={newClassModalIsOpen}
                       style={customStyles}
                       contentLabel="Criar uma nova aula">
                    <div className="row-space-between" style={{marginBottom : 20}}>
                        <h2>Criar uma nova aula</h2>
                        <div style={{display : "flex", flexDirection : "column", paddingLeft : 10}}>
                            <Button variant="contained"
                                    color="primary"
                                    onClick={closeNewClassModal}>
                                    X
                            </Button>
                        </div>
                    </div>
                    <div className="col">
                        <TextField placeholder="Nome da classe"
                                   value={newClassName}
                                   onChange={e => setNewClassName(e.target.value)}
                                   style={{marginBottom : 10}}/>
                        <DateTimePicker value={newClassWhen}
                                        onChange={setNewClassWhen}
                                        style={{marginBottom : 20}}/>
                        <Button variant="contained" color="primary" onClick={saveNewClass}>SALVAR</Button>
                    </div>
                </Modal>
            </GlobalStyles>
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
