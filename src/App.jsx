import { useState, useRef } from "react";
import copy from "../assets/images/icon-copy.svg";
import arrow from "../assets/images/icon-arrow-right.svg";
import "./App.css";

function App() {
  const [sliderValue, setSliderValue] = useState(0);
  const [password, setPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [secondCheck, setSecondCheck] = useState(false);
  const [thirdCheck, setThirdCheck] = useState(false);
  const [lastCheck, setLastCheck] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const textToCopy = password;
  const textRef = useRef(null);

  const copyToClipboard = () => {
    if (textRef.current) {
      const range = document.createRange();
      range.selectNode(textRef.current);
      window.getSelection().removeAllRanges();
      window.getSelection().addRange(range);
      document.execCommand("copy");
      window.getSelection().removeAllRanges();

      setIsCopied(true);

      setTimeout(() => {
        setIsCopied(false);
      }, 10000);
    }
  };

  const charset = {
    isChecked: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    secondCheck: "abcdefghijklmnopqrstuvwxyz",
    thirdCheck: "0123456789",
    lastCheck: "!@#$%^&*()_+",
  };

  const generateRandomPassword = (options) => {
    const selectedCharset = Object.keys(options)
      .filter((option) => options[option])
      .map((option) => charset[option])
      .join("");

    if (selectedCharset.length === 0) {
      return "Please select at least one option";
    }

    let newPassword = "";
    const length = sliderValue;

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * selectedCharset.length);
      newPassword += selectedCharset[randomIndex];
    }

    return newPassword;
  };

  const handleGeneratePassword = () => {
    const options = {
      isChecked,
      secondCheck,
      thirdCheck,
      lastCheck,
    };
    const selectedOptions = [isChecked, secondCheck, thirdCheck, lastCheck];
    const selectedCount = selectedOptions.filter((option) => option).length;

    if (selectedCount === 0) {
      setPasswordStrength("Please select at least one option");
    } else if (selectedCount === 1) {
      const newPassword = generateRandomPassword(options);
      setPassword(newPassword);
      setPasswordStrength("too weak");
    } else if (selectedCount === 2) {
      const newPassword = generateRandomPassword(options);
      setPassword(newPassword);
      setPasswordStrength("weak");
    } else if (selectedCount === 3) {
      const newPassword = generateRandomPassword(options);
      setPassword(newPassword);
      setPasswordStrength("medium");
    } else {
      const newPassword = generateRandomPassword(options);
      setPassword(newPassword);
      setPasswordStrength("strong");
    }
  };

  const handleSliderChange = (e) => {
    setSliderValue(e.target.value);
  };

  return (
    <main>
      <h1 className="text-[#817d92] font-bold text-2xl">Password Generator</h1>
      <section className="max-w-[540px] mx-auto p-4">
        <div className="flex items-center justify-between bg-[#18171f] p-4">
          <p ref={textRef} className="font-bold text-3xl text-[#e6e5ea]">
            {password}
          </p>
          <div className="flex items-center gap-4">
            {isCopied && (
              <p className="font-bold text-[#a4ffaf] text-lg uppercase">
                Copied
              </p>
            )}
            <img
              src={copy}
              alt=""
              className="cursor-pointer"
              onClick={copyToClipboard}
            />
          </div>
        </div>

        <div className="mt-10 bg-[#18171f] p-4">
          <div className="flex items-center justify-between">
            <p className="font-bold text-lg text-[#e6e5ea]">Character Length</p>
            <p className="font-bold text-3xl text-[#a4ffaf]">{sliderValue}</p>
          </div>
          <div className="mt-5">
            <input
              type="range"
              min="0"
              max="20"
              step="5"
              className="w-full accent-[#a4ffaf] border-none cursor-pointer"
              value={sliderValue}
              onChange={handleSliderChange}
            />
          </div>

          <div className="mt-10">
            <div className="flex items-center justify-start gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="cursor-pointer accent-[#a4ffaf]"
                checked={isChecked}
                onChange={() => setIsChecked(!isChecked)}
              />
              <p className="font-bold text-lg text-[#e6e5ea]">
                Include Uppercase Letters
              </p>
            </div>
            <div className="flex items-center justify-start gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="cursor-pointer accent-[#a4ffaf]"
                checked={secondCheck}
                onChange={() => setSecondCheck(!secondCheck)}
              />
              <p className="font-bold text-lg text-[#e6e5ea]">
                Include Lowercase Letters
              </p>
            </div>
            <div className="flex items-center justify-start gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="cursor-pointer accent-[#a4ffaf]"
                checked={thirdCheck}
                onChange={() => setThirdCheck(!thirdCheck)}
              />
              <p className="font-bold text-lg text-[#e6e5ea]">
                Include Numbers
              </p>
            </div>
            <div className="flex items-center justify-start gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="cursor-pointer accent-[#a4ffaf]"
                checked={lastCheck}
                onChange={() => setLastCheck(!lastCheck)}
              />
              <p className="font-bold text-lg text-[#e6e5ea]">
                Include Symbols
              </p>
            </div>
          </div>

          <div className="bg-[#24232c] mt-10 flex items-center justify-between p-4">
            <p className="uppercase text-[#817d92] text-lg">strength</p>
            <div className="flex items-center gap-3">
              <p className="uppercase text-2xl text-[#e6e5ea]">
                {passwordStrength}
              </p>
              <div
                className={`w-2 h-7 border-[1px] border-gray-300 ${
                  passwordStrength === "too weak"
                    ? "bg-[#f64a4a] border-none"
                    : passwordStrength === "weak"
                    ? "bg-[#fb7c58] border-none"
                    : passwordStrength === "medium"
                    ? "bg-[#f8cd65] border-none"
                    : passwordStrength === "strong"
                    ? "bg-[#a4ffa4] border-none"
                    : ""
                }`}
              ></div>
              <div
                className={`w-2 h-7 border-[1px] border-gray-300 ${
                  passwordStrength === "weak"
                    ? "bg-[#fb7c58] border-none"
                    : passwordStrength === "medium"
                    ? "bg-[#f8cd65] border-none"
                    : passwordStrength === "strong"
                    ? "bg-[#a4ffa4] border-none"
                    : ""
                }`}
              ></div>
              <div
                className={`w-2 h-7 border-[1px] border-gray-300 ${
                  passwordStrength === "medium"
                    ? "bg-[#f8cd65] border-none"
                    : passwordStrength === "strong"
                    ? "bg-[#a4ffa4] border-none"
                    : ""
                }`}
              ></div>
              <div
                className={`w-2 h-7 border-[1px] border-gray-300 ${
                  passwordStrength === "strong"
                    ? "bg-[#a4ffa4] border-none"
                    : ""
                }`}
              ></div>
            </div>
          </div>
          <button
            onClick={handleGeneratePassword}
            className="mt-10 flex items-center gap-4 bg-[#4fffaf] w-full p-4 justify-center"
          >
            Generate <img src={arrow} alt="" />
          </button>
        </div>
      </section>
    </main>
  );
}

export default App;
