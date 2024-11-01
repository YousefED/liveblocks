"use client";

import {
  useLiveblocksExtension,
  FloatingComposer,
  AnchoredThreads,
} from "@liveblocks/react-tiptap";
import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import { LengthenIcon } from "../icons/LengthenIcon";
import { CommentIcon } from "../icons/CommentIcon";
import { useThreads } from "@liveblocks/react/suspense";
import { ClientSideSuspense } from "@liveblocks/react";

export function TweetPanel() {
  return (
    <ClientSideSuspense fallback={null}>
      <Tweet />
      <Tweet />
      <Tweet />
    </ClientSideSuspense>
  );
}

function Tweet() {
  const liveblocks = useLiveblocksExtension();
  const { threads } = useThreads();

  const editor = useEditor({
    extensions: [liveblocks, StarterKit],
    immediatelyRender: false,
  });

  return (
    <div className="flex gap-2 group w-full">
      <div className="flex flex-col items-center gap-1 pb-1">
        <div className="bg-gray-200 w-10 h-10 rounded-full overflow-hidden shrink-0">
          <img
            className="h-full w-full"
            src="https://github.com/ctnicholas.png"
          />
        </div>
        <div className="w-[3px] bg-gray-200/80 h-full flex-grow group-last:hidden flex-1" />
      </div>
      <div className="grow">
        <div className="flex gap-1 whitespace-nowrap">
          <span className="font-semibold">Chris Nicholas</span>
          <span className="text-gray-500">@ctnicholasdev</span>
        </div>

        <div className="relative pb-8">
          <div>
            <EditorContent editor={editor} className="!outline-none" />
          </div>

          <div
            className="absolute bottom-2 left-0 right-0 justify-end hidden group-hover:flex"
            style={{ display: !editor?.isFocused ? "hidden" : undefined }}
          >
            <button>
              <LengthenIcon className="w-5 h-5 text-gray-500 hover:text-gray-700 transition-colors" />
            </button>
          </div>
        </div>
      </div>
      <BubbleMenu editor={editor}>
        <button onClick={() => editor?.chain().focus().addPendingComment()}>
          <CommentIcon />
        </button>
      </BubbleMenu>
      <FloatingComposer editor={editor} style={{ width: "350px" }} />
      <div
        className="w-[300px]"
        style={{
          display:
            threads.length > 0 && threads.some((thread) => !thread.resolved)
              ? "block"
              : "none",
        }}
      >
        <AnchoredThreads threads={threads} editor={editor} />
      </div>
    </div>
  );
}
