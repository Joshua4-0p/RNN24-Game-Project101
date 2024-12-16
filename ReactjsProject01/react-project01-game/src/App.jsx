import { useState, useEffect } from "react";
// import Display from "./Display";
import "./App.css";

function App() {
  const programs = [
    "Python",
    "JavaScript",
    "Java",
    "C++",
    "C#",
    "Ruby",
    "PHP",
    "Swift",
    "HTML",
    "CSS",
    "TypeScript",
    "R",
    "Go",
    "Kotlin",
    "Rust",
    "Scala",
    "Dart",
    "Perl",
    "MATLAB",
    "Haskell",
  ];
  const colors = [
    "Cyan",
    "Yellow",
    "Red",
    "SkyBlue",
    "LimeGreen",
    "Crimson",
    "Lavender",
    "Orange",
    "Tangerine",
    "RoyalBlue",
    "Blue",
    "Grey",
    "Aqua",
    "Magenta",
    "Azure",
    "Bisque",
    "Teal",
    "Indigo",
    "Goldenrod",
    "Plum",
  ];
  const match1 = programs.map((program, index) => ({
    program,
    color: colors[index],
  }));
  console.log(match1);

  const [showInput, setShowInput] = useState(false);
  const [visible, setVisible] = useState(false);
  const [attempt, setAttempt] = useState([]); //array to contain the diff results of the user
  const [failedAttempt, setFailedAttempt] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);
  const [message, setMessage] = useState("");
  const [count, setCount] = useState(0);
  const [programLanguage, setProgramLanguage] = useState("");
  const [colorLanguage, setColorLanguage] = useState("");

  function handleClickEvent(e) {
    e.preventDefault();
    console.log("You've started");
    //this callback function tales for parameters the time and the functionto set duering that time
    // Show the program and color for 5 seconds
    setVisible(true);

    const timer = setTimeout(() => {
      setVisible(false); // Hide the program and color
      setShowInput(true); // Show the input fields
      clearTimeout(timer); // Clear the timeout
    }, 5000);
  }

  function handleProgramChange(e) {
    setProgramLanguage(e.target.value);
  }

  function handleColorChange(e) {
    setColorLanguage(e.target.value);
  }

  function handleSubmitEvent(e) {
    e.preventDefault();
    switch (true) {
      case attempt.length === 20:
        setIsDisabled(true);
        break;
      case failedAttempt > 5:
        setIsDisabled(true);
        break;
      //to avoid entering the same programming language
      case programLanguage === attempt.programLanguage:
        setFailedAttempt((failedAttempt) => failedAttempt + 1);
        setAttempt((prevAttempt) => [
          ...prevAttempt,
          {
            attempt: prevAttempt.length + 1,
            programLanguage,
            colorLanguage,
            status: "Failed",
          },
        ]);
        setMessage(
          "You are left with " +
          (20 - attempt.length) +
          " and if you fail again " +
          (5 - failedAttempt) +
          " You are out of the Game"
        );
        break;
      default:
        const isValid = match1.some(
          (item) =>
            item.program === programLanguage && item.color === colorLanguage
        );
        console.log(isValid);
        if (isValid === true) {
          setCount((count) => count + 1);
          // Update the attempts array with the new attempt
          setAttempt((prevAttempt) => [
            ...prevAttempt,
            {
              attempt: prevAttempt.length + 1,
              programLanguage,
              colorLanguage,
              status: "Passed",
            },
          ]);
          setFailedAttempt((failedAttempt) => 0);
          setMessage("You are left with " + (20 - attempt.length));
        } else {
          setFailedAttempt((failedAttempt) => failedAttempt + 1);
          setAttempt((prevAttempt) => [
            ...prevAttempt,
            {
              attempt: prevAttempt.length + 1,
              programLanguage,
              colorLanguage,
              status: "Failed",
            },
          ]);
          setMessage(
            "You are left with " +
              (20 - attempt.length) +
              " and if you fail again " +
              (5 - failedAttempt) +
              " You are out of the Game"
          );
        }
        // Clear input fields
        setProgramLanguage("");
        setColorLanguage("");
        break;
    }
  }

  return (
    <div>
      <div>
        <div>
          <h1>Welcome To The RNN2024Game</h1>
          <h2>Objective OF The Game</h2>
          <p style={{ fontSize: "19px" }}>
            The objesctive of this game is to match the programming language
            that will be given to you with it's corresponding color
          </p>
        </div>

        <hr />

        <div>
          <h2>Instructions OF The Game</h2>
          <p style={{ fontSize: "19px" }}>
            These are the following Instructions:
            <ul>
              <li>
                The programming lanuage and it's colors will display for 4
                seconds and after dissapear
              </li>
              <li>
                After that you have 20 trials to enter the programming language
                and it's corresponding colors{" "}
              </li>
              <li>
                You cannot enter a prgramming language twice, if you do it will
                automatically be detected as a fail attempt
              </li>
              <li>After 5 consecutive fail it is Game Over for you</li>
              <li>Your score will be display at the end of the Game</li>
              <li>When you're ready press the start button below:</li>
            </ul>
          </p>{" "}
          <br />
          <button style={{ marginLeft: "20px" }} onClick={handleClickEvent}>
            Press Start
          </button>
        </div>
        <hr />

        <div>
          {visible && (
            <div>
              <h3>Programming language and their colors: </h3>
              <ul>
                {match1.map((item, index) => (
                  <li key={index} style={{ backgroundColor: item.color }}>
                    {item.program}-{item.color}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {showInput && (
            <div>
              <p style={{ fontSize: "19px" }}>
                Programs:{" "}
                <input
                  type="text"
                  style={{ border: "2px solid black", height: "20px" }}
                  placeholder="Enter Language"
                  onChange={handleProgramChange}
                />
              </p>
              <p style={{ fontSize: "19px" }}>
                Colors:{" "}
                <input
                  type="text"
                  style={{ border: "2px solid black", height: "20px" }}
                  placeholder="Enter Color"
                  onChange={handleColorChange}
                />
              </p>
            </div>
          )}
        </div>

        <button onClick={handleSubmitEvent} disabled={isDisabled}>
          Submit
        </button>
        {message && (
          <p
            style={{
              backgroundColor: "red",
              marginTop: "5px",
              fontSize: "19px",
            }}
          >
            {message}
          </p>
        )}
        {isDisabled && (
          <table
            border="1"
            style={{ width: "80%", marginTop: "20px", textAlign: "center" }}
          >
            <thead>
              <tr>
                <th>Attempt Number</th>
                <th>Programming Language</th>
                <th>Color</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {attempt.map((attempt, index) => (
                <tr key={index}>
                  <td>{attempt.attempt}</td>
                  <td style={{ backgroundColor: attempt.colorLanguage }}>
                    {attempt.programLanguage}
                  </td>
                  <td>{attempt.colorLanguage}</td>
                  <td
                    style={{
                      backgroundColor:
                        attempt.status === "passed" ? "lightgreen" : "red",
                    }}
                  >
                    {attempt.status === "passed" ? "good(✔)" : "x"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {isDisabled && (
          <p style={{ backgroundColor: "LightGreen", fontSize: "20px" }}>
            You Had Total Score Of {count}/20
          </p>
        )}
      </div>
    </div>
  );
}

export default App;

/*
 At line 56 of the code we could remove the setInterval from the 
 handleCLiclEvent and put it instead inside the useEffect function
  out of the of the handleCLickEvent as shown below: 
 useEffect(() => {
    setInterval(() => {
      setShowInput(true);
    }, 5000);
  }, []);

  useEffect(() => {
    // Hide the program and color after 5 seconds
    const timer = setTimeout(() => setVisible(false), 5000);

    // Cleanup function to clear the timer
    return () => clearTimeout(timer);
  }, []);

  const match = {
          program: programLanguage,
          color: colorLanguage,
        };
        Check if the entered language and color are valid
 */
