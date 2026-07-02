import { useSearchParams } from "react-router-dom";

import { LearningSession } from "./LearningSession.jsx";

import '../styles/pages/kana-learning-page.css';


export function KanaLearningPage() {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode") ?? "hiragana";
  
  return <LearningSession key={mode} mode={mode} />;
}