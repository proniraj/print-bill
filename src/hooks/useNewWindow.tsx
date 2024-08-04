import { ElementType } from "react";
import { createRoot } from "react-dom/client";

// 595 is the height of A4 paper in pixels
// 842 is the width of A4 paper in pixels
const useNewWindow = () => {
  const openInNewWindow = (Component: ElementType) => {
    const newWindow = window.open("", "print", "width=842,height=595");
    if (newWindow) {
      newWindow.document.write('<div id="print-window" class="print"></div>');
      newWindow.document.body.style.margin = "0";
      newWindow.document.body.style.padding = "0";

      // set global styles
      const style = newWindow.document.createElement("style");
      style.innerHTML = `
      *{
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        }
        
        @media print {
          body {
            margin: 0;
            padding: 0;
          }
          .no-print {
            display: none;
          }
          .print {
            display: block;
          }

        }
      `;

      newWindow.document.head.appendChild(style);

      const rootElement = newWindow.document.getElementById("print-window");
      if (!rootElement) return;
      const root = createRoot(rootElement);
      root.render(<Component />);
    }
  };

  return { openInNewWindow };
};

export default useNewWindow;
