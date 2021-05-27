import React, {useEffect} from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';

const alanKey = '1a6cbc6f03f876ce047818290c32080c2e956eca572e1d8b807a3e2338fdd0dc/stage';


function App() {
    useEffect(()=>{
        alanBtn({
            key: alanKey,
            onCommand: (command)=>{
                if(command==='testCommand'){
                    alert("This command was executed")
                }
            }
        })
    }, [])
    return (
        <div>
            <h1>Alan AI</h1>
        </div>
    )
}

export default App


