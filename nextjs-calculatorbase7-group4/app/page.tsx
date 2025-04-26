"use client";

import { useState } from "react";
import styles from "./page.module.css";

export default function Home() {
  const [input, setInput] = useState<string>("0");
  const [lastResult, setLastResult] = useState<string | null>(null);

  const handleNumberClick = (value: string) => {
    if (lastResult) {
      setInput(value);
      setLastResult(null); 
    } else {
      setInput(prev => (prev === "0" ? value : prev + value));
    }
  };

  const handleOperatorClick = (operator: string) => {
    if (/[+\-*/]$/.test(input)) {
      setInput(prev => prev.slice(0, -1) + operator);
    } else {
      setInput(prev => prev + operator);
    }
  };

  const clearInput = () => {
    setInput("0");
    setLastResult(null); 
  };

  const deleteLast = () => {
    setInput(prev => {
      if (prev.length <= 1) return "0";
      return prev.slice(0, -1);
    });
  };

  const calculateResult = () => {
    try {
      const converted = input.replace(/\d+/g, match => parseInt(match, 7).toString(10));
      const resultDecimal = eval(converted);
      setInput(String(resultDecimal));
    } catch {
      setInput("Error");
    }
  };
  

  return (
    <div className={styles.container}>
      <div className={styles.calculator}>
        <div className={styles.display}>{input}</div>
        <div className={styles.buttonsGrid}>
          <button
            className={`${styles.button} ${styles.functionButton} ${lastResult ? styles.expandButton : ''}`}
            onClick={clearInput}
          >
            AC
          </button>
          
          {!lastResult && (
            <button className={`${styles.button} ${styles.functionButton}`} onClick={deleteLast}>
              DEL
            </button>
          )}

          <button className={`${styles.button} ${styles.orangeButton}`} onClick={() => handleOperatorClick('+')}>+</button>
          <button className={`${styles.button} ${styles.orangeButton}`} onClick={() => handleOperatorClick('*')}>×</button>

          <button className={`${styles.button} ${styles.numberButton}`} onClick={() => handleNumberClick('4')}>4</button>
          <button className={`${styles.button} ${styles.numberButton}`} onClick={() => handleNumberClick('5')}>5</button>
          <button className={`${styles.button} ${styles.numberButton}`} onClick={() => handleNumberClick('6')}>6</button>
          <button className={`${styles.button} ${styles.orangeButton}`} onClick={() => handleOperatorClick('-')}>−</button>

          <button className={`${styles.button} ${styles.numberButton}`} onClick={() => handleNumberClick('1')}>1</button>
          <button className={`${styles.button} ${styles.numberButton}`} onClick={() => handleNumberClick('2')}>2</button>
          <button className={`${styles.button} ${styles.numberButton}`} onClick={() => handleNumberClick('3')}>3</button>
          <button className={`${styles.button} ${styles.orangeButton}`} onClick={() => handleOperatorClick('/')}>÷</button>

          <button className={`${styles.button} ${styles.numberButton}`} style={{ gridColumn: "span 2" }} onClick={() => handleNumberClick('0')}>0</button>
          <button className={`${styles.button} ${styles.equalsButton}`} onClick={calculateResult}>=</button>
        </div>
      </div>
    </div>
  );
}
