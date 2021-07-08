import { GetAll } from '../api/module';
import { useEffect, useState } from 'react';
import ModulesTable from '../components/ModulesTable';

export default function Modules(){
    const [modules, setModules] = useState(null);

    useEffect(_ => {
        (async _ => {
            const apiResponse = await GetAll();
            if(apiResponse){
                setModules(<ModulesTable modules={apiResponse}/>);
            }
        })();
    }, []);
    
    return <div style={{height : '100vh'}}>{(modules) ? modules : "Carregando..."}</div>
}
