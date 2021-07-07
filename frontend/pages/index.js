import { useEffect, useState } from 'react';
import { GetAll } from '../api/module';
import GlobalStyles from '../components/GlobalStyles';
import Modules, { GenerateModules } from '../components/Modules';
import Selected from '../components/Selected';

const styles = {
    container : {
        background: "rgb(28, 12, 63)",
        display : "flex",
        flexDirection : "column",
        flex : 1,
        justifyContent : "center",
        height : "100vh",
        padding : 10
    },
    topTexts : {
        paddingBottom : 30
    }
}

export default function Home(){
    const [modules, setModules] = useState([]);
    const [selected, setSelected] = useState(null);
    const [classesCount, setClassesCount] = useState(null);

    useEffect(_ => {
        (async _ => {
            const apiResponse = await GetAll();
            setModules(<Modules modules={GenerateModules(apiResponse, setSelected)}/>);
        })();
    }, []);

    useEffect(_ => {
        if(selected){
            setClassesCount(selected.classes.length);
        }
    }, [selected]);

    return <GlobalStyles>
                <div style={styles.container}>
                        <div style={styles.topTexts}>
                            <h1>Módulos</h1>
                            <p>Selecione o módulo para ver as aulas disponíveis:</p>
                        </div>
                        {modules}
                        <hr/>
                        {selected && <Selected name={selected.name} classes={selected.classes} count={classesCount}/>}

                </div>
            </GlobalStyles>
}