import React, { useEffect } from "react";

const Reportes = ({ setTitle }) => {
  useEffect(() => {
    setTitle("Inventario");
  }, []);
  return <div>Reportes</div>;
};

export default Reportes;
