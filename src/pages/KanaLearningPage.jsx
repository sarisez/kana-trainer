import { useSearchParams } from "react-router-dom";

import { LearningSession } from "./LearningSession.jsx";

export function KanaLearningPage() {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode") ?? "hiragana";
  
  return <LearningSession key={mode} mode={mode} />;
}