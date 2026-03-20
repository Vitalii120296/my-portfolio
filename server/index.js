import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, useLocation, NavLink, UNSAFE_withComponentProps, Outlet, UNSAFE_withErrorBoundaryProps, isRouteErrorResponse, Meta, Links, ScrollRestoration, Scripts, Link } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { Close, Heart, Menu, Code, EditLine } from "griddy-icons";
import { useState, useEffect, useRef } from "react";
import { Drawer as Drawer$1 } from "vaul";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { create } from "zustand";
import { getFirestore, updateDoc, doc, increment, getDoc, onSnapshot, getDocs, collection } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { useQueryClient, useQuery, useMutation, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useForm } from "react-hook-form";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  if (request.method.toUpperCase() === "HEAD") {
    return new Response(null, {
      status: responseStatusCode,
      headers: responseHeaders
    });
  }
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    let timeoutId = setTimeout(
      () => abort(),
      streamTimeout + 1e3
    );
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough({
            final(callback) {
              clearTimeout(timeoutId);
              timeoutId = void 0;
              callback();
            }
          });
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          pipe(body);
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
const NAVLINKS = [
  {
    id: "home",
    label: "Home",
    aria: "Navigate to the home section of the portfolio"
  },
  {
    id: "about",
    label: "About",
    aria: "Navigate to the about section where you can find detailed information about my background, skills, education, and technologies I work with"
  },
  {
    id: "projects",
    label: "Projects",
    aria: "Navigate to the projects section where you can see a showcase of projects I've worked on, highlighting my skills and experience in React engineering and UI/UX design"
  },
  {
    id: "testimonials",
    label: "Testimonials",
    aria: "Navigate to the testimonials section where you can read feedback and recommendations from my colleagues and clients"
  },
  {
    id: "contacts",
    label: "Contact",
    aria: "Navigate to the contact section where you can find ways to get in touch with me for work opportunities or collaborations"
  }
];
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
function Drawer({
  ...props
}) {
  return /* @__PURE__ */ jsx(Drawer$1.Root, { "data-slot": "drawer", ...props });
}
function DrawerPortal({
  ...props
}) {
  return /* @__PURE__ */ jsx(Drawer$1.Portal, { "data-slot": "drawer-portal", ...props });
}
function DrawerClose({
  ...props
}) {
  return /* @__PURE__ */ jsx(Drawer$1.Close, { "data-slot": "drawer-close", ...props });
}
function DrawerOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    Drawer$1.Overlay,
    {
      "data-slot": "drawer-overlay",
      className: cn(
        "fixed inset-0 z-50 bg-black/10 supports-backdrop-filter:backdrop-blur-xs data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0",
        className
      ),
      ...props
    }
  );
}
function DrawerContent({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxs(DrawerPortal, { "data-slot": "drawer-portal", children: [
    /* @__PURE__ */ jsx(DrawerOverlay, {}),
    /* @__PURE__ */ jsxs(
      Drawer$1.Content,
      {
        "data-slot": "drawer-content",
        className: cn(
          "group/drawer-content fixed z-50 flex h-auto flex-col bg-background text-sm data-[vaul-drawer-direction=bottom]:inset-x-0 data-[vaul-drawer-direction=bottom]:bottom-0 data-[vaul-drawer-direction=bottom]:mt-24 data-[vaul-drawer-direction=bottom]:max-h-[80vh] data-[vaul-drawer-direction=bottom]:rounded-t-xl data-[vaul-drawer-direction=bottom]:border-t data-[vaul-drawer-direction=left]:inset-y-0 data-[vaul-drawer-direction=left]:left-0 data-[vaul-drawer-direction=left]:w-3/4 data-[vaul-drawer-direction=left]:rounded-r-xl data-[vaul-drawer-direction=left]:border-r data-[vaul-drawer-direction=right]:inset-y-0 data-[vaul-drawer-direction=right]:right-0 data-[vaul-drawer-direction=right]:w-3/4 data-[vaul-drawer-direction=right]:rounded-l-xl data-[vaul-drawer-direction=right]:border-l data-[vaul-drawer-direction=top]:inset-x-0 data-[vaul-drawer-direction=top]:top-0 data-[vaul-drawer-direction=top]:mb-24 data-[vaul-drawer-direction=top]:max-h-[80vh] data-[vaul-drawer-direction=top]:rounded-b-xl data-[vaul-drawer-direction=top]:border-b data-[vaul-drawer-direction=left]:sm:max-w-sm data-[vaul-drawer-direction=right]:sm:max-w-sm",
          className
        ),
        ...props,
        children: [
          /* @__PURE__ */ jsx("div", { className: "mx-auto mt-4 hidden h-1 w-[100px] shrink-0 rounded-full bg-muted group-data-[vaul-drawer-direction=bottom]/drawer-content:block" }),
          children
        ]
      }
    )
  ] });
}
const useBurgerMenu = create((set) => ({
  isOpen: false,
  openBurgerMenu: () => set({ isOpen: true }),
  closeBurgerMenu: () => set({ isOpen: false })
}));
const Avatar = ({ isBurgerMenu = false }) => {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: `${isBurgerMenu ? "grid" : "hidden mb-10"}  origin-center sm:grid place-items-center`,
      children: /* @__PURE__ */ jsx("div", { className: "box-border relative rounded-full bg-bgc-dark-2 wooble-circle ", children: /* @__PURE__ */ jsx(
        "img",
        {
          alt: "Dickson Palomeras",
          width: "208",
          height: "208",
          decoding: "async",
          "data-nimg": "1",
          className: "bg-bgc-dark-2 object-cover object-20% pointer-events-none relative z-100 block size-52 rounded-full shadow-[0_0_0_10px_rgba(255,255,255,0.2),0_0_5px_2px_rgba(0,0,0,0.3)]",
          src: "/images/photo.jpeg"
        }
      ) })
    }
  );
};
const BurgerMenu = () => {
  const { isOpen, closeBurgerMenu } = useBurgerMenu();
  const { hash } = useLocation();
  const [activeId, setActiveId] = useState("home");
  useEffect(() => {
    const id = hash.replace("#", "") || "home";
    setActiveId(id);
  }, [hash]);
  return /* @__PURE__ */ jsx(
    Drawer,
    {
      direction: "right",
      open: isOpen,
      onOpenChange: (open) => !open && closeBurgerMenu(),
      children: /* @__PURE__ */ jsxs(DrawerContent, { className: "z-50 rounded-none!", children: [
        /* @__PURE__ */ jsxs("div", { className: "w-full p-4 my-4 relative", children: [
          /* @__PURE__ */ jsx(Avatar, { isBurgerMenu: true }),
          /* @__PURE__ */ jsx(DrawerClose, { asChild: true, className: "absolute right-5 top-0", children: /* @__PURE__ */ jsx("button", { className: "p-1 text-foreground/50", children: /* @__PURE__ */ jsx(Close, { size: 24 }) }) })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "h-full bg-sidebar text-sidebar-foreground", children: /* @__PURE__ */ jsx("ul", { className: "flex flex-col items-center gap-1 list-none ", children: NAVLINKS.map((link, i) => /* @__PURE__ */ jsx("li", { className: "w-full flex", children: /* @__PURE__ */ jsx(
          NavLink,
          {
            to: `#${link.id}`,
            "data-id": link.id,
            "aria-label": link.aria,
            onClick: () => closeBurgerMenu(),
            className: `py-2 w-full pl-4 border-l-5 border-transparent text-base font-medium 
                      ${activeId === link.id && "bg-sidebar-primary border-accent!"}`,
            children: link.label
          },
          i
        ) })) }) })
      ] })
    }
  );
};
const firebaseConfig = {
  apiKey: "AIzaSyCRLaMUxUTVIgMbVV5FlhbvwHsN4YbPBEc",
  authDomain: "my-portfolio-120296.firebaseapp.com",
  projectId: "my-portfolio-120296",
  storageBucket: "my-portfolio-120296.firebasestorage.app",
  messagingSenderId: "281676920902",
  appId: "1:281676920902:web:5a7a3c4461d0f867d47247",
  measurementId: "G-F0NB0PLK3Y"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const visitorService = {
  incrementVisitors: async () => {
    const hasVisited = localStorage.getItem("visited");
    if (!hasVisited) {
      localStorage.setItem("visited", "true");
      try {
        await updateDoc(doc(db, "stats", "visitors"), {
          count: increment(1)
        });
      } catch (error) {
        console.error("Error incrementing visitors:", error);
      }
    }
  },
  getLikesCount: async () => {
    const docRef = doc(db, "stats", "visitors");
    try {
      const snapshot = await getDoc(docRef);
      if (snapshot.exists()) {
        return snapshot.data().likes ?? 0;
      }
      return 0;
    } catch (error) {
      console.log(error);
      return 0;
    }
  },
  incrementLikes: async () => {
    try {
      await updateDoc(doc(db, "stats", "visitors"), {
        likes: increment(1)
      });
      localStorage.setItem("portfolio_like", "true");
    } catch (error) {
      console.error("Error incrementing likes:", error);
    }
  },
  decrementLikes: async () => {
    try {
      await updateDoc(doc(db, "stats", "visitors"), {
        likes: increment(-1)
      });
      localStorage.setItem("portfolio_like", "false");
    } catch (error) {
      console.error("Error incrementing likes:", error);
    }
  }
};
const useLikes = () => {
  const queryClient2 = useQueryClient();
  const { data: likes = 0 } = useQuery({
    queryKey: ["likes"],
    queryFn: visitorService.getLikesCount
  });
  const addLike = useMutation({
    mutationFn: visitorService.incrementLikes,
    onSuccess: () => {
      queryClient2.invalidateQueries({ queryKey: ["likes"] });
      localStorage.setItem("portfolio_like", "true");
    }
  });
  const removeLike = useMutation({
    mutationFn: visitorService.decrementLikes,
    onSuccess: () => {
      queryClient2.invalidateQueries({ queryKey: ["likes"] });
      localStorage.setItem("portfolio_like", "false");
    }
  });
  return { likes, addLike, removeLike };
};
const Header = () => {
  const { hash } = useLocation();
  const [style, setStyle] = useState({});
  const navRef = useRef(null);
  const burgerMenu = useBurgerMenu();
  const [isLiked, setIsLiked] = useState(false);
  const { likes, addLike, removeLike } = useLikes();
  useEffect(() => {
    const id = hash.replace("#", "") || "home";
    const el = navRef.current?.querySelector(
      `[data-id="${id}"]`
    );
    if (el) {
      const { offsetLeft, offsetWidth } = el;
      setStyle({
        transform: `translateX(${offsetLeft}px)`,
        width: offsetWidth
      });
    }
  }, [hash]);
  useEffect(() => {
    const sectionElems = {};
    NAVLINKS.forEach((link) => {
      sectionElems[link.id] = document.getElementById(link.id);
    });
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight / 2;
      for (const link of NAVLINKS) {
        const sec = sectionElems[link.id];
        if (!sec) continue;
        const top = sec.offsetTop;
        const bottom = top + sec.offsetHeight;
        if (scrollPos >= top && scrollPos < bottom) {
          const el = navRef.current?.querySelector(
            `[data-id="${link.id}"]`
          );
          if (el) {
            setStyle({
              transform: `translateX(${el.offsetLeft}px)`,
              width: el.offsetWidth
            });
          }
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [NAVLINKS]);
  useEffect(() => {
    const liked = localStorage.getItem("portfolio_like");
    setIsLiked(liked ? JSON.parse(liked) : false);
  }, [likes]);
  const tougleLikes = () => {
    if (isLiked) {
      removeLike.mutate();
    }
    if (!isLiked) {
      addLike.mutate();
    }
  };
  return /* @__PURE__ */ jsxs("nav", { className: "flex justify-between w-full px-2 py-3 mx-auto h-13 max-w-wide", children: [
    /* @__PURE__ */ jsx("div", { "aria-label": "Navigate to the home section of the portfolio", children: /* @__PURE__ */ jsxs(
      "a",
      {
        href: "#home",
        className: "flex items-center gap-1.5 mr-auto text-xl cursor-pointer font-raleway font-bold italic",
        children: [
          /* @__PURE__ */ jsx("span", { className: "text-foreground", children: "Vitalii" }),
          /* @__PURE__ */ jsx("span", { className: "text-accent ", children: "Hulaievych" })
        ]
      }
    ) }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxs("div", { className: "relative hidden mr-2 md:flex", children: [
        /* @__PURE__ */ jsx("ul", { ref: navRef, className: "flex items-center gap-8 list-none", children: NAVLINKS.map((link, i) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
          NavLink,
          {
            to: `#${link.id}`,
            "data-id": link.id,
            className: "pb-2",
            "aria-label": link.aria,
            children: link.label
          }
        ) }, i)) }),
        /* @__PURE__ */ jsx(
          "span",
          {
            className: "absolute -bottom-4 h-0.5 bg-accent transition-all duration-300",
            style
          }
        )
      ] }),
      /* @__PURE__ */ jsxs(
        "button",
        {
          className: "p-1 gap-1 flex  items-center  px-2 py-1 rounded-2xl bg-bgc-dark-2 text-red",
          "aria-label": "Like this portfolio",
          onClick: () => tougleLikes(),
          children: [
            /* @__PURE__ */ jsx(Heart, { size: 22, filled: isLiked }),
            /* @__PURE__ */ jsx("span", { children: likes || 0 })
          ]
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          className: "p-1 text-foreground/50 md:hidden",
          "aria-label": "Open menu",
          onClick: () => burgerMenu.openBurgerMenu(),
          children: /* @__PURE__ */ jsx(Menu, { size: 24, filled: true })
        }
      )
    ] }),
    /* @__PURE__ */ jsx(BurgerMenu, {})
  ] });
};
const Tooltip = ({ value }) => {
  return /* @__PURE__ */ jsxs("div", { className: "absolute px-3 py-2 mb-2 text-xs text-foreground transition-all duration-300 scale-0 -translate-x-1/2 bg-black rounded-md opacity-0 bottom-full left-1/2 whitespace-nowrap", children: [
    value,
    /* @__PURE__ */ jsx("div", { className: "absolute w-2 h-2 rotate-45 -translate-x-1/2 bg-black left-1/2 -bottom-1" })
  ] });
};
const SocialLinks = () => {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: "w-8 h-8 relative [&>a]:opacity-30 [&>a:hover]:opacity-100 hover:[&>div]:opacity-100 hover:[&>div]:scale-100", children: [
      /* @__PURE__ */ jsx(
        "a",
        {
          className: "transition-all duration-300",
          href: "https://www.facebook.com/v.hulaievych",
          target: "_blank",
          rel: "noopener noreferrer",
          children: /* @__PURE__ */ jsxs("svg", { fill: "#000000", viewBox: "0 0 128 128", className: "", children: [
            /* @__PURE__ */ jsx("rect", { width: "128", height: "128", rx: "15", fill: "white" }),
            /* @__PURE__ */ jsx(
              "path",
              {
                fill: "black",
                d: "M86.48 123.17V77.34h15.38l2.3-17.86H86.48v-11.4c0-5.17 1.44-8.7 8.85-8.7h9.46v-16A126.56 126.56 0 0091 22.7c-13.62 0-23 8.3-23 23.61v13.17H52.62v17.86H68v45.83z"
              }
            )
          ] })
        }
      ),
      /* @__PURE__ */ jsx(Tooltip, { value: "Facebook" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "w-8 h-8 relative [&>a]:opacity-30 [&>a:hover]:opacity-100 hover:[&>div]:opacity-100 hover:[&>div]:scale-100", children: [
      /* @__PURE__ */ jsx(
        "a",
        {
          className: "transition-all duration-300",
          href: "http://www.linkedin.com/in/vitalii-hulaievych-6a623b349",
          target: "_blank",
          rel: "noopener noreferrer",
          children: /* @__PURE__ */ jsxs("svg", { fill: "#000000", viewBox: "0 0 128 128", className: "", children: [
            /* @__PURE__ */ jsx("rect", { width: "128", height: "128", rx: "15", fill: "white" }),
            /* @__PURE__ */ jsx(
              "path",
              {
                fill: "black",
                d: "M36.5 50H52v56H36.5zM44.25 22c-5.33 0-9.25 3.91-9.25 9 0 5.06 3.84 9 9.08 9h.1c5.4 0 9.25-3.94 9.25-9-0.1-5.1-3.85-9-9.18-9zM58 50h14.5v7.61h.21c2-3.62 7-7.41 14.4-7.41C101.75 50.2 108 55.6 108 67.6V106H92.5V70.88c0-7.7-2.75-12.95-9.64-12.95-5.25 0-8.37 3.54-9.75 6.97-.5 1.16-.62 2.75-.62 4.37V106H58z"
              }
            )
          ] })
        }
      ),
      /* @__PURE__ */ jsx(Tooltip, { value: "Linked In" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "w-8 h-8 relative [&>a]:opacity-30 [&>a:hover]:opacity-100 hover:[&>div]:opacity-100 hover:[&>div]:scale-100", children: [
      /* @__PURE__ */ jsx(
        "a",
        {
          className: "transition-all duration-300",
          href: "https://github.com/Vitalii120296",
          target: "_blank",
          rel: "noopener noreferrer",
          children: /* @__PURE__ */ jsxs("svg", { fill: "#000000", viewBox: "0 0 128 128", className: "", children: [
            /* @__PURE__ */ jsx("rect", { width: "128", height: "128", rx: "15", fill: "white" }),
            /* @__PURE__ */ jsx(
              "path",
              {
                fill: "black",
                d: "M64 12C34.6 12 12 34.6 12 64c0 23 14.9 42.5 35.6 49.4 2.6.5 3.5-1.1 3.5-2.4v-8.6c-14.5 3.2-17.6-7-17.6-7-2.4-6.1-5.9-7.7-5.9-7.7-4.8-3.2.4-3.2.4-3.2 5.3.4 8.1 5.4 8.1 5.4 4.7 8.1 12.2 5.8 15.2 4.4.5-3.4 1.9-5.8 3.4-7.1-11.6-1.3-23.9-5.8-23.9-25.9 0-5.7 2-10.3 5.3-13.9-.5-1.3-2.3-6.6.5-13.7 0 0 4.4-1.4 14.4 5.3a49.5 49.5 0 0126.2 0c10-6.7 14.4-5.3 14.4-5.3 2.8 7.1 1 12.4.5 13.7 3.3 3.6 5.3 8.2 5.3 13.9 0 20.2-12.3 24.6-24 25.9 1.9 1.7 3.6 4.9 3.6 9.8v14.5c0 1.3.9 2.9 3.5 2.4A52.2 52.2 0 00116 64c0-29.4-23.6-52-52-52z"
              }
            )
          ] })
        }
      ),
      /* @__PURE__ */ jsx(Tooltip, { value: "Git Hub" })
    ] })
  ] });
};
const Footer = () => {
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col-reverse items-center justify-between w-full px-4 py-10 text-xs gap-y-5 sm:px-6 md:px-10 bg-background", children: [
    /* @__PURE__ */ jsx("p", { children: `© ${(/* @__PURE__ */ new Date()).getFullYear()} Vitalii Hulaievych. All rights reserved.` }),
    /* @__PURE__ */ jsx("div", { className: "flex justify-between w-40 ", children: /* @__PURE__ */ jsx(SocialLinks, {}) })
  ] });
};
const queryClient = new QueryClient();
const links = () => [{
  rel: "preconnect",
  href: "https://fonts.googleapis.com"
}, {
  rel: "preconnect",
  href: "https://fonts.gstatic.com",
  crossOrigin: "anonymous"
}, {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
}];
function Layout({
  children
}) {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      children: [children, /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
}
const root = UNSAFE_withComponentProps(function App() {
  const [scrolled, setScrolled] = useState(false);
  const [fixedHeader, setFixedHeader] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY === 0) {
        setFixedHeader(false);
      }
      if (scrollY > 64) {
        setFixedHeader(true);
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return /* @__PURE__ */ jsx(Fragment, {
    children: /* @__PURE__ */ jsxs(QueryClientProvider, {
      client: queryClient,
      children: [/* @__PURE__ */ jsx("header", {
        className: `flex z-40 w-full bg-background border-b border-b-border
          ${fixedHeader && "fixed inset-x-0 top-0 animate-header-appear shadow-lg"}`,
        children: /* @__PURE__ */ jsx(Header, {})
      }), /* @__PURE__ */ jsx("main", {
        className: "flex flex-col flex-1 w-full mx-auto bg-bgc-dark-2",
        children: /* @__PURE__ */ jsx(Outlet, {})
      }), /* @__PURE__ */ jsx("footer", {
        className: "bg-bgc-dark-2",
        children: /* @__PURE__ */ jsx(Footer, {})
      }), /* @__PURE__ */ jsx(ReactQueryDevtools, {
        initialIsOpen: false
      })]
    })
  });
});
const ErrorBoundary = UNSAFE_withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "container p-4 pt-16 mx-auto",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: details
    }), stack]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout,
  default: root,
  links
}, Symbol.toStringTag, { value: "Module" }));
const variantStyles = {
  primary: " bg-white text-black border border-transparent hover:bg-white/80 rounded-full",
  secondary: "bg-background text-foreground border border-border hover:bg-white/5 rounded-full",
  wide: "bg-white text-black border border-transparent w-full hover:bg-white/80 rounded-md"
};
const Button = ({
  children,
  variant,
  disabled = false,
  onClick
}) => {
  return /* @__PURE__ */ jsx(
    "button",
    {
      disabled,
      onClick,
      className: `px-6  items-center justify-center whitespace-nowrap leading-5 py-2 
          transition-all duration-300 active:scale-110 font-medium ${variantStyles[variant]} ${disabled && "bg-white/30!"}`,
      children
    }
  );
};
const useScrollSpy = (ids) => {
  useEffect(() => {
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry2) => {
          if (entry2.isIntersecting) {
            const id = entry2.target.getAttribute("id");
            if (id) {
              window.history.replaceState(null, "", `#${id}`);
            }
          }
        });
      },
      {
        threshold: 0.6
      }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [ids]);
};
const IMAGES = [
  { name: "React", href: "./app/assets/icons/languages/react.png" },
  { name: "Typescript", href: "./app/assets/icons/languages/typescript.svg" },
  { name: "Javascript", href: "./app/assets/icons/languages/javascript.svg" },
  { name: "Html5", href: "./app/assets/icons/languages/html5.svg" },
  { name: "Express JS", href: "./app/assets/icons/languages/express-js.svg" },
  { name: "Node JS", href: "./app/assets/icons/languages/node-js.svg" },
  {
    name: "I18next",
    href: "./app/assets/icons/languages/i18next.svg"
  },
  {
    name: "React router",
    href: "./app/assets/icons/languages/react-router.svg"
  },
  { name: "Css", href: "./app/assets/icons/languages/css.svg" },
  { name: "Sass", href: "./app/assets/icons/languages/sass.svg" },
  {
    name: "Tailwind Css",
    href: "./app/assets/icons/languages/tailwind-css.svg"
  },
  { name: "Redux", href: "./app/assets/icons/languages/redux.svg" },
  { name: "Postgresql", href: "./app/assets/icons/languages/postgresql.svg" },
  {
    name: "Framer Motion",
    href: "./app/assets/icons/languages/framer.svg"
  },
  {
    name: "Webpack",
    href: "./app/assets/icons/languages/webpack.svg"
  },
  {
    name: "Git",
    href: "./app/assets/icons/languages/git.svg"
  },
  {
    name: "Github",
    href: "./app/assets/icons/languages/github.svg"
  },
  {
    name: "Jest",
    href: "./app/assets/icons/languages/jest-snapshot.svg"
  },
  {
    name: "Postman",
    href: "./app/assets/icons/languages/postman.svg"
  },
  {
    name: "Docker",
    href: "./app/assets/icons/languages/docker.svg"
  },
  {
    name: "React Hook Form",
    href: "./app/assets/icons/languages/react-hook-form.svg"
  },
  {
    name: "Tanstack Query",
    href: "./app/assets/icons/languages/tanstack.svg"
  }
];
const LanguagesCarousel = () => {
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-row w-full py-8 overflow-hidden carousel-container will-change-transform", children: [
    /* @__PURE__ */ jsx("div", { className: "flex shrink-0 animate-carousel", children: [...IMAGES].map(({ name, href }, i) => /* @__PURE__ */ jsx(
      "div",
      {
        className: "px-6 transition-all duration-300 shrink-0 hover:scale-110 ",
        children: /* @__PURE__ */ jsx(
          "img",
          {
            src: href,
            alt: name,
            className: "w-auto h-10 sm:h-12 opacity-80 hover:opacity-100 drop-shadow-lg",
            loading: "lazy"
          }
        )
      },
      i
    )) }),
    /* @__PURE__ */ jsx("div", { className: "flex shrink-0 animate-carousel", children: [...IMAGES].map(({ name, href }, i) => /* @__PURE__ */ jsx(
      "div",
      {
        className: "px-6 transition-all duration-300 shrink-0 hover:scale-110",
        children: /* @__PURE__ */ jsx(
          "img",
          {
            src: href,
            alt: name,
            className: "w-auto h-10 sm:h-12 opacity-80 hover:opacity-100 drop-shadow-lg",
            loading: "lazy"
          }
        )
      },
      i
    )) }),
    /* @__PURE__ */ jsx("div", { className: "absolute inset-y-0 left-0 flex w-1/4 pointer-events-none bg-linear-to-r from-bgc-dark-2" }),
    /* @__PURE__ */ jsx("div", { className: "absolute inset-y-0 right-0 flex w-1/4 pointer-events-none bg-linear-to-l from-bgc-dark-2" })
  ] });
};
const Carousel = () => {
  return /* @__PURE__ */ jsx(
    "section",
    {
      className: "w-full",
      id: "carousel",
      "aria-label": "Carousel showcasing various programming languages and technologies I work with",
      children: /* @__PURE__ */ jsx(LanguagesCarousel, {})
    }
  );
};
const SmallText = ({ value, className = "" }) => {
  return /* @__PURE__ */ jsx(
    "span",
    {
      className: `block mb-3 text-xs tracking-wide uppercase text-neutral-400/55 ${className}`,
      children: value
    }
  );
};
const About$1 = () => {
  const [visitors, setVisitors] = useState(0);
  const expYears = (from, to) => {
    let years = to.getFullYear() - from.getFullYear();
    if (from.getMonth() > to.getMonth()) years--;
    return years;
  };
  useEffect(() => {
    visitorService.incrementVisitors();
    const unsub = onSnapshot(doc(db, "stats", "visitors"), (snap) => {
      setVisitors(snap.data()?.count || 0);
    });
    return () => unsub();
  }, []);
  return /* @__PURE__ */ jsxs(
    "section",
    {
      className: "flex flex-col w-full px-5 mx-auto lg:px-10 pt-15 md:pt-32 max-w-desktop",
      id: "about",
      "aria-label": "Detailed information about my background, skills, education, and technologies I work with",
      children: [
        /* @__PURE__ */ jsx("h1", { className: "mb-10 text-3xl font-bold tracking-wide text-center title-underline md:mb-14 md:text-5xl", children: "ABOUT" }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-10 md:flex-row gap-x-10 lg:gap-x-30", children: [
          /* @__PURE__ */ jsxs("div", { className: "md:w-1/2", children: [
            /* @__PURE__ */ jsxs("div", { className: "mb-10", children: [
              /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(SmallText, { value: "Introduction" }) }),
              /* @__PURE__ */ jsx("div", { className: "", children: /* @__PURE__ */ jsxs("h2", { className: "text-2xl leading-tight md:text-4xl", children: [
                "👋Hi, I'm",
                " ",
                /* @__PURE__ */ jsx("span", { className: "text-accent", children: "Vitalii Hulaievych" })
              ] }) }),
              /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("h4", { className: "py-5 text-xl italic leading-relaxed text-foreground", children: "Turning concepts into code and visions into reality." }) }),
              /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("p", { className: "mt-2 text-sm font-light leading-relaxed tracking-wide text-foreground/55", children: [
                "Since the beginning of my journey as a",
                " ",
                /* @__PURE__ */ jsx("span", { children: "React Engineer" }),
                ", I've created successful, responsive websites that are fast, user-friendly, and built with best practices in mind."
              ] }) }),
              /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm font-light leading-relaxed tracking-wide text-foreground/55", children: "I'm quietly confident, naturally curious, and continuously honing my skills—solving one problem at a time while striving for excellence in every project." }) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mb-6 [&>div]:mb-2", children: [
              /* @__PURE__ */ jsx(SmallText, { value: "Main Skills" }),
              /* @__PURE__ */ jsx("div", { className: "relative", children: /* @__PURE__ */ jsxs("div", { className: "px-6 py-5 bg-background rounded-xl", children: [
                /* @__PURE__ */ jsx("h4", { className: "text-xl leading-tight tracking-wide text-accent", children: "React Engineering" }),
                /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm", children: "Building scalable, maintainable web apps with modern frameworks like React and Next.js." }),
                /* @__PURE__ */ jsx("span", { className: "absolute right-6 top-5 text-accent", children: /* @__PURE__ */ jsx(Code, { size: 24 }) })
              ] }) }),
              /* @__PURE__ */ jsx("div", { className: "relative", children: /* @__PURE__ */ jsxs("div", { className: "px-6 py-5 bg-background rounded-xl", children: [
                /* @__PURE__ */ jsx("h4", { className: "text-xl leading-tight tracking-wide text-accent", children: "UI/UX & Design Systems" }),
                /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm", children: "Crafting intuitive, visually polished interfaces with a strong focus on UX." }),
                /* @__PURE__ */ jsx("span", { className: "absolute right-6 top-5 text-accent", children: /* @__PURE__ */ jsx(EditLine, { size: 24 }) })
              ] }) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mb-6 [&>div]:mb-2", children: [
              /* @__PURE__ */ jsx(SmallText, { value: "Education & Certifications" }),
              /* @__PURE__ */ jsx("div", { className: "relative", children: /* @__PURE__ */ jsxs("div", { className: "px-6 py-5 bg-background rounded-xl", children: [
                /* @__PURE__ */ jsx("h4", { className: "text-xl leading-tight tracking-wide text-accent", children: "BS in Information Technology" }),
                /* @__PURE__ */ jsx("p", { className: "text-xs text-foreground/60", children: "Major in Information System" }),
                /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm", children: "Partido State University - Goa, Camarines Sur" }),
                /* @__PURE__ */ jsx("span", { className: "absolute right-6 top-5 text-accent", children: /* @__PURE__ */ jsx(Code, { size: 24 }) })
              ] }) }),
              /* @__PURE__ */ jsx("div", { className: "relative", children: /* @__PURE__ */ jsxs("div", { className: "px-6 py-5 bg-background rounded-xl", children: [
                /* @__PURE__ */ jsx("h4", { className: "text-xl leading-tight tracking-wide text-accent", children: "MINDTECH" }),
                /* @__PURE__ */ jsx("p", { className: "text-xs text-foreground/60", children: "Training and Development Institute Inc." }),
                /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm", children: "Rosario, Pasig City" }),
                /* @__PURE__ */ jsx("span", { className: "absolute right-6 top-5 text-accent", children: /* @__PURE__ */ jsx(EditLine, { size: 24 }) })
              ] }) })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "md:w-1/2", children: [
            /* @__PURE__ */ jsxs("div", { className: "mb-10", children: [
              /* @__PURE__ */ jsx(SmallText, { value: "Technologies" }),
              /* @__PURE__ */ jsx("div", { className: "grid grid-cols-4 place-items-center gap-y-10", children: [...IMAGES].map(({ name, href }, i) => /* @__PURE__ */ jsxs(
                "div",
                {
                  className: "flex flex-col px-3 transition-all duration-300 ease-in-out shrink-0 w-fulw opacity-70 hover:opacity-100 drop-shadow-lg not-hover:grayscale cursor-cool",
                  children: [
                    /* @__PURE__ */ jsx(
                      "img",
                      {
                        src: href,
                        alt: name,
                        className: "object-contain h-12 transition-all",
                        loading: "lazy"
                      }
                    ),
                    /* @__PURE__ */ jsx("span", { className: "mt-3 text-xs text-center text-accent", children: name })
                  ]
                },
                i
              )) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mb-10", children: [
              /* @__PURE__ */ jsx(SmallText, { value: "Metrics" }),
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3 sm:grid-cols-4 font-geist", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex flex-col w-full gap-2 text-5xl font-bold text-center md:text-3xl lg:text-5xl", children: [
                  /* @__PURE__ */ jsxs("p", { className: "text-accent ", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-foreground ", children: "7" }),
                    "+"
                  ] }),
                  /* @__PURE__ */ jsx("p", { className: "text-sm font-normal whitespace-normal text-foreground/50 font-raleway", children: "Projects completed" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex flex-col w-full gap-2 text-5xl font-bold text-center md:text-3xl lg:text-5xl", children: [
                  /* @__PURE__ */ jsxs("p", { className: "text-accent", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-foreground", children: "100" }),
                    "%"
                  ] }),
                  /* @__PURE__ */ jsx("p", { className: "text-sm font-normal whitespace-normal text-foreground/50 font-raleway", children: "Positive Client Feedback" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex flex-col w-full gap-2 text-5xl font-bold text-center md:text-3xl lg:text-5xl", children: [
                  /* @__PURE__ */ jsxs("p", { className: "text-accent", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-foreground", children: `${expYears(/* @__PURE__ */ new Date("2024.09.01"), /* @__PURE__ */ new Date())}` }),
                    "+"
                  ] }),
                  /* @__PURE__ */ jsx("p", { className: "text-sm font-normal whitespace-normal text-foreground/50 font-raleway", children: "Years of Experience" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex flex-col w-full gap-2 text-5xl font-bold text-center md:text-3xl lg:text-5xl", children: [
                  /* @__PURE__ */ jsx("p", { className: "text-accent", children: /* @__PURE__ */ jsx("span", { className: "text-foreground", children: visitors }) }),
                  /* @__PURE__ */ jsx("p", { className: "text-sm font-normal whitespace-normal text-foreground/50 font-raleway", children: "Total Unique Visitors" })
                ] })
              ] })
            ] })
          ] })
        ] })
      ]
    }
  );
};
const PROJECTS = [
  {
    id: "snowy_smiles",
    name: "Snowy Smiles (Commercial Project)",
    img: "./app/assets/projects/Snowy_smiles.png",
    description: "A website for a teeth whitening and dental cleaning clinic, developed as a paid client project. The goal was to create a trustworthy and modern online presence tailored to the healthcare and beauty industry.",
    link: "https://snowysmiles.org/"
  },
  {
    id: "elegant_beauti_studio",
    name: "Elegant Beauty Studio (Commercial Project)",
    img: "./app/assets/projects/Elegant_beauty_studio.png",
    description: "A beauty salon website developed for a real client based in the United States, offering a wide range of beauty services. The project was created on a contractual basis and is actively used by the client to present services online.",
    link: "https://elegantbeautystudio.us/"
  },
  {
    id: "nice_gadgets",
    name: "Online store: 'Nice Gadgets'",
    img: "./app/assets/projects/niceGadgets.png",
    description: "An online gadget store with thoughtful cataloging, product filtering, and modern UI design. The layout is implemented following e-commerce UX principles.",
    link: "https://vitalii120296.github.io/react_phone-catalog/"
  },
  {
    id: "nothing",
    name: "Landing page: 'Nothing'",
    img: "./app/assets/projects/nothing.png",
    description: "A landing page for the Nothing brand — with a focus on minimalism and stylish visual presentation. Responsive design and effective use of modern CSS techniques.",
    link: "https://vitalii120296.github.io/layout_landing-page/"
  },
  {
    id: "2048_game",
    name: "2048 game",
    img: "./app/assets/projects/2048.png",
    description: "Implementation of the popular 2048 game using pure JavaScript. Includes tile merging logic, win/loss states, and a responsive and user-friendly interface.",
    link: "https://vitalii120296.github.io/js_2048_game/"
  },
  {
    id: "dia",
    name: "Landing page: 'Dia'",
    img: "./app/assets/projects/dia.png",
    description: "A single-page website for a strategic consulting agency. Clean design, responsive layout, and modern, maintainable code.",
    link: "https://vitalii120296.github.io/layout_dia/"
  }
];
const projectService = {
  getProjectLikes: async () => {
    const snapshot = await getDocs(collection(db, "projects"));
    return snapshot.docs.map((doc2) => ({
      id: doc2.id,
      likes: doc2.data().likes
    }));
  },
  incrementProjectLike: async (id) => {
    const docRef = doc(db, "projects", id);
    await updateDoc(docRef, {
      likes: increment(1)
    });
    const snapshot = await getDoc(docRef);
    if (!snapshot.exists()) return null;
    return {
      id: snapshot.id,
      likes: snapshot.data().likes
    };
  },
  decrementProjectLike: async (id) => {
    const docRef = doc(db, "projects", id);
    await updateDoc(docRef, {
      likes: increment(-1)
    });
    const snapshot = await getDoc(docRef);
    if (!snapshot.exists()) return null;
    return {
      id: snapshot.id,
      likes: snapshot.data().likes
    };
  }
};
const useProjects = () => {
  const queryClient2 = useQueryClient();
  const { data } = useQuery({
    queryKey: ["projects"],
    queryFn: projectService.getProjectLikes
  });
  const addLike = useMutation({
    mutationFn: projectService.incrementProjectLike,
    onSuccess: () => {
      queryClient2.invalidateQueries({ queryKey: ["projects"] });
    }
  });
  const removeLike = useMutation({
    mutationFn: projectService.decrementProjectLike,
    onSuccess: () => {
      queryClient2.invalidateQueries({ queryKey: ["projects"] });
    }
  });
  return { data, addLike, removeLike };
};
const Projects = () => {
  const { data, addLike, removeLike } = useProjects();
  const [likedProject, setLikedProject] = useState([]);
  console.log(likedProject);
  const isLiked = (id) => likedProject.some((p) => p.id === id);
  useEffect(() => {
    const storage = localStorage.getItem("projects");
    setLikedProject(storage ? JSON.parse(storage) : []);
  }, []);
  const tougleLike = async (id) => {
    if (!data) return;
    console.log(isLiked(id));
    if (isLiked(id)) {
      removeLike.mutate(id);
      const unliked = [...likedProject.filter((p) => p.id !== id)];
      setLikedProject(unliked);
      localStorage.setItem("projects", JSON.stringify(unliked));
    } else {
      addLike.mutate(id);
      const liked = [...likedProject, { id }];
      setLikedProject(liked);
      localStorage.setItem("projects", JSON.stringify(liked));
    }
  };
  return /* @__PURE__ */ jsxs(
    "section",
    {
      className: "relative flex flex-col pt-20 mb-4 bg-black md:pt-28 lg:pt-40 xl:pt-55",
      id: "projects",
      "aria-label": "Showcase of projects I've worked on, highlighting my skills and experience in React engineering and UI/UX design",
      children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-x-0 z-10 pointer-events-none select-none -top-1 ", children: /* @__PURE__ */ jsx(
          "svg",
          {
            className: "w-full h-full",
            viewBox: "0 0 1430 240",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg",
            children: /* @__PURE__ */ jsx("g", { children: /* @__PURE__ */ jsx(
              "path",
              {
                d: "M0,160L6.2,176C12.3,192,25,224,37,208C49.2,192,62,128,74,90.7C86.2,53,98,43,\n      111,74.7C123.1,107,135,181,148,186.7C160,192,172,128,185,112C196.9,96,\n      209,128,222,138.7C233.8,149,246,139,258,144C270.8,149,283,171,295,\n      197.3C307.7,224,320,256,332,229.3C344.6,203,357,117,369,101.3C381.5,85,\n      394,139,406,176C418.5,213,431,235,443,208C455.4,181,468,107,480,\n      106.7C492.3,107,505,181,517,197.3C529.2,213,542,171,554,133.3C566.2,96,\n      578,64,591,74.7C603.1,85,615,139,628,154.7C640,171,652,149,665,138.7C676.9,\n      128,689,128,702,122.7C713.8,117,726,107,738,96C750.8,85,763,75,775,\n      74.7C787.7,75,800,85,812,90.7C824.6,96,837,96,849,106.7C861.5,117,874,139,\n      886,149.3C898.5,160,911,160,923,160C935.4,160,948,160,960,160C972.3,160,\n      985,160,997,170.7C1009.2,181,1022,203,1034,186.7C1046.2,171,1058,117,1071,\n      128C1083.1,139,1095,213,1108,229.3C1120,245,1132,203,1145,170.7C1156.9,139,\n      1169,117,1182,106.7C1193.8,96,1206,96,1218,90.7C1230.8,85,1243,75,1255,\n      74.7C1267.7,75,1280,85,1292,106.7C1304.6,128,1317,160,1329,181.3C1341.5,203,\n      1354,213,1366,218.7C1378.5,224,1391,224,1403,213.3C1415.4,203,1428,181,\n      1434,170.7L1440,160L1440,0L0,0Z",
                fill: "#25262A"
              }
            ) })
          }
        ) }),
        /* @__PURE__ */ jsx("h1", { className: "mb-4 text-3xl font-bold tracking-wide text-center title-underline md:text-5xl", children: "PROJECTS" }),
        /* @__PURE__ */ jsx("div", { className: "", children: /* @__PURE__ */ jsx("p", { className: "w-full mx-auto mb-10 tracking-wide text-center text-foreground/50", children: "Some Cool Stuff I've Worked On" }) }),
        /* @__PURE__ */ jsxs("div", { className: "relative flex flex-col items-center px-10 overflow-hidden max-h-125 sm:max-h-155 sm:flex-row pb-14 will-change-transform carousel-container", children: [
          /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-10 pt-10 sm:py-10 max-sm:w-full sm:pr-10 sm:flex-row flex-nowrap animate-carousel-vertical animate-carousel-sm", children: PROJECTS.map((proj, index) => /* @__PURE__ */ jsxs(
            "div",
            {
              className: "flex flex-col flex-none w-full p-1 overflow-hidden border h-130 sm:w-130  bg-card rounded-2xl border-border",
              children: [
                /* @__PURE__ */ jsx("div", { className: "min-h-[50%] sm:min-h-[70%]  overflow-hidden rounded-2xl", children: /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: proj.img,
                    alt: proj.name,
                    className: "object-cover w-full rounded-2xl"
                  }
                ) }),
                /* @__PURE__ */ jsxs("div", { className: "flex flex-col h-full gap-1 px-4 py-2", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex justify-between ", children: [
                    /* @__PURE__ */ jsx("p", { className: "font-semibold", children: proj.name }),
                    /* @__PURE__ */ jsxs(
                      "button",
                      {
                        className: "flex items-center gap-1 text-red",
                        onClick: () => {
                          tougleLike(proj.id);
                        },
                        children: [
                          /* @__PURE__ */ jsx(Heart, { size: 22, filled: isLiked(proj.id) }),
                          /* @__PURE__ */ jsx("span", { children: data?.find((p) => p.id === proj.id)?.likes ?? 0 })
                        ]
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsx(SmallText, { value: proj.description })
                ] })
              ]
            },
            proj.id
          )) }),
          /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-10 pt-10 sm:py-10 max-sm:w-full sm:pr-10 sm:flex-row flex-nowrap animate-carousel-vertical animate-carousel-sm", children: PROJECTS.map((proj, index) => /* @__PURE__ */ jsxs(
            "div",
            {
              className: "flex flex-col flex-none w-full p-1 overflow-hidden border h-130 sm:w-130  bg-card rounded-2xl border-border",
              children: [
                /* @__PURE__ */ jsx("div", { className: "min-h-[50%] sm:min-h-[70%] rounded-2xl overflow-hidden ", children: /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: proj.img,
                    alt: proj.name,
                    className: "object-cover w-full"
                  }
                ) }),
                /* @__PURE__ */ jsxs("div", { className: "flex flex-col h-full gap-1 px-4 py-2", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex justify-between ", children: [
                    /* @__PURE__ */ jsx("p", { className: "font-semibold", children: proj.name }),
                    /* @__PURE__ */ jsxs(
                      "button",
                      {
                        className: "flex items-center gap-1 text-red",
                        onClick: () => {
                          tougleLike(proj.id);
                        },
                        children: [
                          /* @__PURE__ */ jsx(Heart, { size: 22, filled: isLiked(proj.id) }),
                          /* @__PURE__ */ jsx("span", { children: data?.find((p) => p.id === proj.id)?.likes ?? 0 })
                        ]
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsx(SmallText, { value: proj.description })
                ] })
              ]
            },
            proj.id
          )) }),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-y-0 left-0 hidden w-1/4 pointer-events-none bg-linear-to-r from-black sm:flex" }),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-y-0 right-0 hidden w-1/4 pointer-events-none bg-linear-to-l from-black sm:flex" }),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-x-0 top-0 flex pointer-events-none h-1/8 bg-linear-to-b from-black sm:hidden" }),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-x-0 bottom-0 flex pointer-events-none h-1/8 bg-linear-to-t from-black sm:hidden" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 z-10 w-full overflow-hidden translate-y-4", children: /* @__PURE__ */ jsx(
          "svg",
          {
            className: "w-full h-full max-h-14 max-md:h-10",
            viewBox: "0 24 150 28",
            preserveAspectRatio: "none",
            shapeRendering: "auto",
            "aria-hidden": "true",
            focusable: "false",
            children: /* @__PURE__ */ jsxs("g", { className: "animate-wave", children: [
              /* @__PURE__ */ jsx(
                "path",
                {
                  d: "M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z",
                  fill: "rgba(54, 57, 62, 0.7)",
                  style: {
                    animationDelay: "2s",
                    animationDuration: "7s"
                  },
                  transform: "translate(-150 0)"
                }
              ),
              /* @__PURE__ */ jsx(
                "path",
                {
                  d: "M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z",
                  fill: "rgba(54, 57, 62, 0.5)",
                  style: {
                    animationDelay: "3s",
                    animationDuration: "10s"
                  },
                  transform: "translate(-150 0)"
                }
              ),
              /* @__PURE__ */ jsx(
                "path",
                {
                  d: "M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z",
                  fill: "rgba(54, 57, 62, 0.3)",
                  style: {
                    animationDelay: "4s",
                    animationDuration: "13s"
                  },
                  transform: "translate(-150 0)"
                }
              ),
              /* @__PURE__ */ jsx(
                "path",
                {
                  d: "M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z",
                  fill: "rgba(37, 38, 42, 0.9)",
                  style: {
                    animationDelay: "5s",
                    animationDuration: "20s"
                  }
                }
              )
            ] })
          }
        ) })
      ]
    }
  );
};
const MyCv = () => {
  return /* @__PURE__ */ jsxs(
    "section",
    {
      className: "relative grid w-full px-5 mx-auto overflow-hidden bg-black place-items-center lg:px-10 py-15 md:py-32",
      "aria-label": "Download my CV",
      children: [
        /* @__PURE__ */ jsx(
          "svg",
          {
            className: "absolute z-10 w-full h-24 rotate-180 -top-2 text-bgc-dark-2 min-w-3xl md:h-32 lg:h-48 xl:h-80",
            viewBox: "0 0 1440 320",
            preserveAspectRatio: "none",
            fill: "currentColor",
            children: /* @__PURE__ */ jsx("path", { d: "M0,128L0,32L36.9,32L36.9,96L73.8,96L73.8,192L110.8,192L110.8,64L147.7,64L147.7,160L184.6,160L184.6,224L221.5,224L221.5,64L258.5,64L258.5,320L295.4,320L295.4,288L332.3,288L332.3,128L369.2,128L369.2,288L406.2,288L406.2,128L443.1,128L443.1,224L480,224L480,192L516.9,192L516.9,192L553.8,192L553.8,256L590.8,256L590.8,96L627.7,96L627.7,192L664.6,192L664.6,32L701.5,32L701.5,64L738.5,64L738.5,224L775.4,224L775.4,64L812.3,64L812.3,160L849.2,160L849.2,160L886.2,160L886.2,320L923.1,320L923.1,128L960,128L960,224L996.9,224L996.9,192L1033.8,192L1033.8,128L1070.8,128L1070.8,192L1107.7,192L1107.7,96L1144.6,96L1144.6,192L1181.5,192L1181.5,256L1218.5,256L1218.5,128L1255.4,128L1255.4,32L1292.3,32L1292.3,192L1329.2,192L1329.2,320L1366.2,320L1366.2,160L1403.1,160L1403.1,288L1440,288L1440,320L1403.1,320L1403.1,320L1366.2,320L1366.2,320L1329.2,320L1329.2,320L1292.3,320L1292.3,320L1255.4,320L1255.4,320L1218.5,320L1218.5,320L1181.5,320L1181.5,320L1144.6,320L1144.6,320L1107.7,320L1107.7,320L1070.8,320L1070.8,320L1033.8,320L1033.8,320L996.9,320L996.9,320L960,320L960,320L923.1,320L923.1,320L886.2,320L886.2,320L849.2,320L849.2,320L812.3,320L812.3,320L775.4,320L775.4,320L738.5,320L738.5,320L701.5,320L701.5,320L664.6,320L664.6,320L627.7,320L627.7,320L590.8,320L590.8,320L553.8,320L553.8,320L516.9,320L516.9,320L480,320L480,320L443.1,320L443.1,320L406.2,320L406.2,320L369.2,320L369.2,320L332.3,320L332.3,320L295.4,320L295.4,320L258.5,320L258.5,320L221.5,320L221.5,320L184.6,320L184.6,320L147.7,320L147.7,320L110.8,320L110.8,320L73.8,320L73.8,320L36.9,320L36.9,320L0,320L0,320Z" })
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "z-20 max-w-xl px-4 py-24 text-center xl:py-70", children: [
          /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("h2", { className: "mb-4 text-3xl font-bold text-foreground", children: "Want to know more?" }) }),
          /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("p", { className: "max-w-lg mx-auto mb-10 text-sm font-light tracking-wide text-center text-foreground/55 max-md:px-5 md:mb-14", children: "Download my CV to explore my experience, skills, and project work in detail." }) }),
          /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
            "a",
            {
              className: "cursor-pointer",
              href: "/CV/CV_Vitalii Hulaievych_FE.pdf",
              download: true,
              children: /* @__PURE__ */ jsx(Button, { variant: "primary", children: "Download CV" })
            }
          ) })
        ] }),
        /* @__PURE__ */ jsx(
          "svg",
          {
            className: "absolute bottom-0 z-10 w-full h-24 text-bgc-dark-2 min-w-3xl md:h-32 lg:h-48 xl:h-80",
            viewBox: "0 0 1440 320",
            preserveAspectRatio: "none",
            fill: "currentColor",
            children: /* @__PURE__ */ jsx("path", { d: "M0,128L0,32L36.9,32L36.9,96L73.8,96L73.8,192L110.8,192L110.8,64L147.7,64L147.7,160L184.6,160L184.6,224L221.5,224L221.5,64L258.5,64L258.5,320L295.4,320L295.4,288L332.3,288L332.3,128L369.2,128L369.2,288L406.2,288L406.2,128L443.1,128L443.1,224L480,224L480,192L516.9,192L516.9,192L553.8,192L553.8,256L590.8,256L590.8,96L627.7,96L627.7,192L664.6,192L664.6,32L701.5,32L701.5,64L738.5,64L738.5,224L775.4,224L775.4,64L812.3,64L812.3,160L849.2,160L849.2,160L886.2,160L886.2,320L923.1,320L923.1,128L960,128L960,224L996.9,224L996.9,192L1033.8,192L1033.8,128L1070.8,128L1070.8,192L1107.7,192L1107.7,96L1144.6,96L1144.6,192L1181.5,192L1181.5,256L1218.5,256L1218.5,128L1255.4,128L1255.4,32L1292.3,32L1292.3,192L1329.2,192L1329.2,320L1366.2,320L1366.2,160L1403.1,160L1403.1,288L1440,288L1440,320L1403.1,320L1403.1,320L1366.2,320L1366.2,320L1329.2,320L1329.2,320L1292.3,320L1292.3,320L1255.4,320L1255.4,320L1218.5,320L1218.5,320L1181.5,320L1181.5,320L1144.6,320L1144.6,320L1107.7,320L1107.7,320L1070.8,320L1070.8,320L1033.8,320L1033.8,320L996.9,320L996.9,320L960,320L960,320L923.1,320L923.1,320L886.2,320L886.2,320L849.2,320L849.2,320L812.3,320L812.3,320L775.4,320L775.4,320L738.5,320L738.5,320L701.5,320L701.5,320L664.6,320L664.6,320L627.7,320L627.7,320L590.8,320L590.8,320L553.8,320L553.8,320L516.9,320L516.9,320L480,320L480,320L443.1,320L443.1,320L406.2,320L406.2,320L369.2,320L369.2,320L332.3,320L332.3,320L295.4,320L295.4,320L258.5,320L258.5,320L221.5,320L221.5,320L184.6,320L184.6,320L147.7,320L147.7,320L110.8,320L110.8,320L73.8,320L73.8,320L36.9,320L36.9,320L0,320L0,320Z" })
          }
        ),
        /* @__PURE__ */ jsxs(
          "svg",
          {
            "aria-hidden": "true",
            className: "pointer-events-none absolute inset-0 h-full w-full fill-gray-400/30 stroke-gray-400/60 mask-[radial-gradient(var(--x)_var(--y)_at_center,white,transparent)] opacity-55 [--x:220px] [--y:180px] md:[--x:320px] md:[--y:200px] lg:[--x:400px] lg:[--y:200px] xl:[--x:800px] xl:[--y:350px]",
            children: [
              /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsx(
                "pattern",
                {
                  id: "_S_2_",
                  width: "80",
                  height: "80",
                  patternUnits: "userSpaceOnUse",
                  x: "-1",
                  y: "-1",
                  children: /* @__PURE__ */ jsx("path", { d: "M.5 80V.5H80", fill: "none", strokeDasharray: "4 2" })
                }
              ) }),
              /* @__PURE__ */ jsx(
                "rect",
                {
                  width: "100%",
                  height: "100%",
                  strokeWidth: "0",
                  fill: "url(#_S_2_)"
                }
              )
            ]
          }
        )
      ]
    }
  );
};
const Hire = () => {
  const { register, handleSubmit, watch, reset, formState } = useForm({
    mode: "onChange"
  });
  const [isSending, setIsSending] = useState(false);
  const [isError, setIsError] = useState(null);
  const [isSended, setIsSended] = useState(false);
  const { errors, isValid } = formState;
  const onSubmit = async (data) => {
    setIsSending(true);
    setIsError(null);
    const text = `
<b>📬 Нове повідомлення з сайту</b>
👤 <b>Ім’я:</b> ${data.name}
📧 <b>Email:</b> ${data.email}
📝 <b>Повідомлення:</b> ${data.message}
    `;
    try {
      const res = await fetch(
        `https://api.telegram.org/bot${"7749578552:AAGwc9bqAOsFrQ9NdMpyJf3EZ5M0KmdNG30"}/sendMessage`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            chat_id: "1125974852",
            text,
            parse_mode: "HTML"
          })
        }
      );
      setIsSended(true);
      setTimeout(() => {
        setIsSended(false);
      }, 3e3);
      reset();
    } catch (error) {
      console.error(error);
      setIsError("Something went wrong");
    } finally {
      setIsSending(false);
    }
  };
  return /* @__PURE__ */ jsxs(
    "section",
    {
      className: "flex flex-col w-full px-5 mx-auto lg:px-10 py-15 md:py-32 max-w-desktop",
      id: "contacts",
      "aria-label": "Contact me for work opportunities",
      children: [
        /* @__PURE__ */ jsx("h1", { className: "mb-4 text-3xl font-bold tracking-wide text-center title-underline md:text-5xl", children: "HIRE ME" }),
        /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("p", { className: "max-w-lg mx-auto mb-10 text-sm font-light tracking-wide text-center text-foreground/55 max-md:px-5 md:mb-14", children: [
          "I'm open to full-time, part-time, and freelance opportunities. Feel free to reach out—I'd love to connect and discuss how we can work together. You can contact me through this form or via email:",
          /* @__PURE__ */ jsx("br", {}),
          /* @__PURE__ */ jsx(
            "a",
            {
              href: "mailto:v.hulaievych@gmail.com",
              className: "leading-normal text-foreground hover:text-accent",
              children: "v.hulaievych@gmail.com"
            }
          )
        ] }) }),
        /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs(
          "form",
          {
            onSubmit: handleSubmit(onSubmit),
            className: "flex flex-col max-w-lg gap-4 mx-auto",
            children: [
              /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
                /* @__PURE__ */ jsx("label", { htmlFor: "name", className: "text-foreground", children: "Name" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    className: `px-4 py-2 text-foreground border rounded-md bg-background focus:border-accent outline-0 ${errors.name ? "border-red" : "border-border"}`,
                    placeholder: "Name",
                    type: "text",
                    id: "name",
                    ...register("name", {
                      required: "This field is required",
                      minLength: {
                        value: 2,
                        message: "Name must be at least 2 characters"
                      },
                      maxLength: {
                        value: 55,
                        message: "Name must be max 55 characters"
                      }
                    })
                  }
                ),
                errors.name && /* @__PURE__ */ jsx("p", { className: "text-xs text-red", children: errors.name.message })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
                /* @__PURE__ */ jsx("label", { htmlFor: "email", className: "text-foreground", children: "Email" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    className: `px-4 py-2 text-foreground border rounded-md bg-background  focus:border-accent outline-0 ${errors.email ? "border-red" : "border-border"}`,
                    id: "email",
                    type: "email",
                    placeholder: "Email",
                    ...register("email", {
                      required: "This field is required",
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Please enter a valid email address"
                      }
                    })
                  }
                ),
                errors.email && /* @__PURE__ */ jsx("p", { className: "text-xs text-red", children: errors.email.message })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
                /* @__PURE__ */ jsx("label", { htmlFor: "message", className: "text-foreground", children: "Message" }),
                /* @__PURE__ */ jsx(
                  "textarea",
                  {
                    className: `px-4 py-2 text-foreground border rounded-md resize-none h-30 bg-background focus:border-accent outline-0 ${errors.message ? "border-red" : "border-border"}`,
                    placeholder: "Type your messahe here.",
                    id: "message",
                    ...register("message", {
                      required: "This field is required",
                      minLength: {
                        value: 10,
                        message: "Message must be at least 10 characters"
                      }
                    })
                  }
                ),
                errors.message && /* @__PURE__ */ jsx("p", { className: "text-xs text-red", children: errors.message.message })
              ] }),
              /* @__PURE__ */ jsx(Button, { variant: "wide", disabled: !isValid, children: isSending ? "Sending..." : "Send message" }),
              isError && /* @__PURE__ */ jsx("p", { className: "text-xs text-red", children: `${isError}` }),
              isSended && /* @__PURE__ */ jsx("p", { className: "text-xs text-green-500", children: `Your message has been sent successfully.` })
            ]
          }
        ) })
      ]
    }
  );
};
const Testimonials = () => {
  return /* @__PURE__ */ jsxs(
    "section",
    {
      className: "flex flex-col w-full px-5 mx-auto lg:px-10 py-15 md:py-32 max-w-desktop",
      id: "testimonials",
      "aria-label": "Testimonials from colleagues",
      children: [
        /* @__PURE__ */ jsx("h1", { className: "mb-4 text-3xl font-bold tracking-wide text-center title-underline md:text-5xl", children: "TESTIMONIALS" }),
        /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("p", { className: "max-w-lg mx-auto mb-10 text-sm font-light tracking-wide text-center text-white/55 max-md:px-5 md:mb-14", children: "A few kind words from colleagues" }) }),
        /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs(
          "svg",
          {
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "2",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            className: "mx-auto mb-4 stroke-1 size-24 md:size-32",
            children: [
              /* @__PURE__ */ jsx("path", { d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" }),
              /* @__PURE__ */ jsx("path", { d: "M8 12a2 2 0 0 0 2-2V8H8" }),
              /* @__PURE__ */ jsx("path", { d: "M14 12a2 2 0 0 0 2-2V8h-2" }),
              " "
            ]
          }
        ) }),
        /* @__PURE__ */ jsx("h2", { className: "text-xl font-light leading-tight text-center text-foreground md:text-2xl", children: "No Testimonials Yet" }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-center px-9 text-white/40", children: "Once someone writes a recommendation, it will show up here." })
      ]
    }
  );
};
const HomePage = () => {
  useScrollSpy([
    "home",
    "carousel",
    "about",
    "projects",
    "testimonials",
    "contacts"
  ]);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(
      "section",
      {
        className: "flex relative flex-col min-h-[calc(100vh-55px)] \n                    text-center justify-center items-center z-10 w-full mx-auto px-4\n                    after:absolute after:content-[''] after:w-full after:h-0.5 \n                    after:bg-linear-to-r after:from-white/80 after:to-transparent \n                    after:bottom-0 after:left-0 after:right-0  bg-background",
        "aria-label": "Introduction and overview of my skills and experience",
        id: "home",
        children: [
          /* @__PURE__ */ jsx(Avatar, {}),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4 mx-auto max-w-125", children: [
            /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("span", { className: "inline-flex px-3 py-1.5 bg-bgc-gray rounded-full border-border border text-sm leading-none", children: "React Engineer" }) }),
            /* @__PURE__ */ jsx("div", { className: "", children: /* @__PURE__ */ jsxs("h1", { className: "flex text-4xl leading-tight", children: [
              "Talk is cheap.",
              /* @__PURE__ */ jsx("br", {}),
              "Show me the code."
            ] }) }),
            /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("p", { className: "inline-flex text-sm leading-relaxed text-foreground/50", children: [
              "I design and code beautifully simple things,",
              /* @__PURE__ */ jsx("br", {}),
              " and I love what I do."
            ] }) }),
            /* @__PURE__ */ jsxs("div", { className: "flex gap-4 pt-10", children: [
              /* @__PURE__ */ jsx(
                "a",
                {
                  className: "cursor-pointer",
                  href: "/CV/CV_Vitalii Hulaievych_FE.pdf",
                  download: true,
                  children: /* @__PURE__ */ jsx(Button, { variant: "primary", children: "Download CV" })
                }
              ),
              /* @__PURE__ */ jsx(Link, { to: "#projects", children: /* @__PURE__ */ jsx(Button, { variant: "secondary", children: "My Projects" }) })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 grid place-items-center z-[-1] pointer-events-none select-none", children: /* @__PURE__ */ jsxs(
            "svg",
            {
              viewBox: "0 0 512 512",
              className: "font-raleway text-[400px] font-black italic opacity-15 size-full",
              children: [
                /* @__PURE__ */ jsx("text", { x: "-3.7%", y: "316", stroke: "#f8f8f8", fill: "#1f1f1f", children: "V" }),
                /* @__PURE__ */ jsx("text", { x: "40%", y: "460", stroke: "#f8f8f8", fill: "#1f1f1f", children: "H" })
              ]
            }
          ) }),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-x-0 flex w-full h-8 mx-auto bottom-5 gap-x-12", children: /* @__PURE__ */ jsx("div", { className: "relative flex justify-around w-full mx-auto max-w-125", children: /* @__PURE__ */ jsx(SocialLinks, {}) }) })
        ]
      }
    ),
    /* @__PURE__ */ jsx(Carousel, {}),
    /* @__PURE__ */ jsx(About$1, {}),
    /* @__PURE__ */ jsx(Projects, {}),
    /* @__PURE__ */ jsx(Testimonials, {}),
    /* @__PURE__ */ jsx(MyCv, {}),
    /* @__PURE__ */ jsx(Hire, {})
  ] });
};
function meta$1() {
  return [{
    title: "V. Hulaievych | Portfolio"
  }, {
    name: "Vitalii Hulaievych portfolio",
    content: "Welcome to my portfolio"
  }];
}
const home = UNSAFE_withComponentProps(function Home() {
  return /* @__PURE__ */ jsx(HomePage, {});
});
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: home,
  meta: meta$1
}, Symbol.toStringTag, { value: "Module" }));
const About = () => {
  return /* @__PURE__ */ jsx("div", { children: "About" });
};
function meta() {
  return [{
    title: "V. Hulaievych | Portfolio"
  }, {
    name: "Vitalii Hulaievych portfolio",
    content: "Welcome to my portfolio"
  }];
}
const about = UNSAFE_withComponentProps(function Home2() {
  return /* @__PURE__ */ jsx(About, {});
});
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: about,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-9k3tLpAU.js", "imports": ["/assets/chunk-EPOLDU6W-DhPruf_s.js", "/assets/index-BxB2Ub6v.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": true, "module": "/assets/root-kP4FTkhn.js", "imports": ["/assets/chunk-EPOLDU6W-DhPruf_s.js", "/assets/index-BxB2Ub6v.js", "/assets/SocialLinks-B0JbIkbQ.js", "/assets/firebase-DhbPNOBL.js"], "css": ["/assets/root-BGRXvVYu.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/home": { "id": "routes/home", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/home-BSyhZ52E.js", "imports": ["/assets/chunk-EPOLDU6W-DhPruf_s.js", "/assets/SocialLinks-B0JbIkbQ.js", "/assets/firebase-DhbPNOBL.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/about": { "id": "routes/about", "parentId": "root", "path": "about", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/about-BlZGh563.js", "imports": ["/assets/chunk-EPOLDU6W-DhPruf_s.js", "/assets/firebase-DhbPNOBL.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/assets/manifest-c5ad05a4.js", "version": "c5ad05a4", "sri": void 0 };
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = { "unstable_optimizeDeps": false, "unstable_subResourceIntegrity": false, "unstable_trailingSlashAwareDataRequests": false, "v8_middleware": false, "v8_splitRouteModules": false, "v8_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const routeDiscovery = { "mode": "lazy", "manifestPath": "/__manifest" };
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/home": {
    id: "routes/home",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  },
  "routes/about": {
    id: "routes/about",
    parentId: "root",
    path: "about",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  }
};
const allowedActionOrigins = false;
export {
  allowedActionOrigins,
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routeDiscovery,
  routes,
  ssr
};
