import { useState } from 'react';
import cookieCutter from 'cookie-cutter';
import { useRouter } from 'next/router';
import Button from '@material-ui/core/Button';
import FilledInput from '@material-ui/core/FilledInput';
import Head from 'next/head';
import GlobalStyles from '../components/GlobalStyles';
import { Auth, validateToken } from '../api/Auth';
import Cookies from 'cookies';

export default function Login() {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    async function doLogin(username, password){    
        const apiResponse = await Auth(username, password);
        if(apiResponse){
            cookieCutter.set("authenticated", apiResponse.token);
            router.push("/modules");
        }
    }

    return <GlobalStyles className="viewport">
                <Head>
                    <title>Login</title>
                </Head>
                <div className="col">
                    <FilledInput placeholder="Nome do usuário"
                                 style={{backgroundColor : "white"}}
                                 onChange={e => setUsername(e.target.value)}/>
                    <div style={{marginTop : 10}}>
                        <FilledInput placeholder="Senha"
                                     type="password"
                                     style={{backgroundColor : "white"}}
                                     onChange={e => setPassword(e.target.value)}/>
                    </div>
                    <div className="row" style={{marginTop : 10, marginBottom : 30}}>
                        <Button variant="contained"
                                onClick={_ => doLogin(username, password)}
                                style={{color : "white", flex : 1}}
                                color="primary">
                            <b>Acessar</b>
                        </Button>
                    </div>
                </div>
            </GlobalStyles>
}

export const getServerSideProps = async ctx => {
    const { req, res } = ctx;
	const cookies = new Cookies(req, res);

    const token = cookies.get("authenticated");
	if (token && validateToken(token)){
		return {
			redirect: { destination: '/modules', permanent: true },
		};
	}
    return {
       props: {}
    }
}