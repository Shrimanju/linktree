import React, { useState, useEffect } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

function CopyToClipboardComponent(props) {
  const [value, setValue] = useState("");
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    setValue(`http://localhost:3000${props.url}`);
  }, []);
  return (
    <div>
      <input
        type="hidden"
        value={value}
        onChange={({ target: { value } }) => {
          setValue(value);
          setCopied(false);
        }}
      />

      {/* <CopyToClipboard text={value} onCopy={() => setCopied(true)}>
        <span>Copy to clipboard with span</span>
      </CopyToClipboard> */}

      <CopyToClipboard text={value} onCopy={() => setCopied(true)}>
        <button style={{ width: "200px", background: "white" }}>
          {!copied ? (
            <span style={{ color: "#75736d", fontSize: "80%" }}>
              Copy my Linktree URL
            </span>
          ) : (
            <span
              style={{ color: "#75736d", background: "white", fontSize: "80%" }}
            >
              Copied.
            </span>
          )}
        </button>
      </CopyToClipboard>
    </div>
  );
}

export default CopyToClipboardComponent;
