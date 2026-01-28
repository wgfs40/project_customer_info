const DashBoardPage = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">content</h2>
      <div className="space-y-4">
        <p className="text-gray-600">Este diseño está optimizado para dispositivos móviles.</p>
        <p className="text-gray-600">
          **En móvil:** El menú lateral está oculto y se activa con el botón de menú. El área de
          contenido principal llena el resto de la pantalla.
        </p>
        <p className="text-gray-600">
          **En escritorio:** La barra lateral y el contenido se muestran simultáneamente en una
          rejilla de 5 columnas (1/5 para el sidebar, 4/5 para el contenido).
        </p>

        {/* Simulación de contenido largo para probar el scroll */}
        <div className="h-[60vh] bg-gray-50 p-4 rounded-lg border border-gray-100 overflow-y-auto">
          <p className="font-medium text-gray-700">Contenido de prueba con scroll:</p>
          <ul className="list-disc ml-5 mt-2 space-y-1 text-sm">
            {/* Repetir elementos de lista para asegurar scroll en móvil */}
            <li>Elemento de lista (para scroll)</li>
            <li>Elemento de lista (para scroll)</li>
            <li>Elemento de lista (para scroll)</li>
            <li>Elemento de lista (para scroll)</li>
            <li>Elemento de lista (para scroll)</li>
            <li>Elemento de lista (para scroll)</li>
            <li>Elemento de lista (para scroll)</li>
            <li>Elemento de lista (para scroll)</li>
            <li>Elemento de lista (para scroll)</li>
            <li>Elemento de lista (para scroll)</li>
            <li>Elemento de lista (para scroll)</li>
            <li>Elemento de lista (para scroll)</li>
            <li>Elemento de lista (para scroll)</li>
            <li>Elemento de lista (para scroll)</li>
            <li>Elemento de lista (para scroll)</li>
            <li>Elemento de lista (para scroll)</li>
            <li>Elemento de lista (para scroll)</li>
            <li>Elemento de lista (para scroll)</li>
            <li>Elemento de lista (para scroll)</li>
            <li>Elemento de lista (para scroll)</li>
            <li>Elemento de lista (para scroll)</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashBoardPage;
