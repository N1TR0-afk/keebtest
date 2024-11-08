"use client"

import { useState, useEffect, useCallback } from "react";
import KeyboardLayout from "./keyboard-layout";
import LayoutSelector from "./layout-selector";
import { layouts } from "./keyboard-layouts";
import { KeybLayout as KeyboardLayoutType } from "./types";
import { Button } from "@/app/components/ui/button";
import { Lock, Unlock } from "lucide-react";
import playClickSound from "./use-audio";

export default function KeyboardTester() {
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());
  const [currentLayout, setCurrentLayout] = useState<KeyboardLayoutType>(
    layouts.fullSize,
  );
  const [isKeyboardLocked, setIsKeyboardLocked] = useState(false);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (isKeyboardLocked) {
        e.preventDefault();
        e.stopPropagation();
      }

      if (!pressedKeys.has(e.code)) {
        setPressedKeys(new Set(pressedKeys).add(e.code));
        playClickSound();
      }
    },
    [isKeyboardLocked, pressedKeys],
  );

  const handleKeyUp = useCallback(
    (e: KeyboardEvent) => {
      if (isKeyboardLocked) {
        e.preventDefault();
        e.stopPropagation();
      }

      const newPressedKeys = new Set(pressedKeys);
      newPressedKeys.delete(e.code);
      setPressedKeys(newPressedKeys);
    },
    [isKeyboardLocked, pressedKeys],
  );

  const toggleKeyboardLock = useCallback(() => {
    setIsKeyboardLocked((prev) => !prev);
  }, []);
  
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  return (
    <div
      className={`min-h-screen bg-purple-800 flex  flex-col items-center justify-center p-4 relative`}
    >
      <h1 className="text-4xl font-bold text-white mb-8">Keyboard Tester</h1>
      <LayoutSelector
        currentLayout={currentLayout}
        setCurrentLayout={setCurrentLayout} />
      <KeyboardLayout layout={currentLayout} pressedKeys={pressedKeys} />
      <p className="text-white mt-8 text-center">
        Press any key to test. You&apos;ll see the key highlighted and hear a sound.
      </p>
      <div className="mt-4 flex items-center space-x-4">
        <Button
          onClick={toggleKeyboardLock}
          variant={isKeyboardLocked ? "destructive" : "default"}
          className="flex items-center space-x-2"
        >
          {isKeyboardLocked ? (
            <>    
              <Unlock className="w-4 h-4" />
              <span>Unlock Keyboard</span>
            </>     
          ) : (
            <>
              <Lock className="w-4 h-4" />
              <span>Lock Keyboard</span>
            </>
          )}
        </Button>
        <div
          className={`px-4 py-2 rounded-full ${isKeyboardLocked ? "bg-red-500" : "bg-green-500"} text-white font-semibold`}
        >
          Keyboard is {isKeyboardLocked ? "Locked" : "Unlocked"}
        </div>
      </div>
    </div>
  );
}