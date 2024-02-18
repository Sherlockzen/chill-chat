import React from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

function page() {
  return (
    // <main className=" h-svh w-svw">
    <ResizablePanelGroup
      direction="horizontal"
      className="min-h-svh rounded-lg border"
    >
      <ResizablePanel defaultSize={20} minSize={10}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">Sidebar</span>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={80}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">Content</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
    // </main>
  );
}

export default page;
