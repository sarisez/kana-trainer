import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { LearningSession } from "./LearningSession.jsx";

export function KanaLearningPage({
  mode,
  setMode,
  transliteration,
  textInputSettings
}) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const searchMode = searchParams.get("mode");

  useEffect(() => {
    if (searchMode !== null && searchMode !== mode) {
      setMode(searchMode);
    }

    if (searchMode === null) {
      navigate(`/kana-learning?mode=${mode}`, { replace: true });
    }
  }, [searchMode, mode, setMode, navigate]);

  return (
    <LearningSession
      key={mode}
      mode={mode}
      transliteration={transliteration}
      textInputSettings={textInputSettings}
    />
  );
}