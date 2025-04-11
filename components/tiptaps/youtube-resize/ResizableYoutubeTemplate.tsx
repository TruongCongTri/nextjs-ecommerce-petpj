// ResizableYoutubeTemplate.tsx
import { cn } from "@/lib/utils";
import { mergeAttributes } from "@tiptap/core";
import { YoutubeOptions } from "@tiptap/extension-youtube";
import { NodeViewProps, NodeViewWrapper } from "@tiptap/react";
import React, {
  CSSProperties,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { getEmbedUrlFromYoutubeUrl } from "./utils";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useEvent = <T extends (...args: any[]) => any>(handler: T): T => {
  const handlerRef = useRef<T | null>(null);

  useLayoutEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  return useCallback((...args: Parameters<T>): ReturnType<T> => {
    if (handlerRef.current === null) {
      throw new Error("Handler is not assigned");
    }
    return handlerRef.current(...args);
  }, []) as T;
};

const MIN_WIDTH = 60;
const BORDER_COLOR = "#0096fd";

export const ResizableYoutubeTemplate = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  editor,
  node,
  updateAttributes,
  extension,
}: NodeViewProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const iFrameRef = useRef<HTMLIFrameElement>(null);
  const [editing, setEditing] = useState(false);
  const [resizingStyle, setResizingStyle] = useState<
    Pick<CSSProperties, "width"> | undefined
  >();

  // Lots of work to handle "not" div click events.
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setEditing(false);
      }
    };
    // Add click event listener and remove on cleanup
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [editing]);

  const handleMouseDown = useEvent(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (!iFrameRef.current) return;
      event.preventDefault();
      setEditing(true);
      const direction = event.currentTarget.dataset.direction || "-";
      console.log("direction", direction);
      const initialXPosition = event.clientX;
      const currentWidth = iFrameRef.current.clientWidth;
      let newWidth = currentWidth;
      const transform = direction === "w" ? -1 : 1;

      const removeListeners = () => {
        window.removeEventListener("mousemove", mouseMoveHandler);
        window.removeEventListener("mouseup", removeListeners);
        setEditing(false);
        updateAttributes({ width: newWidth });
        setResizingStyle(undefined);
      };

      const mouseMoveHandler = (event: MouseEvent) => {
        // newWidth =
        //   currentWidth + transform * (event.clientX - initialXPosition);
        newWidth = Math.max(
          currentWidth + transform * (event.clientX - initialXPosition),
          MIN_WIDTH
        );
        setResizingStyle({ width: newWidth });
        // If mouse is up, remove event listeners
        if (!event.buttons) removeListeners();
      };

      window.addEventListener("mousemove", mouseMoveHandler);
      window.addEventListener("mouseup", removeListeners);
    }
  );

  const dragCornerButton = (direction: string, className?: string) => (
    <div
      role="button"
      tabIndex={0}
      data-direction={direction}
      onMouseDown={handleMouseDown}
      onClick={() => setEditing(true)}
      onBlur={() => setEditing(false)}
      className={cn(
        `absolute top-1/2 h-16 w-2 -translate-y-1/2 transform rounded-md bg-secondary group-hover:bg-muted-foreground`,
        className,
        BORDER_COLOR && BORDER_COLOR,
        editing && "bg-muted-foreground"
      )}
    ></div>
  );

  const options = extension.options as YoutubeOptions;
  const embedUrl = getEmbedUrlFromYoutubeUrl({
    url: node.attrs.src,
    ...options,
    startAt: options.HTMLAttributes.start || node.attrs.start || 0,
  });

  const iFrameOptions = mergeAttributes(options.HTMLAttributes, {
    // width: options.width,
    // height: options.height,
    allowFullScreen: options.allowFullscreen,
    // autoPlay: options.autoplay,
    cclanguage: options.ccLanguage,
    ccloadpolicy: options.ccLoadPolicy,
    controls: options.controls,
    disablekbcontrols: options.disableKBcontrols.toString(),
    enableiframeapi: options.enableIFrameApi.toString(),
    endtime: options.endTime,
    interfacelanguage: options.interfaceLanguage,
    ivloadpolicy: options.ivLoadPolicy,
    // loop: options.loop,
    modestbranding: options.modestBranding.toString(),
    nocookie: options.nocookie.toString(),
    origin: options.origin,
    playlist: options.playlist,
    progressbarcolor: options.progressBarColor,
  });

  return (
    <NodeViewWrapper
      ref={containerRef}
      as="div"
      draggable
      data-youtube-video
      style={{
        display: "table",
        // Weird! Basically tiptap/prose wraps this in a span and the line height causes an annoying buffer.
        lineHeight: "0px",
      }}
      className={`mx-auto relative my-6 overflow-visible rounded-md sm:my-8 ${node.attrs.align}`}
    >
      <iframe 
        {...node.attrs}
        {...iFrameOptions}
        ref={iFrameRef}
        style={{
          ...resizingStyle,
        }}
        src={embedUrl || undefined}
        className={cn(
          editing &&
            `pointer-events-none cursor-default ring-1 ring-foreground`,
          "aspect-video min-w-[200px] max-w-full rounded-md"
        )}
      ></iframe>

      <>
        {dragCornerButton("w", "-left-4 cursor-w-resize")}
        {dragCornerButton("e", "-right-4 cursor-e-resize")}
      </>
    </NodeViewWrapper>
  );
};
