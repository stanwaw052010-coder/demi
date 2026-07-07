export interface Specialist {
  name: string;
  role: string;
  bio: string;
  photoCategory: "podolog" | "cosmetolog" | "hairdresser" | "spa";
  photoIndex: number;
}

export const SPECIALISTS: Specialist[] = [
  {
    name: "Олена",
    role: "Косметолог-естетист",
    bio: "Естетична та ін'єкційна косметологія, PRP-терапія, індивідуальні протоколи догляду.",
    photoCategory: "cosmetolog",
    photoIndex: 1,
  },
  {
    name: "Марина",
    role: "Стиліст-перукар",
    bio: "Складні техніки фарбування, авторські стрижки, реконструкція волосся.",
    photoCategory: "hairdresser",
    photoIndex: 1,
  },
  {
    name: "Анна",
    role: "SPA-терапевт",
    bio: "SPA-капсула Neoqi Medic, авторська методика масажу, спа-ритуали відновлення.",
    photoCategory: "spa",
    photoIndex: 2,
  },
  {
    name: "Ірина",
    role: "Майстер-подолог",
    bio: "Медичний педикюр, професійний догляд за стопами, манікюр та нігтьовий дизайн.",
    photoCategory: "podolog",
    photoIndex: 1,
  },
];
