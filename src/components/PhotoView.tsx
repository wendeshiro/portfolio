import { Children, isValidElement } from "react";
import type { ReactNode } from "react";
import { PhotoProvider, PhotoView as PhotoViewItem } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

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

export default function PhotoView({ children, className }: PhotoViewProps) {
  const items = Children.toArray(children);

  if (items.length === 0) {
    return null;
  }

  return (
    <PhotoProvider
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

          if (!src) {
            return child;
          }

          return (
            <PhotoViewItem key={`photo-view-${index}`} src={src}>
              {child}
            </PhotoViewItem>
          );
        })}
      </div>
    </PhotoProvider>
  );
}
