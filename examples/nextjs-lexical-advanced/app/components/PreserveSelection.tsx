import { useEffect, useRef } from "react";
import {
  $getSelection,
  $setSelection,
  COMMAND_PRIORITY_LOW,
  RangeSelection,
  $isRangeSelection,
  createCommand,
  LexicalCommand,
} from "lexical";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

export const SAVE_SELECTION_COMMAND: LexicalCommand<null> = createCommand();
export const RESTORE_SELECTION_COMMAND: LexicalCommand<null> = createCommand();

export function PreserveSelectionPlugin() {
  const [editor] = useLexicalComposerContext();
  const savedSelection = useRef<RangeSelection | null>(null);
  useEffect(() => {
    const saveSelection = () => {
      const selection = $getSelection();
      console.log("save", selection);
      if ($isRangeSelection(selection)) {
        savedSelection.current = selection;
      }
      return true;
    };

    const restoreSelection = () => {
      console.log("restore", savedSelection.current);
      if (savedSelection) {
        $setSelection(savedSelection.current);
      }
      return true;
    };

    const unregisterSaveCommand = editor.registerCommand(
      SAVE_SELECTION_COMMAND,
      saveSelection,
      COMMAND_PRIORITY_LOW
    );

    const unregisterRestoreCommand = editor.registerCommand(
      RESTORE_SELECTION_COMMAND,
      restoreSelection,
      COMMAND_PRIORITY_LOW
    );

    return () => {
      unregisterSaveCommand();
      unregisterRestoreCommand();
    };
  }, [editor, savedSelection]);

  return null;
}