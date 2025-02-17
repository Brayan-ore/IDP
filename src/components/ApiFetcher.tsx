import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function ApiFetcher() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      // Paso 1: Obtener el token de acceso
      const authResponse = await fetch("https://api.getport.io/v1/auth/access_token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          clientId: "TU_CLIENT_ID",
          clientSecret: "TU_CLIENT_SECRET",
        }),
      });

      if (!authResponse.ok) throw new Error("Error al obtener token");

      const { accessToken } = await authResponse.json();

      // Paso 2: Usar el token para obtener datos
      const dataResponse = await fetch("https://api.getport.io/v1/blueprints/prueba", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      if (!dataResponse.ok) throw new Error("Error al obtener datos");

      const result = await dataResponse.json();
      setData(result.items || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <Button onClick={fetchData} disabled={loading}>
        {loading ? "Cargando..." : "Obtener Datos de Port.io"}
      </Button>
      <Card className="mt-4">
        <CardContent>
          {error && <p className="text-red-500">Error: {error}</p>}
          {data.length > 0 ? (
            <ul className="text-sm">
              {data.map((item, index) => (
                <li key={index} className="border-b py-2">
                  {item.title} - {item.identifier}
                </li>
              ))}
            </ul>
          ) : (
            <p>No hay datos disponibles</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
