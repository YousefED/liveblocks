"use client";



import NotificationsPopover from "../notifications-popover";
import { useEditor, EditorContent } from "@tiptap/react";
import { useLiveblocksExtension } from "./LiveblocksExtension";
import StarterKit from "@tiptap/starter-kit";
import { Toolbar } from "./Toolbar";
import { FloatingComposer } from "./FloatingComposer";
import { FloatingThreads } from "./FloatingThreads";
import { useThreads } from "@liveblocks/react";


export default function Editor() {
  const liveblocks = useLiveblocksExtension();
  const { threads } = useThreads();

  const editor = useEditor({
    editorProps: {
      attributes: {
        // Add styles to editor element
        class: "outline-none flex-1 transition-all",
      },
    },
    extensions: [
      StarterKit.configure({
        history: false,
      }),
      liveblocks
    ],
  });
  return (
    <div className="relative min-h-screen flex flex-col">

      <div className="h-[60px] flex items-center justify-end px-4 border-b border-border/80 bg-background">
        <NotificationsPopover />
      </div>
      <div className="relative flex flex-row justify-between w-full py-16 xl:pl-[250px] pl-[100px] gap-[50px]">
        <div className="relative flex flex-1 flex-col gap-2">
          <Toolbar editor={editor} />
          <EditorContent editor={editor} />
          {threads && <FloatingThreads threads={threads} editor={editor} />}
          <FloatingComposer editor={editor} className="w-[350px]" />
        </div>


        <div className="xl:[&:not(:has(.lb-lexical-anchored-threads))]:pr-[200px] [&:not(:has(.lb-lexical-anchored-threads))]:pr-[50px]">
          anchored threads go here
        </div>
      </div>
    </div>
  );
}
