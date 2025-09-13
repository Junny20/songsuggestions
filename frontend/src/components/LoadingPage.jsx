import React from "react";
import { useEffect, useRef } from "react";
import "../css/Loading.css";
import gsap from "gsap";

const Loading = () => {
  const rect0 = useRef(null);
  const rect1 = useRef(null);
  const rect2 = useRef(null);
  const rect3 = useRef(null);
  const rect4 = useRef(null);
  const rect5 = useRef(null);
  const rect6 = useRef(null);
  const rect7 = useRef(null);
  const rect8 = useRef(null);
  const rect9 = useRef(null);
  const rect10 = useRef(null);

  useEffect(() => {
    const rects = [
      rect1.current,
      rect2.current,
      rect3.current,
      rect4.current,
      rect5.current,
      rect6.current,
      rect7.current,
      rect8.current,
      rect9.current,
    ];

    const tl = gsap.timeline({
      repeat: -1,
      yoyo: true,
    });

    rects.forEach((rect, i) => {
      tl.fromTo(
        rect,
        { width: 35, delay: 1 },
        { width: 20, duration: 0.6, ease: "power2.in" },
        i * 0.15
      );
    });

    tl.fromTo(
      rect0.current,
      { width: "300px" },
      { width: "700px", duration: 1.6 },
      0
    );

    tl.fromTo(
      rect10.current,
      { width: "300px" },
      { width: "100px", duration: 1 },
      0
    );
  }, []);

  return (
    <div id="loadingContainer">
      <div id="head">
        <div className="eye left-eye">
          <div className="dot"></div>
        </div>
        <div className="eye right-eye">
          <div className="dot"></div>
        </div>
        <div className="smile"></div>
      </div>
      <div className="bigRectangle" id="rect0" ref={rect0}></div>
      <div className="rectangle" id="rect1" ref={rect1}></div>
      <div className="rectangle" id="rect2" ref={rect2}></div>
      <div className="rectangle" id="rect3" ref={rect3}></div>
      <div className="rectangle" id="rect4" ref={rect4}></div>
      <div className="rectangle" id="rect5" ref={rect5}></div>
      <div className="rectangle" id="rect6" ref={rect6}></div>
      <div className="rectangle" id="rect7" ref={rect7}></div>
      <div className="rectangle" id="rect8" ref={rect8}></div>
      <div className="rectangle" id="rect9" ref={rect9}></div>
      <div className="bigRectangle" ref={rect10}></div>
      <div id="tail"></div>
    </div>
  );
};

export default Loading;
