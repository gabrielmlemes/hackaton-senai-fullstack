export async function getBarbershops() {
  const res = await fetch("http://localhost:5000/barbearias", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Erro ao buscar barbearias");
  }

  return res.json();
}
