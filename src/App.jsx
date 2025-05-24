import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [capitalAllowed, setCapitalAllowed] = useState(true); // New State
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "";
    if (capitalAllowed) str += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    str += "abcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!#@$%^&*~+_-=[]{}'";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed, capitalAllowed]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, capitalAllowed, passwordGenerator]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
      <motion.div
        className="w-full max-w-md mx-auto shadow-2xl rounded-2xl px-6 py-5 bg-gray-900 text-orange-400"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120 }}
      >
        <h1 className="text-white text-center text-3xl font-bold mb-6 drop-shadow-lg animate-pulse">
          🔐 Password Generator
        </h1>

        <div className="flex rounded-lg overflow-hidden shadow-inner mb-4">
          <AnimatePresence mode="wait">
            <motion.input
              key={password}
              type="text"
              value={password}
              readOnly
              ref={passwordRef}
              className="outline-none w-full py-2 px-4 text-lg bg-gray-800 text-orange-300"
              placeholder="password"
              initial={{ opacity: 0.5 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          </AnimatePresence>
          <motion.button
            onClick={copyPasswordToClipboard}
            className="bg-blue-700 text-white px-4 py-2 hover:bg-blue-600 transition-all"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Copy
          </motion.button>
        </div>

        <div className="flex flex-col space-y-4 text-sm text-white">
          <div className="flex items-center justify-between">
            <label className="mr-2 font-medium">Length: {length}</label>
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="w-full ml-2 accent-orange-500 cursor-pointer"
              onChange={(e) => setLength(Number(e.target.value))}
            />
          </div>

          <div className="flex items-center justify-between">
            <label htmlFor="numberInput" className="font-medium text-green-400">
              Include Numbers
            </label>
            <input
              type="checkbox"
              id="numberInput"
              defaultChecked={numberAllowed}
              onChange={() => setNumberAllowed((prev) => !prev)}
              className="accent-green-500 w-5 h-5"
            />
          </div>

          <div className="flex items-center justify-between">
            <label htmlFor="characterInput" className="font-medium text-yellow-400">
              Include Special Characters
            </label>
            <input
              type="checkbox"
              id="characterInput"
              defaultChecked={charAllowed}
              onChange={() => setCharAllowed((prev) => !prev)}
              className="accent-yellow-400 w-5 h-5"
            />
          </div>

          <div className="flex items-center justify-between">
            <label htmlFor="capitalInput" className="font-medium text-pink-400">
              Include Capital Letters
            </label>
            <input
              type="checkbox"
              id="capitalInput"
              defaultChecked={capitalAllowed}
              onChange={() => setCapitalAllowed((prev) => !prev)}
              className="accent-pink-500 w-5 h-5"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default App;
