import Grid from '@material-ui/core/Grid';

function GenerateClasses(classes){
    let counter = 0;
    let firstColumn = [];
    let secondColumn = [];
    let thirdColumn = [];

    classes.forEach(classe => {
        switch(counter){
            case 0:
                firstColumn.push(<div className="block" key={classe.name}>{classe.name}</div>);
                break;
            case 1:
                secondColumn.push(<div className="block" key={classe.name}>{classe.name}</div>);
                break;
            case 2:
                thirdColumn.push(<div className="block" key={classe.name}>{classe.name}</div>);
                counter = 0;
                break;
            default:
                ++counter;
                break;
        }
    });
    return [firstColumn, secondColumn, thirdColumn]
}

export default function Selected({name, classes, count = 0}){
    const generatedClasses = GenerateClasses(classes);

    return <div style={{padding : 20, display : "flex", flexDirection : "column", flex : 1, justifyContent : "center"}}>
                <h1 style={{marginBottom : 10}}>{name}</h1>
                <p>Todas as aulas disponíveis nesse módulo ({count}): </p>
                <div style={{display : "flex", paddingTop : 50}}>
                    <Grid container spacing={1}>
                        <Grid container item xs={12} spacing={3}>
                            {generatedClasses[0]}
                        </Grid>
                        <Grid container item xs={12} spacing={3}>
                            {generatedClasses[1]}
                        </Grid>
                        <Grid container item xs={12} spacing={3}>
                            {generatedClasses[2]}
                        </Grid>
                    </Grid>
                </div>
           </div>
}