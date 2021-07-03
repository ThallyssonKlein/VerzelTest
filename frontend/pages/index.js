import { useEffect, useState } from 'react';
import { GetAll } from '../api/module';

export default function Home(){
    const [modules, setModules] = useState([]);

    useEffect(_ => {
        (async _ => {
            const apiResponse = await GetAll();
            setModules(apiResponse.map(module => {
                return <div key={module.name}>{module.name}</div>;
            }));
        })();
    }, []);

    return <div>
        {modules}
    </div>
}