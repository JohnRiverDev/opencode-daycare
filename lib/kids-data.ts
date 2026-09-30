// Static mock data for the kids management screens (SPEC 02).
// All identifiers are English; visible copy (values rendered on screen) is Spanish,
// taken verbatim from references/pantallas/ninos.dc.html and perfil-nino.dc.html.

export type AvatarTone = "sky" | "pink" | "green" | "yellow" | "purple" | "steel";

export interface Kid {
  id: string; // "1" … "8"; compared against the route parameter
  name: string; // "Mateo Fernández"
  age: number; // 2 | 3
  linkedParentCount: number; // 0 | 1 | 2
  avatarInitial: string; // "M"
  avatarTone: AvatarTone;
  badge?: { label: string; tone: "allergy" | "link" }; // "MANÍ" | "LACTOSA" | "VINCULAR"
}

export type ParentStatus = "active" | "pending";

export interface LinkedParent {
  name: string; // "Lucía Fernández"
  relationship: string; // "Mamá"
  status: ParentStatus;
  avatarInitial: string;
  avatarTone: AvatarTone;
  statusLabel: string; // "activa" | "invitación enviada"
}

export interface KidProfile {
  kidId: string; // "1"
  birthDate: string; // "12 mar 2022"
  room: string; // "Soles"
  admissionDate: string; // "feb 2025"
  allergiesTitle: string; // "Alergias y notas"
  allergiesNote: string; // "Alergia al maní..."
  parents: LinkedParent[];
}

export const kids: Kid[] = [
  {
    id: "1",
    name: "Mateo Fernández",
    age: 3,
    linkedParentCount: 2,
    avatarInitial: "M",
    avatarTone: "sky",
    badge: { label: "MANÍ", tone: "allergy" },
  },
  {
    id: "2",
    name: "Sofía Méndez",
    age: 2,
    linkedParentCount: 1,
    avatarInitial: "S",
    avatarTone: "pink",
  },
  {
    id: "3",
    name: "Benjamín Ruiz",
    age: 3,
    linkedParentCount: 2,
    avatarInitial: "B",
    avatarTone: "green",
  },
  {
    id: "4",
    name: "Valentina Soto",
    age: 2,
    linkedParentCount: 0,
    avatarInitial: "V",
    avatarTone: "yellow",
    badge: { label: "VINCULAR", tone: "link" },
  },
  {
    id: "5",
    name: "Tomás Díaz",
    age: 3,
    linkedParentCount: 1,
    avatarInitial: "T",
    avatarTone: "purple",
    badge: { label: "LACTOSA", tone: "allergy" },
  },
  {
    id: "6",
    name: "Emma Castro",
    age: 2,
    linkedParentCount: 1,
    avatarInitial: "E",
    avatarTone: "pink",
  },
  {
    id: "7",
    name: "Lucas Romero",
    age: 3,
    linkedParentCount: 1,
    avatarInitial: "L",
    avatarTone: "sky",
  },
  {
    id: "8",
    name: "Olivia Vega",
    age: 2,
    linkedParentCount: 1,
    avatarInitial: "O",
    avatarTone: "green",
  },
];

export const kidProfiles: KidProfile[] = [
  {
    kidId: "1",
    birthDate: "12 mar 2022",
    room: "Soles",
    admissionDate: "feb 2025",
    allergiesTitle: "Alergias y notas",
    allergiesNote: "Alergia al maní. Evitar frutos secos. Lleva inhalador en la mochila.",
    parents: [
      {
        name: "Lucía Fernández",
        relationship: "Mamá",
        status: "active",
        avatarInitial: "L",
        avatarTone: "purple",
        statusLabel: "activa",
      },
      {
        name: "Diego Fernández",
        relationship: "Papá",
        status: "pending",
        avatarInitial: "D",
        avatarTone: "steel",
        statusLabel: "invitación enviada",
      },
    ],
  },
];