import React from "react";
import { getLearningData } from "../../utils/learning-parser";
import LearningClientPage from "./LearningClientPage";

export default async function LearningPage() {
  const data = await getLearningData();
  
  return <LearningClientPage initialData={data} />;
}

