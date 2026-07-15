export interface TeamMember {
  slug: string;
  name: string;
  role: string;
  category: "podolog" | "cosmetolog" | "hairdresser" | "spa";
  bio: string;
  photo: string;
}

export const team: TeamMember[] = [
  {
    slug: "podolog",
    name: "Олена Марченко",
    role: "Лікар-подолог",
    category: "podolog",
    bio: "Апаратний педикюр і лікування проблемних стоп — вроста нігтя, натоптиші, тріщини п'яток. Індивідуальний медичний підхід у комфортній атмосфері.",
    photo: "/images/team/podolog-1.jpg",
  },
  {
    slug: "cosmetolog",
    name: "Марія Литвиненко",
    role: "Косметолог-естетист",
    category: "cosmetolog",
    bio: "Ін'єкційна та апаратна косметологія, догляд SKEYNDOR. Підбирає протокол індивідуально під тип шкіри та задачу кожного гостя.",
    photo: "/images/team/cosmetolog-1.jpg",
  },
  {
    slug: "hairdresser",
    name: "Анна Ковальська",
    role: "Стиліст-перукар",
    category: "hairdresser",
    bio: "Складні техніки фарбування Air Touch, Balayage, Shatush, авторські стрижки та відновлення структури волосся.",
    photo: "/images/team/hairdresser-1.jpg",
  },
  {
    slug: "spa",
    name: "Вікторія Сидоренко",
    role: "SPA-терапевт",
    category: "spa",
    bio: "Ритуали глибокого розслаблення та SPA-капсула Neoqi Medic — комплексне відновлення тіла й емоційного стану.",
    photo: "/images/team/spa-1.jpg",
  },
];
