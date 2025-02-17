"use client";
import React from "react";
import Typewriter from "typewriter-effect";

type Props = {};

const TypewriterTitle = (props: Props) => {
  return (
    <Typewriter
      options={{
        loop: true,
      }}
      onInit={(typewriter) => {
        typewriter
          .typeString("AI Powered Note Taking Assistant")
          .pauseFor(1000)
          .deleteAll()
          .typeString("🤖 AI-Powered Insights.")
          .start();
      }}
    />
  );
};

export default TypewriterTitle;
