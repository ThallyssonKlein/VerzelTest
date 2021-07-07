import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

export default function Module({module, setSelected}){
    return <Grid item xs={4}>
                <style jsx global>
                    {`
                        .module {
                            border: 1px solid rgb(67, 51, 118);
                            background: rgb(36, 18, 75) none repeat scroll 0% 0%;
                            font-size : 30px;
                            color : rgb(59, 212, 45);
                            padding : 50px;
                        }
                        .module:hover {
                            border: 1px solid rgb(59, 212, 45);
                        }
                    `}
                </style>
                <Paper key={module.name}
                       className="module"
                       onClick={_ => setSelected(module)}>{module.name}</Paper>
            </Grid>
}