import { useRef, useState } from "react";
import { Input } from "antd";

const OtpInput = ({ length = 6, onChange }) => {
  const [values, setValues] = useState(Array(length).fill(""));
  const inputsRef = useRef([]);

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newValues = [...values];
    newValues[index] = value;
    setValues(newValues);

    if (value && index < length - 1) {
      inputsRef.current[index + 1].focus();
    }

    const otp = newValues.join("");
    console.log("values:", newValues, "otp:", otp, "length:", otp.length);
    onChange(otp);
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (!values[index] && index > 0) {
        inputsRef.current[index - 1].focus();
      }
    }
  };

  return (
    <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
      {Array.from({ length }).map((_, index) => (
        <Input
          key={index}
          value={values[index]} // ✅ controlled component
          maxLength={1}
          style={{ width: 50, height: 50, textAlign: "center", fontSize: 20 }}
          ref={(el) => (inputsRef.current[index] = el)}
          onChange={(e) => handleChange(e.target.value, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
        />
      ))}
    </div>
  );
};

export default OtpInput;
