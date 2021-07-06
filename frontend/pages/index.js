import { useEffect, useState } from 'react';
import { GetAll } from '../api/module';

export default function Home(){
    const [modules, setModules] = useState([]);
    const [selected, setSelected] = useState(null);
    const [classesCount, setClassesCount] = useState(null);

    useEffect(_ => {
        (async _ => {
            const apiResponse = await GetAll();
            setModules(apiResponse.map(module => {
                return <div key={module.name}
                            onClick={_ => setSelected(module)}>
                                {module.name}</div>;
            }));
        })();
    }, []);

    useEffect(_ => {
        if(selected){
            setClassesCount(selected.classes.length);
        }
    }, [selected]);

    return <div>
                {modules}
                <hr/>
                {classesCount && <div>Total de aulas: {classesCount}</div>}
                {selected && selected.classes.map(classe => {
                    return <div key={classe.name}>{classe.name}</div>
                })}
          </div>
}