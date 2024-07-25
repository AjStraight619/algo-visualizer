"use client";

import React, { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";

const MobileWarning = () => {
  const [isOpen, setIsOpen] = useState(false);

  const checkMobileSize = () => {
    setIsOpen(window.innerWidth <= 768);
  };

  useEffect(() => {
    checkMobileSize();

    const handleResize = () => {
      checkMobileSize();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Mobile Warning</AlertDialogTitle>
        </AlertDialogHeader>
        Some features of this web app may not be fully functional on mobile
        devices. For the best experience, please access this app on a desktop or
        tablet.
        <AlertDialogCancel>Ok</AlertDialogCancel>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default MobileWarning;
