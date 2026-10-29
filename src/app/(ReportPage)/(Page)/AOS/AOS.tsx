"use client";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

function ASO() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    AOS.refresh();
  }, []);

  return null;
}

export default ASO;
