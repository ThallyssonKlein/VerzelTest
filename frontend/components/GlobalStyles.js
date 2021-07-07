export default function GlobalStyles({ children }) {
    return (
        <>
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
                    module {
                        1px solid rgb(67, 51, 118);
                        background: rgb(36, 18, 75) none repeat scroll 0% 0%;
                    }
                `}
            </style>
        </>
    );
}