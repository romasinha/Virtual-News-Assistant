import React, {useEffect, useState} from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import wordsToNumbers from 'words-to-numbers';
import NewsCards from './components/NewsCards/NewsCards'
import {ReactComponent as Logo} from './images/undraw_newspaper_k72w (1).svg'
const alanKey = '1a6cbc6f03f876ce047818290c32080c2e956eca572e1d8b807a3e2338fdd0dc/stage';


const App=()=> { 

    const [newsArticles, setNewsArticles] =useState([]);
    const [activeArticle, setActiveArticle] = useState(-1);

    useEffect(()=>{
        alanBtn({
            key: alanKey,
            onCommand: ({command, articles, number})=>{
                if(command==='newHeadlines'){
                    setNewsArticles(articles);
                    setActiveArticle(-1);
                }
                else if(command==='highlight'){
                    setActiveArticle((prevActiveArticle)=>
                        prevActiveArticle+1
                    );
                }
                else if(command==='open'){
                    const parsedNumber = number.length>2? wordsToNumbers(number, {fuzzy: true}): number;
                    const article = articles[parsedNumber-1];

                    if(parsedNumber>20){
                        alanBtn().playText('Please try that again');
                    }
                    else if(article){
                        window.open(article.url, '_blank');
                        alanBtn.playText('Opening');
                    }
                    
                }
            }
        })
    }, [])

    return (
        <div>
            <div className="container">
            <Logo className="logo"/>
            <div className="para">
            <h3 className="title">Virtual News Assistant</h3>
            <p>Use the mic icon in the bottom-right corner and give your voice commands</p>
            </div>
            
            </div>
            <NewsCards articles={newsArticles} activeArticle={activeArticle}/>
        </div>
    )
}

export default App


