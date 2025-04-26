"use client";

import {useState} from "react";
import styles from "./page.module.css";

export default function Home() {
  const [angka1, setAngka1] = useState < string > ("");
  const [angka2, setAngka2] = useState < string > ("");
  const [operator, setOperator] = useState < string > ("+");
  const [hasil, setHasil] = useState < string | null > (null);

  const handleNumberInput = (value: string, setter: React.Dispatch < React.SetStateAction < string >> ) => {
    const validatedValue = value.replace(/[^0-6]/g, '');
    setter(validatedValue);
  };

  const konversiKeDesimal = (angkaBasis7: string): number => parseInt(angkaBasis7, 7);
  const konversiKeBasis7 = (angkaDesimal: number): string => angkaDesimal.toString(7);

  const hitung = (): void => {
    try {
      const a = angka1 ? konversiKeDesimal(angka1) : 0;
      const b = angka2 ? konversiKeDesimal(angka2) : 0;
      let hasilDesimal: number | string;

      switch (operator) {
        case "+":
          hasilDesimal = a + b;
          break;
        case "-":
          hasilDesimal = a - b;
          break;
        case "*":
          hasilDesimal = a * b;
          break;
        case "/":
          if (b !== 0) {
            hasilDesimal = a / b;
            hasilDesimal = Number.isInteger(hasilDesimal) ? konversiKeBasis7(hasilDesimal) : hasilDesimal.toFixed(1);
          } else {
            hasilDesimal = "Error: ÷0";
          }
          break;

        default:
          hasilDesimal = 0;
      }

      setHasil(
        hasilDesimal === "Pembagi tidak boleh 0" ?
        "Pembagi tidak boleh 0" :
        konversiKeBasis7(hasilDesimal as number)
      );
    } catch {
      setHasil("Input tidak valid!");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Kalkulator Basis 7</h1>

        <div className={styles.inputWrapper}>
          <input
            type="text"
            placeholder="Angka pertama (0-6)"
            value={angka1}
            onChange={(e) => handleNumberInput(e.target.value, setAngka1)}
            className={styles.inputField}
            inputMode="numeric"
          />
          <select
            value={operator}
            onChange={(e) => setOperator(e.target.value)}
            className={styles.selectField}
          >
            <option value="+">+</option>
            <option value="-">−</option>
            <option value="*">×</option>
            <option value="/">÷</option>
          </select>
          <input
            type="text"
            placeholder="Angka kedua (0-6)"
            value={angka2}
            onChange={(e) => handleNumberInput(e.target.value, setAngka2)}
            className={styles.inputField}
            inputMode="numeric"
          />
        </div>

        <button onClick={hitung} className={styles.button}>
          Hitung
        </button>

        {hasil !== null && (
          <div className={styles.resultBox}>
            <div className={styles.resultLabel}>Hasil:</div>
            <div className={styles.resultValue}>{hasil}</div>
          </div>
        )}
      </div>
    </div>
  );
}
