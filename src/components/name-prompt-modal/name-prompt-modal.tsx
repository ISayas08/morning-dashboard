"use client";

import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import styles from "./name-prompt-modal.module.scss";

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: (name: string) => void;
};

const NamePromptModal = ({ open, onClose, onSubmit }: Props) => {
  const [name, setName] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const id = requestAnimationFrame(() => inputRef.current?.focus());
    return () => {
      document.body.style.overflow = prev;
      cancelAnimationFrame(id);
    };
  }, [open]);

  // useEffect(() => {
  //   if (!open) return;
  //   const handler = (e: KeyboardEvent) => {
  //     if (e.key === "Escape") onClose();
  //     if (e.key !== "Tab" || !dialogRef.current) return;
  //     const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
  //       'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  //     );
  //     if (focusables.length === 0) return;
  //     const first = focusables[0];
  //     const last = focusables[focusables.length - 1];
  //     const active = document.activeElement as HTMLElement | null;

  //     if (e.shiftKey && active === first) {
  //       last.focus();
  //       e.preventDefault();
  //     } else if (!e.shiftKey && active === last) {
  //       first.focus();
  //       e.preventDefault();
  //     }
  //   };
  //   document.addEventListener("keydown", handler);
  //   return () => document.removeEventListener("keydown", handler);
  // }, [open, onClose]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(name.trim());
  };

  if (!open) return null;
  return ReactDOM.createPortal(
    <div
      className={`${styles.backdrop} ${open ? styles.open : styles.closed}`}
      aria-hidden={!open}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <dialog
        ref={dialogRef}
        className={`${styles.dialog} ${open ? styles.open : styles.closed}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="name-modal-title"
      >
        <button
          className={styles.close}
          onClick={onClose}
          aria-label="Close dialog"
          type="button"
        >
          ×
        </button>

        <h2 id="name-modal-title" className={styles.title}>
          What's your name?
        </h2>

        <form onSubmit={submit} className={styles.form}>
          <label htmlFor="name" className={styles.label}>
            Your name
          </label>
          <input
            id="name"
            ref={inputRef}
            className={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="You can also use a nickname if you feel shy..."
            autoComplete="name"
          />
          <div className={styles.actions}>
            <button
              type="submit"
              className={styles.primary}
              disabled={!name.trim()}
            >
              Continue
            </button>
          </div>
        </form>
      </dialog>
    </div>,
    document.body
  );
};

export default NamePromptModal;
