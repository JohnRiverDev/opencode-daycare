"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/modal";

type Relationship = "mom" | "dad" | "guardian";

interface LinkParentModalProps {
  open: boolean;
  onClose: () => void;
  kidName: string;
}

const RELATIONSHIP_OPTIONS: { value: Relationship; label: string }[] = [
  { value: "mom", label: "Mamá" },
  { value: "dad", label: "Papá" },
  { value: "guardian", label: "Tutor/a" },
];

function CloseIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="mt-[1px] flex-none"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4M12 8h.01" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m22 2-7 20-4-9-9-4z" />
      <path d="M22 2 11 13" />
    </svg>
  );
}

interface FormErrors {
  parentName?: boolean;
  email?: boolean;
  relationship?: boolean;
}

export function LinkParentModal({ open, onClose, kidName }: LinkParentModalProps) {
  const [parentName, setParentName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedRelationship, setSelectedRelationship] = useState<Relationship | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});

  const resetForm = () => {
    setParentName("");
    setEmail("");
    setSelectedRelationship(null);
    setErrors({});
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!parentName.trim()) {
      newErrors.parentName = true;
    }

    if (!email.trim() || !email.includes("@")) {
      newErrors.email = true;
    }

    if (!selectedRelationship) {
      newErrors.relationship = true;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      handleClose();
    }
  };

  return (
    <Modal open={open} onClose={handleClose} title="Vincular padre">
      {/* Custom header */}
      <div className="flex items-center justify-between border-b border-edge px-[26px] py-5">
        <div>
          <div className="font-display text-[18px] font-semibold text-ink">
            Vincular padre
          </div>
          <div className="text-[13px] text-muted">a {kidName}</div>
        </div>
        <button
          type="button"
          onClick={handleClose}
          className="flex h-[34px] w-[34px] items-center justify-center rounded-[10px] bg-edge-soft text-subtle transition-colors hover:bg-edge"
          aria-label="Cerrar"
        >
          <CloseIcon />
        </button>
      </div>

      {/* Content */}
      <div className="px-[26px] py-[22px]">
        {/* Info banner */}
        <div className="mb-5 flex gap-[11px] rounded-[14px] bg-info-bg px-4 py-[13px]">
          <span className="text-info-icon">
            <InfoIcon />
          </span>
          <span className="text-[13.5px] leading-[1.45] text-info-title">
            Le enviaremos un correo con un código para que active su cuenta. Solo verá el feed de {kidName}.
          </span>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-[18px]">
          {/* Parent name */}
          <div>
            <label className="mb-2 block text-[12px] font-extrabold tracking-[0.7px] text-subtle">
              NOMBRE DEL PADRE/MADRE
            </label>
            <input
              type="text"
              value={parentName}
              onChange={(e) => setParentName(e.target.value)}
              placeholder="Ej. Diego Fernández"
              className={`w-full rounded-[14px] border-[1.5px] bg-white px-4 py-[13px] text-[15px] text-ink placeholder:text-placeholder ${
                errors.parentName ? "border-alert-icon" : "border-edge-soft"
              } focus:outline-none`}
            />
          </div>

          {/* Email */}
          <div>
            <label className="mb-2 block text-[12px] font-extrabold tracking-[0.7px] text-subtle">
              EMAIL
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="correo@ejemplo.com"
              className={`w-full rounded-[14px] border-[1.5px] bg-white px-4 py-[13px] text-[15px] text-ink placeholder:text-placeholder ${
                errors.email ? "border-alert-icon" : "border-edge-soft"
              } focus:outline-none`}
            />
          </div>

          {/* Relationship */}
          <div>
            <label className="mb-[10px] block text-[12px] font-extrabold tracking-[0.7px] text-subtle">
              PARENTESCO
            </label>
            <div className="mb-5 flex gap-[9px]">
              {RELATIONSHIP_OPTIONS.map((option) => {
                const isSelected = selectedRelationship === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => {
                      setSelectedRelationship(option.value);
                      if (errors.relationship) {
                        setErrors({ ...errors, relationship: false });
                      }
                    }}
                    className={`flex-1 rounded-full border-[1.5px] py-[11px] text-[14px] font-extrabold transition-colors ${
                      isSelected
                        ? "border-pill-selected-border bg-pill-selected-bg text-pill-selected-text"
                        : "border-pill-default-border bg-pill-default-bg text-pill-default-text hover:bg-cream"
                    } ${errors.relationship ? "border-alert-icon" : ""}`}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Invitation code */}
          <div className="mb-5 rounded-[16px] border-[1.5px] border-dashed border-code-border bg-code-bg px-[18px] py-[18px] text-center">
            <div className="mb-2 text-[12px] font-extrabold tracking-[0.7px] text-code-label">
              CÓDIGO DE INVITACIÓN
            </div>
            <div className="font-display text-[34px] font-semibold tracking-[7px] text-code-text">
              7K4P9
            </div>
            <div className="mt-1.5 text-[13px] text-code-label">Vence en 7 días</div>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="flex w-full items-center justify-center gap-[9px] rounded-[14px] bg-gradient-to-b from-flame to-flame-deep py-[14px] text-[15.5px] font-extrabold text-white shadow-[0_10px_22px_-8px_rgba(238,129,100,0.7)] transition-opacity hover:opacity-90"
          >
            <SendIcon />
            Enviar invitación
          </button>
        </form>
      </div>
    </Modal>
  );
}
