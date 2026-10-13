"use client";

import { useState, useRef, type ChangeEvent } from "react";
import { Modal } from "@/components/ui/modal";
import { postableKids } from "@/lib/kids-data";
import type { PostType } from "@/lib/feed-data";

interface CreatePostModalProps {
  open: boolean;
  onClose: () => void;
  onPublish: (post: {
    targetChildIds: string[];
    isForAll: boolean;
    type: PostType;
    body: string;
    photoDataUrls: string[];
  }) => void;
}

/**
 * Modal for creating a new post (SPEC 05).
 * Reuses the accessible <Modal> from SPEC 03 for focus trap and ARIA.
 * Custom header with Cancelar/Nueva publicación/Publicar buttons.
 */
export function CreatePostModal({
  open,
  onClose,
  onPublish,
}: CreatePostModalProps) {
  const [selectedChildIds, setSelectedChildIds] = useState<string[]>([]);
  const [isForAll, setIsForAll] = useState(false);
  const [selectedType, setSelectedType] = useState<PostType | null>(null);
  const [description, setDescription] = useState("");
  const [photoDataUrls, setPhotoDataUrls] = useState<string[]>([]);
  const [errors, setErrors] = useState({
    target: false,
    type: false,
    description: false,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Reset form when modal closes
  const handleClose = () => {
    setSelectedChildIds([]);
    setIsForAll(false);
    setSelectedType(null);
    setDescription("");
    setPhotoDataUrls([]);
    setErrors({ target: false, type: false, description: false });
    onClose();
  };

  // Handle child selection
  const handleChildClick = (kidId: string) => {
    setIsForAll(false);
    setSelectedChildIds((prev) =>
      prev.includes(kidId)
        ? prev.filter((id) => id !== kidId)
        : [...prev, kidId]
    );
  };

  // Handle "Toda la sala" selection
  const handleAllClick = () => {
    setSelectedChildIds([]);
    setIsForAll(true);
  };

  // Handle type selection
  const handleTypeClick = (type: PostType) => {
    setSelectedType(type);
  };

  // Handle file selection
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      setPhotoDataUrls((prev) => [...prev, dataUrl]);
    };
    reader.readAsDataURL(file);

    // Reset input so the same file can be selected again
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Handle publish
  const handlePublish = () => {
    const hasTarget = selectedChildIds.length > 0 || isForAll;
    const hasType = selectedType !== null;
    const hasDescription = description.trim() !== "";

    setErrors({
      target: !hasTarget,
      type: !hasType,
      description: !hasDescription,
    });

    if (!hasTarget || !hasType || !hasDescription) {
      return;
    }

    onPublish({
      targetChildIds: selectedChildIds,
      isForAll,
      type: selectedType!,
      body: description,
      photoDataUrls,
    });

    handleClose();
  };

  // Type options with colors from mockup
  const typeOptions: {
    type: PostType;
    label: string;
    bgClass: string;
    textClass: string;
  }[] = [
    { type: "meal", label: "Comida", bgClass: "bg-yellow-ink", textClass: "text-white" },
    { type: "nap", label: "Siesta", bgClass: "bg-nap-soft", textClass: "text-purple-ink" },
    { type: "activity", label: "Actividad", bgClass: "bg-activity", textClass: "text-white" },
    { type: "achievement", label: "Logro", bgClass: "bg-achievement-soft", textClass: "text-achievement" },
    { type: "mood", label: "Ánimo", bgClass: "bg-link", textClass: "text-link-ink" },
    { type: "photo", label: "Foto", bgClass: "bg-allergy", textClass: "text-allergy-ink" },
    { type: "announcement", label: "Anuncio", bgClass: "bg-announcement-soft", textClass: "text-announcement" },
  ];

  return (
    <Modal open={open} onClose={handleClose} title="Nueva publicación">
      {/* Custom header */}
      <div className="flex items-center justify-between border-b border-edge px-[26px] py-5">
        <button
          type="button"
          onClick={handleClose}
          className="text-[15px] font-bold text-subtle hover:opacity-70"
        >
          Cancelar
        </button>
        <span className="font-display text-[18px] font-semibold text-ink">
          Nueva publicación
        </span>
        <button
          type="button"
          onClick={handlePublish}
          className="text-[15px] font-extrabold text-accent hover:opacity-70"
        >
          Publicar
        </button>
      </div>

      {/* Form content */}
      <div className="px-[26px] py-6">
        {/* PARA section */}
        <div className="mb-[22px]">
          <div
            className={`mb-2.5 text-xs font-extrabold tracking-wide uppercase ${
              errors.target ? "text-alert-title" : "text-subtle"
            }`}
          >
            PARA
          </div>
          <div className="flex flex-wrap gap-[9px]">
            {postableKids.map((kid) => {
              const isSelected = selectedChildIds.includes(kid.id);
              return (
                <button
                  key={kid.id}
                  type="button"
                  onClick={() => handleChildClick(kid.id)}
                  className={`flex items-center gap-2 rounded-full border-[1.5px] px-3.5 py-1.5 text-sm font-bold transition-colors ${
                    isSelected
                      ? "border-ink bg-ink text-white"
                      : "border-edge bg-card text-idle hover:border-ink/30"
                  }`}
                >
                  <span
                    className="flex h-[26px] w-[26px] items-center justify-center rounded-full font-display text-[13px] font-semibold"
                    style={{ backgroundColor: kid.avatarBg, color: kid.avatarInk }}
                  >
                    {kid.initials}
                  </span>
                  {kid.name}
                </button>
              );
            })}
            <button
              type="button"
              onClick={handleAllClick}
              className={`rounded-full border-[1.5px] px-4 py-1.5 text-sm font-bold transition-colors ${
                isForAll
                  ? "border-ink bg-ink text-white"
                  : "border-edge bg-card text-idle hover:border-ink/30"
              }`}
            >
              Toda la sala
            </button>
          </div>
          {errors.target && (
            <p className="mt-2 text-xs font-semibold text-alert-title">
              Seleccioná al menos un niño o {"\"Toda la sala\""}
            </p>
          )}
        </div>

        {/* TIPO section */}
        <div className="mb-[22px]">
          <div
            className={`mb-2.5 text-xs font-extrabold tracking-wide uppercase ${
              errors.type ? "text-alert-title" : "text-subtle"
            }`}
          >
            TIPO
          </div>
          <div className="flex flex-wrap gap-[9px]">
            {typeOptions.map(({ type, label, bgClass, textClass }) => {
              const isSelected = selectedType === type;
              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => handleTypeClick(type)}
                  className={`rounded-full px-4 py-2 text-[13.5px] font-extrabold transition-all ${bgClass} ${textClass} ${
                    isSelected ? "scale-105 shadow-md" : "hover:scale-[1.02]"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
          {errors.type && (
            <p className="mt-2 text-xs font-semibold text-alert-title">
              Seleccioná un tipo de publicación
            </p>
          )}
        </div>

        {/* DESCRIPCIÓN section */}
        <div className="mb-[22px]">
          <div
            className={`mb-2.5 text-xs font-extrabold tracking-wide uppercase ${
              errors.description ? "text-alert-title" : "text-subtle"
            }`}
          >
            DESCRIPCIÓN
          </div>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Contá cómo le fue hoy…"
            className={`w-full min-h-[120px] resize-y rounded-[14px] border-[1.5px] bg-white px-4 py-3.5 text-[15px] leading-normal text-ink placeholder:text-placeholder focus:outline-none ${
              errors.description ? "border-alert-icon" : "border-[#EADFD0]"
            }`}
          />
        </div>

        {/* FOTOS section */}
        <div>
          <div className="mb-2.5 text-xs font-extrabold tracking-wide uppercase text-subtle">
            FOTOS
          </div>
          <div className="flex gap-3">
            {/* Placeholder thumbnail (shown when no photos) */}
            {photoDataUrls.length === 0 && (
              <div className="flex h-[96px] w-[96px] items-center justify-center rounded-[14px] border border-edge bg-photo">
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-chevron"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="9" cy="9" r="2" />
                  <path d="m21 15-3.6-3.6a2 2 0 0 0-2.8 0L6 21" />
                </svg>
              </div>
            )}

            {/* Selected photo thumbnails */}
            {photoDataUrls.map((dataUrl, index) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={index}
                src={dataUrl}
                alt={`Foto ${index + 1}`}
                className="h-[96px] w-[96px] rounded-[14px] border border-edge bg-photo object-cover"
              />
            ))}

            {/* Add photo button */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex h-[96px] w-[96px] flex-col items-center justify-center gap-1.5 rounded-[14px] border-[1.5px] border-dashed border-photo-edge bg-photo text-photo-ink hover:border-accent-deep hover:text-accent-deep"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#C5503A"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 5v14M5 12h14" />
              </svg>
              <span className="text-xs">Agregar</span>
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
