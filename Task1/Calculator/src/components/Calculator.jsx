import { useState } from "react";
import "./calculator.scss";

const Calculator = () => {
  const [input, setInput] = useState("");

  const handleClick = (value) => {
    setInput(input + value);
  };

  const handleClear = () => {
    setInput("");
  };

  const handleCalculate = () => {
    try {
      setInput(eval(input).toString());
    } catch {
      setInput("Error");
    }
  };

  return (
    <div className="container">
      <input type="text" value={input} readOnly className="display" />
      <div className="buttons">
        <button onClick={() => handleClick("1")}>1</button>
        <button onClick={() => handleClick("2")}>2</button>
        <button onClick={() => handleClick("3")}>3</button>
        <button onClick={() => handleClick("4")}>4</button>
        <button onClick={() => handleClick("5")}>5</button>
        <button onClick={() => handleClick("6")}>6</button>
        <button onClick={() => handleClick("7")}>7</button>
        <button onClick={() => handleClick("8")}>8</button>
        <button onClick={() => handleClick("9")}>9</button>
        <button
          onClick={() => handleClick("0")}
          style={{ gridColumn: "span 2" }}
        >
          0
        </button>
       <button onClick={() => handleClick(".")}>.</button>
        <button className="operator" onClick={() => handleClick("+")}>
          +
        </button>
        <button className="operator" onClick={() => handleClick("/")}>
          ÷
        </button>
        <button className="operator" onClick={() => handleClick("*")}>
          ×
        </button>
        <button className="operator" onClick={() => handleClick("-")}>
          −
        </button>
                <button className="clear" onClick={handleClear} style={{ gridColumn: "span 2" }}>
          Clear
        </button>
        <button className="equal" onClick={handleCalculate} style={{ gridColumn: "span 2" }}>
          =
        </button>

      </div>
    </div>
  );
};

export default Calculator;
