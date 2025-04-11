// ResizableImageTemplate
import { cn } from "@/lib/utils";
import { NodeViewProps, NodeViewWrapper } from "@tiptap/react";
import React, {
  CSSProperties,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

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

export const ResizableImageTemplate = ({
  node,
  updateAttributes,
}: NodeViewProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [editing, setEditing] = useState(false);
  const [resizingStyle, setResizingStyle] = useState<
    Pick<CSSProperties, "width"> | undefined
  >();

  // Lots of work to handle "not" div click events.
  useEffect(() => {
    // for mobile
    // const handleClickOutside = (event: MouseEvent | TouchEvent) => {
    //   if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
    //     setEditing(false)
    //   }
    // }
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

  // for mobile with touch event
  // const handleMouseDown = useEvent(
  //   (
  //     event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  //   ) => {
  //     if (!imgRef.current) return;
  //     setEditing(true);
  //     const direction = event.currentTarget.dataset.direction || "--";
  //     const initialXPosition = event.type.includes("mouse")
  //       ? (event as React.MouseEvent<HTMLDivElement>).clientX
  //       : (event as React.TouchEvent<HTMLDivElement>).touches[0].clientX;
  //     const currentWidth = imgRef.current.clientWidth;
  //     let newWidth = currentWidth;
  //     const transform = direction === "w" ? -1 : 1;

  //     const mouseMoveHandler = (event: MouseEvent | TouchEvent) => {
  //       // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  //       event.cancelable && event.preventDefault();
  //       const currentPosition =
  //         event instanceof MouseEvent
  //           ? event.clientX
  //           : event.touches[0].clientX;
  //       newWidth =
  //         currentWidth + transform * (currentPosition - initialXPosition);
  //       setResizingStyle({ width: newWidth });
  //       // If mouse is up, remove event listeners
  //       // TODO: what about if touch is up?
  //       if ("buttons" in event && !event.buttons) removeListeners();
  //     };

  //     const removeListeners = () => {
  //       window.removeEventListener("mousemove", mouseMoveHandler);
  //       window.removeEventListener("mouseup", removeListeners);
  //       window.removeEventListener("touchmove", mouseMoveHandler);
  //       window.removeEventListener("touchend", removeListeners);
  //       setEditing(false);
  //       updateAttributes({ width: newWidth });
  //       setResizingStyle(undefined);
  //     };

  //     window.addEventListener("mousemove", mouseMoveHandler);
  //     window.addEventListener("mouseup", removeListeners);
  //     // passive false to prevent scroll on mobile while resizing
  //     window.addEventListener("touchmove", mouseMoveHandler, {
  //       passive: false,
  //     });
  //     window.addEventListener("touchend", removeListeners, { passive: false });
  //   }
  // );
  // const handleMouseDown = useEvent(
  //   (
  //     // event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  //     event: React.MouseEvent<HTMLDivElement>
  //   ) => {
  //     if (!imgRef.current) return;
  //     setEditing(true);
  //     const direction = event.currentTarget.dataset.direction || "--";
  //     // const initialXPosition = event.type.includes("mouse")
  //     //   ? (event as React.MouseEvent<HTMLDivElement>).clientX
  //     //   : (event as React.TouchEvent<HTMLDivElement>).touches[0].clientX;
  //     const initialXPosition = event.clientX;
  //     const currentWidth = imgRef.current.clientWidth;
  //     let newWidth = currentWidth;
  //     const transform = direction === "w" ? -1 : 1;

  //     // const mouseMoveHandler = (event: MouseEvent | TouchEvent) => {
  //     const mouseMoveHandler = (event: MouseEvent) => {
  //       // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  //       event.cancelable && event.preventDefault();
  //       // const currentPosition =
  //       //   event instanceof MouseEvent
  //       //     ? event.clientX
  //       //     : event.touches[0].clientX;
  //       const currentPosition = event.clientX;
  //       newWidth =
  //         currentWidth + transform * (currentPosition - initialXPosition);
  //       setResizingStyle({ width: newWidth });
  //       // If mouse is up, remove event listeners
  //       // TODO: what about if touch is up?
  //       if ("buttons" in event && !event.buttons) removeListeners();
  //     };

  //     const removeListeners = () => {
  //       window.removeEventListener("mousemove", mouseMoveHandler);
  //       window.removeEventListener("mouseup", removeListeners);
  //       // window.removeEventListener("touchmove", mouseMoveHandler);
  //       // window.removeEventListener("touchend", removeListeners);
  //       setEditing(false);
  //       updateAttributes({ width: newWidth });
  //       setResizingStyle(undefined);
  //     };

  //     window.addEventListener("mousemove", mouseMoveHandler);
  //     window.addEventListener("mouseup", removeListeners);
  //     // passive false to prevent scroll on mobile while resizing
  //     // window.addEventListener("touchmove", mouseMoveHandler, {
  //     //   passive: false,
  //     // });
  //     // window.addEventListener("touchend", removeListeners, { passive: false });
  //   }
  // );

  //   if (!imgRef.current) return;
  //   event.preventDefault();
  //   const direction = event.currentTarget.dataset.direction || "--";
  //   const initialXPosition = event.clientX;
  //   const currentWidth = imgRef.current.width;
  //   let newWidth = currentWidth;
  //   const transform = direction[1] === "w" ? -1 : 1;

  //   const removeListeners = () => {
  //     window.removeEventListener("mousemove", mouseMoveHandler);
  //     window.removeEventListener("mouseup", removeListeners);
  //     updateAttributes({ width: newWidth });
  //     setResizingStyle(undefined);
  //   };

  //   const mouseMoveHandler = (event: MouseEvent) => {
  //     newWidth = Math.max(currentWidth + (transform * (event.clientX - initialXPosition)), MIN_WIDTH);
  //     setResizingStyle({ width: newWidth });
  //     // If mouse is up, remove event listeners
  //     if (!event.buttons) removeListeners();
  //   };

  //   window.addEventListener("mousemove", mouseMoveHandler);
  //   window.addEventListener("mouseup", removeListeners);
  // });
  const handleMouseDown = useEvent(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (!imgRef.current) return;
      event.preventDefault();
      const direction = event.currentTarget.dataset.direction || "--";
      const initialXPosition = event.clientX;
      const currentWidth = imgRef.current.width;
      let newWidth = currentWidth;
      const transform = direction === "w" ? -1 : 1;

      const removeListeners = () => {
        window.removeEventListener("mousemove", mouseMoveHandler);
        window.removeEventListener("mouseup", removeListeners);
        updateAttributes({ width: newWidth });
        setResizingStyle(undefined);
      };

      const mouseMoveHandler = (event: MouseEvent) => {
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
      // onTouchStart={handleMouseDown}
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

  return (
    <NodeViewWrapper
      ref={containerRef}
      as="div"
      draggable
      data-drag-handle
      onMouseDown={() => setEditing(true)}
      onTouchStart={() => setEditing(true)}
      onBlur={() => setEditing(false)}
      style={{
        display: "table",
        // Weird! Basically tiptap/prose wraps this in a span and the line height causes an annoying buffer.
        lineHeight: "0px",
      }}
      className={`relative my-6 overflow-visible sm:my-8 ${node.attrs.align}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        {...node.attrs}
        ref={imgRef}
        style={{
          ...resizingStyle,
        }}
        alt="img"
        className={cn(
          editing && `pointer-events-none cursor-default ring-1 ring-foreground`,
          "min-w-[200px] max-w-full rounded-md"
        )}
      />
      <div className="group">
        {dragCornerButton("w", "-left-4 cursor-w-resize")}
        {dragCornerButton("e", "-right-4 cursor-e-resize")}
      </div>
    </NodeViewWrapper>
  );
};
