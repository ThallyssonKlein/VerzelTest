import { GetAll, Post } from '../api/module';
import { useEffect, useState } from 'react';
import ModulesTable from '../components/ModulesTable';
import Modal from 'react-modal';
import GlobalStyles from '../components/GlobalStyles';

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
    
    async function loadData(){
        const apiResponse = await GetAll();
        if(apiResponse){
            setModules(<ModulesTable modules={apiResponse}/>);
        }
    }
    useEffect(_ => {
        loadData();
    }, []);
    
    async function afterOpenModal(){

    }
    
    function openModal(){
        setModalIsOpen(true);
    }

    function closeModal(){
        setModalIsOpen(false);
        setNewModuleName("");
    }

    async function save(){
        const apiResponse = await Post(newModuleName);
        if(apiResponse){
            closeModal();
            loadData();
        }else{
            alert("Erro ao salvar o modulo!");
        }
    }

    async function deleteF(id){

    }

    return <div style={{height : '100vh'}}>
                <style jsx global>
                    {`
                        .row {
                            display : flex;
                            justify-content : flex-end; 
                            padding-bottom : 10px;  
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
                    <button onClick={deleteF}>Deletar</button>
                </div>
                {(modules) ? modules : "Carregando..."}
                <Modal isOpen={modalIsOpen}
                       onAfterOpen={afterOpenModal}
                       style={customStyles}
                       contentLabel="Example Modal">
                    <div className="row2">
                        <h2>Adicionar um novo modulo</h2>
                        <div style={{display : "flex", flexDirection : "column", paddingLeft : 10}}>
                            <button onClick={closeModal}>X</button>
                        </div>
                    </div>
                    <div className="row2">
                        <input type="text"
                               value={newModuleName}
                               onChange={e => setNewModuleName(e.target.value)}/>
                        <button onClick={save}>SALVAR</button>
                    </div>
                </Modal>
            </div>
}
