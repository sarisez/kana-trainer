import { useSearchParams } from "react-router-dom";

import { LearningSession } from "./LearningSession.jsx";

export function KanaLearningPage({ transliteration, textInputSettings }) {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode") ?? "hiragana";

  return <LearningSession
    key={mode}
    mode={mode}
    transliteration={transliteration}
    textInputSettings={textInputSettings}
  />;
}