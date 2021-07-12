import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

export default function Module({module, setSelected}){
    return <Grid item xs={4}>
                <div key={module.name}
                     className="block"
                     onClick={_ => setSelected(module)}>{module.name}</div>
            </Grid>
}