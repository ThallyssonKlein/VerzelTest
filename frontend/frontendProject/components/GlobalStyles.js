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
                    h2 {
                        color : black;
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
                    .col {
                        display : flex;
                        flex-direction : column;
                    }
                    .row-center {
                        display : flex;
                        flex-direction : row;
                        
                        align-items : center;
                    }
                    .row-end {
                        display : flex;
                        justify-content : flex-end; 
                        padding-bottom : 10px;  
                    }
                    .row-space-between {
                        display : flex;
                        justify-content : space-between;   
                    }
                    .row-start {
                        display : flex;
                        flex-direction : row;
                        justify-content : flex-start;
                    }
                    .block {
                        border: 1px solid rgb(67, 51, 118);
                        background: rgb(36, 18, 75) none repeat scroll 0% 0%;
                        font-size : 30px;
                        color : rgb(59, 212, 45);
                        padding : 50px;
                    }
                    .block:hover {
                        border: 1px solid rgb(59, 212, 45);
                        cursor: pointer;
                    }
                    .blackh1 {
                        color : black;
                        font-size : 30px;
                        font-family : "Biennale Regular";
                    }
                `}
            </style>
        </div>
    );
}