"use client";

import { useState } from "react";
import { LinkedParents } from "./linked-parents";
import { LinkParentModal } from "./link-parent-modal";
import type { KidProfile } from "@/lib/kids-data";

interface LinkedParentsSectionProps {
  profile: KidProfile;
  kidName: string;
}

/** Client component wrapper for LinkedParents + LinkParentModal */
export function LinkedParentsSection({ profile, kidName }: LinkedParentsSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <LinkedParents profile={profile} onLinkParent={() => setIsModalOpen(true)} />
      <LinkParentModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        kidName={kidName}
      />
    </>
  );
}
