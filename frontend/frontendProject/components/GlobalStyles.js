export default function GlobalStyles({ children, style, className }) {
    return (
        <div style={style} className={className}>
            {children}
            <style jsx global>
                {`
                    * {
                        padding: 0;
                        margin: 0;
                        border: 0;
                    }
                    h1 {
                        color : white;
                        font-size : 30px;
                        font-family : "Biennale Regular";
                    }
                    p {
                        color : rgb(161, 145, 255);
                        font-family : "Catesque Regular"
                    }
                    .viewport {
                        height : 100vh;
                        display : flex;
                        flex : 1;
                        flex-direction : column;
                        justify-content : center;
                        align-items: center;
                    }
                    col {
                        display : flex;
                        flex-direction : column;
                    }
                    .row {
                        display : flex;
                        flex-direction : row;
                        
                        align-items : center;
                    }
                `}
            </style>
        </div>
    );
}