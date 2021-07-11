export default function GlobalStyles({ children, style }) {
    return (
        <div style={style}>
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
                `}
            </style>
        </div>
    );
}