import { useState } from "react";
import { MAX_TEXT_CHARACTERS } from "../../lib/constants";

type TFeedbackFormProps = {
  onAddToList: (text: string) => void;
};

export default function FeedbackForm({ onAddToList }: TFeedbackFormProps) {
  const [text, setText] = useState("");
  const [showValidIndicator, setValidIndicator] = useState(false);
  const [showInvalidIndicator, setInvalidIndicator] = useState(false);
  const charactersLeft = MAX_TEXT_CHARACTERS - text.length;

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (event.target.value.length > MAX_TEXT_CHARACTERS) {
      return;
    }
    setText(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (text.trim().length >= 5 && text.includes("#")) {
      setValidIndicator(true);
      onAddToList(text);
      setText("");
      setTimeout(() => {
        setValidIndicator(false);
      }, 3000);
    } else {
      setInvalidIndicator(true);
      setTimeout(() => {
        setInvalidIndicator(false);
      }, 3000);
      return;
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`form ${showValidIndicator ? "form--valid" : ""} ${
        showInvalidIndicator ? "form--invalid" : ""
      }`}
    >
      <textarea
        value={text}
        onChange={handleChange}
        id="feedback-textarea"
        placeholder="blabla"
        spellCheck={false}
      />

      <label htmlFor="feedback-textarea">
        Enter your feedback here, remember to #hashtag the company.
      </label>

      <div>
        <p className="u-italic">{charactersLeft}</p>
        <button>
          <span>Submit</span>
        </button>
      </div>
    </form>
  );
}
