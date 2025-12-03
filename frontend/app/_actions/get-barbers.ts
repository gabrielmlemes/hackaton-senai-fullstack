'use server';
export async function getBarbershops() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/barbearias`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Erro ao buscar barbearias");
  }

  return res.json();
}