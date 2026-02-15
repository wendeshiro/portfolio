import { Children, isValidElement, useCallback } from "react";
import type { ReactNode } from "react";
import { PhotoProvider, PhotoView as PhotoViewItem } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import { useLenis } from "lenis/react";
import ZoomIn from "./icons/ZoomIn";

type PhotoViewProps = {
  children: ReactNode;
  className?: string;
};

function getPhotoSrc(child: ReactNode): string | undefined {
  if (!isValidElement<{ src?: unknown }>(child)) {
    return undefined;
  }

  const { src } = child.props;

  if (typeof src === "string") {
    return src;
  }

  if (src && typeof src === "object" && "src" in src) {
    const typedSrc = (src as { src?: unknown }).src;
    return typeof typedSrc === "string" ? typedSrc : undefined;
  }

  return undefined;
}

function getPhotoTitle(child: ReactNode): string | undefined {
  if (!isValidElement<{ title?: unknown }>(child)) {
    return undefined;
  }

  const { title } = child.props;

  return typeof title === "string" && title.trim().length > 0
    ? title
    : undefined;
}

export default function PhotoView({ children, className }: PhotoViewProps) {
  const items = Children.toArray(children);
  const lenis = useLenis();

  const handleVisibleChange = useCallback(
    (visible: boolean) => {
      if (!lenis) return;
      if (visible) {
        lenis.stop();
      } else {
        lenis.start();
      }
    },
    [lenis],
  );

  if (items.length === 0) {
    return null;
  }

  return (
    <PhotoProvider
      onVisibleChange={handleVisibleChange}
      toolbarRender={({ onScale, scale }) => (
        <>
          <svg
            className="PhotoView-PhotoSlider__toolbarIcon mr-2 cursor-pointer text-white/80 duration-300 hover:text-white"
            width="36"
            height="36"
            viewBox="0 0 768 768"
            fill="currentColor"
            onClick={() => onScale(scale + 0.7)}
          >
            <path d="M384 640.5q105 0 180.75-75.75t75.75-180.75-75.75-180.75-180.75-75.75-180.75 75.75-75.75 180.75 75.75 180.75 180.75 75.75zM384 64.5q132 0 225.75 93.75t93.75 225.75-93.75 225.75-225.75 93.75-225.75-93.75-93.75-225.75 93.75-225.75 225.75-93.75zM415.5 223.5v129h129v63h-129v129h-63v-129h-129v-63h129v-129h63z" />
          </svg>
          <svg
            className="PhotoView-PhotoSlider__toolbarIcon mr-1 cursor-pointer text-white/80 duration-300 hover:text-white"
            width="36"
            height="36"
            viewBox="0 0 768 768"
            fill="currentColor"
            onClick={() => onScale(scale - 0.7)}
          >
            <path d="M384 640.5q105 0 180.75-75.75t75.75-180.75-75.75-180.75-180.75-75.75-180.75 75.75-75.75 180.75 75.75 180.75 180.75 75.75zM384 64.5q132 0 225.75 93.75t93.75 225.75-93.75 225.75-225.75 93.75-225.75-93.75-93.75-225.75 93.75-225.75 225.75-93.75zM223.5 352.5h321v63h-321v-63z" />
          </svg>
        </>
      )}
    >
      <div className={className}>
        {items.map((child, index) => {
          if (!isValidElement(child)) {
            return child;
          }

          const src = getPhotoSrc(child);
          const title = getPhotoTitle(child);

          if (!src) {
            return child;
          }

          return (
            <div
              key={`photo-view-${index}`}
              className="flex flex-col items-center"
            >
              {title ? (
                <p className="mb-2 text-gray-700 md:text-lg">{title}</p>
              ) : null}
              <PhotoViewItem src={src}>{child}</PhotoViewItem>
              <p className="mt-2 flex flex-col items-center justify-center text-center text-sm text-gray-500 md:mt-3 md:flex-row md:gap-1">
                <ZoomIn />
                Click the image to expand
              </p>
            </div>
          );
        })}
      </div>
    </PhotoProvider>
  );
}
