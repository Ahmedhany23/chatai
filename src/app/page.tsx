"use client";
import "@/app/assets/styles/Home.scss";
import { useContext } from "react";
import { Context } from "./context/Context";
import { motion } from "framer-motion";
export default function Home() {
  const {
    onSent,
    recentPrompt,
    showResult,
    resultData,
    loading,
    setInput,
    input,
  } = useContext(Context);

  return (
    <main className="main-chat">
      <motion.div initial={{y:100}} animate={{y:0}}   className="main-text">
      <motion.h1>Welcome to Gemini Api Chat</motion.h1>
      <motion.div initial={{left:0,width:'100px',height:'200px'}} animate={{left:'190%',width:'500px',height:'400px'}} className="left"></motion.div>
      <motion.div initial={{right:0,width:'100px',height:'200px'}} animate={{right:'190%',width:'500px',height:'400px'}} className="right"></motion.div>
   
      </motion.div>
     
      <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1,duration:1,stiffness:300,damping:20}} className="chat">
        {!showResult ? (
          <motion.div initial={{height:'0px'}} animate={{height:"calc(100vh - 120px)",x:100}} transition={{delay:1.5,duration:0.5,stiffness:300,damping:20}} className="response-empty">
            <p></p>
          </motion.div>
        ) : loading ? (
          <div className="loading">
            <div className="loading-items"></div>
            <div className="loading-items"></div>
          </div>
        ) : (
          <p
            className="response-result"
            dangerouslySetInnerHTML={{ __html: resultData }}
          />
        )}

        <div className="input-items">
          <input
            type="text"
            placeholder="Type here"
            onChange={(e) => {
              setInput(e.target.value);
            }}
            onSubmit={input}
            value={input}
          />
          {loading ? (
            <button disabled ><div className="loader"> </div></button>
          ) : (
            <button onClick={() => onSent()} disabled={loading}>
              Send
            </button>
          )}
        </div>
      </motion.div>
    
     
    </main>
  );
}
