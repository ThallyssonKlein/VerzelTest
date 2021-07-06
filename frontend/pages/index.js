import { useEffect, useState } from 'react';
import { GetAll } from '../api/module';
import Module from '../components/Module';
import Grid from '@material-ui/core/Grid';

export default function Home(){
    const [modules, setModules] = useState([]);
    const [selected, setSelected] = useState(null);
    const [classesCount, setClassesCount] = useState(null);

    function generateModules(apiResponse){
        let counter = 0;
        let firstColumn = [];
        let secondColumn = [];
        let thirdColumn = [];
    
        apiResponse.forEach(module => {
            switch(counter){
                case 0:
                    firstColumn.push(<Module module={module} setSelected={setSelected}/>);
                    break;
                case 1:
                    secondColumn.push(<Module module={module} setSelected={setSelected}/>);
                    break;
                case 2:
                    thirdColumn.push(<Module module={module} setSelected={setSelected}/>);
                    counter = 0;
                    break;
                default:
                    ++counter;
                    break;
            }
        });
        return [firstColumn, secondColumn, thirdColumn]
    }

    useEffect(_ => {
        (async _ => {
            const apiResponse = await GetAll();
            const modules = generateModules(apiResponse);
            setModules(<Grid container spacing={1}>
                            <Grid container item xs={12} spacing={3}>
                                {modules[0]}
                            </Grid>
                            <Grid container item xs={12} spacing={3}>
                                {modules[1]}
                            </Grid>
                            <Grid container item xs={12} spacing={3}>
                                {modules[2]}
                            </Grid>
                       </Grid>);
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