import { useState } from "react";

function App() {
  const [calc, setCalc] = useState("");
  const [result, setResult] = useState("");
  const [hasDec, setHasDec] = useState(false);
  const [disable, setDisable] = useState(false);

  const operators = ["/", "*", "+", "-", "."];

  const updateCalc = (value) => {
    /*The if statement checks to see if the last value is an operator and the last
	value is also an operator, it will return out of the function and not amend the value. This limits you from inputting multiple operators after each other. 
	*/
    if (
      (operators.includes(value) && calc === "") ||
      (operators.includes(value) && operators.includes(calc.slice(-1)))
    ) {
      return;
    }

    /*
    The following two if statements use useState to enable and disable the . button, 
    so once its pressed it can't be pressed again until another operator is pressed. 
    This prevents the user from inputting multiple decimal points to a number. 
    */
    if (value === operators[4]) {
      setHasDec(true);
      setDisable(true);
    }

    if (
      value === operators[0] ||
      value === operators[1] ||
      value === operators[2] ||
      value === operators[3]
    ) {
      setHasDec(false);
      setDisable(false);
    }

    setCalc(calc + value);
    // This sets the result to the evaluation of the calc and value and converts to a string
    if (!operators.includes(value)) {
      setResult(eval(calc + value).toString());
    }
  };

  /*This function loops nine times and creates nine buttons with the digits 1-9. 
		It is then invoked further down within the app. You could copy/paste the 
	nine buttons but with six lines of code it is automated with a single function.
	*/
  const createDigits = () => {
    const digits = [];
    for (let i = 1; i < 10; i++) {
      digits.push(
        <button onClick={() => updateCalc(i.toString())} key={i}>
          {i}
        </button>
      );
    }
    return digits;
  };

  const calculate = () => {
    setCalc(eval(calc).toString());
  };

  const deleteLast = () => {
    if (calc === "") {
      return;
    }
    const value = calc.slice(0, -1);
    setCalc(value);
  };

  const clear = () => {
    setResult("");
    setCalc("");
    setDisable(false);
  };
  return (
    <div className="App">
      <div className="calculator">
        <div className="display">
          {result ? <span>{result} </span> : ""} {calc || "0"}
        </div>
        <div className="operators">
          <button onClick={clear}>AC</button>
          <button onClick={() => updateCalc("/")}>/</button>
          <button onClick={() => updateCalc("*")}>*</button>
          <button onClick={() => updateCalc("+")}>+</button>
          <button onClick={() => updateCalc("-")}>-</button>

          <button onClick={deleteLast}> DEL</button>
        </div>

        <div className="digits">
          {createDigits()}
          <button onClick={() => updateCalc("0")}>0</button>
          <button disabled={disable} onClick={() => updateCalc(".")}>
            .
          </button>
          <button onClick={calculate}>=</button>
        </div>
      </div>
    </div>
  );
}

export default App;
