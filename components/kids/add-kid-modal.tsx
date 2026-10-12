"use client";

import { useState, type FormEvent } from "react";
import { Modal } from "@/components/ui/modal";
import { rooms } from "@/lib/kids-data";

interface AddKidModalProps {
  open: boolean;
  onClose: () => void;
}

interface FormFields {
  name: string;
  birthDate: string;
  roomId: string;
  allergies: string;
  medicalNotes: string;
}

interface FormErrors {
  name?: boolean;
  birthDate?: boolean;
  roomId?: boolean;
}

const INITIAL_FIELDS: FormFields = {
  name: "",
  birthDate: "",
  roomId: rooms[0].id, // "soles"
  allergies: "",
  medicalNotes: "",
};

/** "Agregar niño" modal with form validation (SPEC 03). */
export function AddKidModal({ open, onClose }: AddKidModalProps) {
  const [fields, setFields] = useState<FormFields>(INITIAL_FIELDS);
  const [errors, setErrors] = useState<FormErrors>({});

  const handleClose = () => {
    setFields(INITIAL_FIELDS);
    setErrors({});
    onClose();
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!fields.name.trim()) newErrors.name = true;
    if (!fields.birthDate.trim()) newErrors.birthDate = true;
    if (!fields.roomId.trim()) newErrors.roomId = true;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validate()) {
      handleClose();
    }
  };

  const handleChange = (field: keyof FormFields, value: string) => {
    setFields((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <Modal open={open} onClose={handleClose} title="Agregar niño">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-edge px-[26px] py-5">
        <button
          type="button"
          onClick={handleClose}
          className="text-[15px] font-bold text-subtle hover:text-ink"
        >
          Cancelar
        </button>
        <span className="font-display text-[18px] font-semibold text-ink">
          Agregar niño
        </span>
        <button
          type="submit"
          form="add-kid-form"
          className="text-[15px] font-extrabold text-accent hover:text-accent-deep"
        >
          Guardar
        </button>
      </div>

      {/* Form body */}
      <form
        id="add-kid-form"
        onSubmit={handleSubmit}
        className="flex flex-col gap-[18px] px-[26px] py-6"
        noValidate
      >
        {/* Nombre completo */}
        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-[12px] font-extrabold tracking-[0.7px] text-subtle"
          >
            NOMBRE COMPLETO
          </label>
          <input
            id="name"
            type="text"
            value={fields.name}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder="Ej. Martina López"
            className={`w-full rounded-[14px] border-[1.5px] bg-white px-4 py-[13px] text-[15px] text-ink placeholder:text-placeholder ${
              errors.name ? "border-alert-icon" : "border-[#EADFD0]"
            }`}
          />
        </div>

        {/* Fecha de nacimiento + Sala */}
        <div className="flex gap-[14px]">
          {/* Fecha de nacimiento */}
          <div className="flex-1">
            <label
              htmlFor="birthDate"
              className="mb-2 block text-[12px] font-extrabold tracking-[0.7px] text-subtle"
            >
              FECHA DE NACIMIENTO
            </label>
            <input
              id="birthDate"
              type="text"
              value={fields.birthDate}
              onChange={(e) => handleChange("birthDate", e.target.value)}
              placeholder="dd/mm/aaaa"
              className={`w-full rounded-[14px] border-[1.5px] bg-white px-4 py-[13px] text-[15px] text-ink placeholder:text-placeholder ${
                errors.birthDate ? "border-alert-icon" : "border-[#EADFD0]"
              }`}
            />
          </div>

          {/* Sala */}
          <div className="flex-1">
            <label
              htmlFor="roomId"
              className="mb-2 block text-[12px] font-extrabold tracking-[0.7px] text-subtle"
            >
              SALA
            </label>
            <div className="relative">
              <select
                id="roomId"
                value={fields.roomId}
                onChange={(e) => handleChange("roomId", e.target.value)}
                className={`w-full appearance-none rounded-[14px] border-[1.5px] bg-white py-[13px] pl-4 pr-10 text-[15px] font-bold text-ink ${
                  errors.roomId ? "border-alert-icon" : "border-[#EADFD0]"
                }`}
              >
                {rooms.map((room) => (
                  <option key={room.id} value={room.id}>
                    {room.name}
                  </option>
                ))}
              </select>
              {/* Chevron icon */}
              <svg
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#B0A290"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </div>
          </div>
        </div>

        {/* Alergias */}
        <div>
          <label
            htmlFor="allergies"
            className="mb-2 block text-[12px] font-extrabold tracking-[0.7px] text-subtle"
          >
            ALERGIAS (ETIQUETAS)
          </label>
          <input
            id="allergies"
            type="text"
            value={fields.allergies}
            onChange={(e) => handleChange("allergies", e.target.value)}
            placeholder="Ej. Maní, Lactosa"
            className="w-full rounded-[14px] border-[1.5px] border-[#EADFD0] bg-white px-4 py-[13px] text-[15px] text-ink placeholder:text-placeholder"
          />
        </div>

        {/* Notas médicas */}
        <div>
          <label
            htmlFor="medicalNotes"
            className="mb-2 block text-[12px] font-extrabold tracking-[0.7px] text-subtle"
          >
            NOTAS MÉDICAS
          </label>
          <textarea
            id="medicalNotes"
            value={fields.medicalNotes}
            onChange={(e) => handleChange("medicalNotes", e.target.value)}
            placeholder="Indicaciones, medicación, contactos…"
            rows={4}
            className="w-full resize-y rounded-[14px] border-[1.5px] border-[#EADFD0] bg-white px-4 py-[13px] text-[15px] leading-relaxed text-ink placeholder:text-placeholder"
          />
        </div>
      </form>
    </Modal>
  );
}
