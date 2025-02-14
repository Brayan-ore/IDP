export default function ServiceList({ services }) {
  return (
    <div className="mt-4">
      {services.length === 0 ? (
        <p>No hay servicios disponibles</p>
      ) : (
        <ul className="border rounded p-2">
          {services.map((service, index) => (
            <li key={index} className="border-b p-2">
              {service.name} - {service.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
