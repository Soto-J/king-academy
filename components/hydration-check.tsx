"use client";

import { useEffect, useState } from "react";

type HydrationCheckProps = {
  children: React.ReactNode;
  className?: string;
};

const HydrationCheck = ({ children, className = "" }: HydrationCheckProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return <div className={className}>{children}</div>;
};

export default HydrationCheck;
