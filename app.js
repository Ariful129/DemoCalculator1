document.addEventListener("DOMContentLoaded", () => {
    const display = document.getElementById("display");
    let currentInput = ""; // To store the current number entered
    let previousInput = ""; // To store the previous number entered
    let operator = null; // To store the current operator

    // Handle button clicks
    document.querySelectorAll(".calc-btn").forEach(button => {
        button.addEventListener("click", () => {
            const value = button.textContent;
            const operation = button.getAttribute("data-operation");

            if (operation) {
                // Handle operations (+, -, *, /, =)
                if (operation === "=") {
                    calculateResult();
                } else {
                    setOperator(operation);
                }
            } else if (button.id === "delete-btn") {
                deleteLastEntry();
            } else if (button.id === "all-clear-btn") {
                clearAll();
            } else {
                // Handle digits and decimal
                updateDisplay(value);
            }
        });
    });

    // Update the display with numbers or decimals
    function updateDisplay(value) {
        if (value === "." && currentInput.includes(".")) return; // Prevent multiple decimals
        currentInput += value;

        // Ensure first number entry shows only the number, not a null string
        if (previousInput === "" && operator === null) {
            display.textContent = currentInput;
        } else {
            display.textContent = previousInput + " " + operator + " " + currentInput; // Display the current equation
        }
    }

    // Set the operator and store the current input
    function setOperator(op) {
        if (currentInput === "") return; // Ignore if no input
        if (previousInput && currentInput) calculateResult(); // Calculate the result if both previous and current inputs exist
        operator = op;
        previousInput = currentInput;
        currentInput = ""; // Clear current input to enter next number
        display.textContent = previousInput + " " + operator; // Display the current equation
    }

    // Perform the calculation when '=' is clicked
    function calculateResult() {
        if (!previousInput || !currentInput || !operator) return; // Skip if any part is missing
        const num1 = parseFloat(previousInput);
        const num2 = parseFloat(currentInput);
        let result;

        // Calculate the result based on the operator
        switch (operator) {
            case "+":
                result = num1 + num2;
                break;
            case "-":
                result = num1 - num2;
                break;
            case "*":
                result = num1 * num2;
                break;
            case "/":
                result = num2 !== 0 ? num1 / num2 : "Error"; // Handle division by zero
                break;
            default:
                result = "Error";
        }

        display.textContent = result; // Show the result
        currentInput = result.toString(); // Store the result for further operations
        previousInput = ""; // Clear previous input after calculation
        operator = null; // Reset operator after calculation
    }

    function deleteLastEntry() {
        currentInput = currentInput.slice(0, -1);
        display.textContent = previousInput + (operator ? " " + operator + " " : "") + currentInput || "0";
    }

    // Clear all inputs and reset the calculator
    function clearAll() {
        currentInput = "";
        previousInput = "";
        operator = null;
        display.textContent = "0"; // Reset display to initial state
    }
});
