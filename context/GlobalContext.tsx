import React, { createContext, useContext, useState } from 'react';

type GlobalContextType = {
    selectedAge: string;
    setSelectedAge: (age: string) => void;
    selectedRelation: string;
    setSelectedRelation: (relation: string) => void;
    selectedEmotion: string;
    setSelectedEmotion: (emotion: string) => void;
    situation: string;
    setSituation: (emotion: string) => void;
};

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
    const [selectedAge, setSelectedAge] = useState("Prefer not to say");
    const [selectedRelation, setSelectedRelation] = useState("Prefer not to say");
    const [selectedEmotion, setSelectedEmotion] = useState("Prefer not to say");
    const [situation, setSituation] = useState("");

  return (
    <GlobalContext.Provider value={{
        selectedAge,
        setSelectedAge,
        selectedRelation,
        setSelectedRelation,
        selectedEmotion,
        setSelectedEmotion,
        situation,
        setSituation
      }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = () => {
  const context = useContext(GlobalContext);
  if (!context) throw new Error("useGlobal must be used within GlobalProvider");
  return context;
};
