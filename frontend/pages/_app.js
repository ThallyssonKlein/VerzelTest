import { MuiPickersUtilsProvider } from '@material-ui/pickers';

import DateFnsUtils from '@date-io/date-fns';

export default function Home({ Component, pageProps }) {
	return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Component {...pageProps} />
        </MuiPickersUtilsProvider>
	);
}