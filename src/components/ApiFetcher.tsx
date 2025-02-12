import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function ApiFetcher() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");
      if (!response.ok) throw new Error("Error al obtener datos");
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <Button onClick={fetchData} disabled={loading}>
        {loading ? "Cargando..." : "Obtener Datos"}
      </Button>
      <Card className="mt-4">
        <CardContent>
          {error && <p className="text-red-500">Error: {error}</p>}
          {data ? <pre className="text-sm">{JSON.stringify(data, null, 2)}</pre> : <p>No hay datos disponibles</p>}
        </CardContent>
      </Card>
    </div>
  );
}