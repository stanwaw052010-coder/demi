import { redirect } from "next/navigation";

// Головна сторінка веде на сайт-візитку Lesssia Gutsul (public/lesssia-gutsul.html).
export default function Home() {
  redirect("/lesssia-gutsul.html");
}
