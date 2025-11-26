'use server';
export async function getBarbershops() {
  const res = await fetch("http://localhost:5000/barbearias", {
  });

  if (!res.ok) {
    throw new Error("Erro ao buscar barbearias");
  }

  return res.json();
}