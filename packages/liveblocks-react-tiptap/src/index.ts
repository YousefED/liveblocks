import { detectDupes } from "@liveblocks/core";

import { PKG_FORMAT, PKG_NAME, PKG_VERSION } from "./version";

detectDupes(PKG_NAME, PKG_VERSION, PKG_FORMAT);

export { AnchoredThreads } from "./comments/AnchoredThreads";
export { FloatingComposer } from "./comments/FloatingComposer";
export { FloatingThreads } from "./comments/FloatingThreads";
export { useLiveblocksExtension } from "./LiveblocksExtension";
