import Module from './Module';
import Grid from '@material-ui/core/Grid';

export function GenerateModules(apiResponse, setSelected){
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

export default function Modules({modules}){

    return <Grid container spacing={1}>
                <Grid container item xs={12} spacing={3}>
                    {modules[0]}
                </Grid>
                <Grid container item xs={12} spacing={3}>
                    {modules[1]}
                </Grid>
                <Grid container item xs={12} spacing={3}>
                    {modules[2]}
                </Grid>
            </Grid>
}