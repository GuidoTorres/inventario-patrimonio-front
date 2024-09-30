import { Flex, Input, Select, Typography } from "antd";
import Item from "antd/es/list/Item";
import React, { useEffect, useRef, useState } from "react";
import CodigoBarras from "./Etiquetas/CodigoBarras";

const EtiquetasBienes = ({ setTitle }) => {
  const barcodeRef = useRef();

  useEffect(() => {
    setTitle("Etiquetas para bienes");
  }, []);
  const [ubicaciones, setUbicaciones] = useState([]);
  const [formValues, setFormValues] = useState();
  const [trabajadores, setTrabajadores] = useState([]);
  const [etiquetas, setEtiquetas] = useState([]);
  const [cod, setCod] = useState("");
  const [dni, setDni] = useState("");

  useEffect(() => {
    getUbicaciones();
  }, []);

  const getUbicaciones = async () => {
    const response = await fetch(`http://localhost:3006/api/v1/ubicaciones`);

    if (response.ok) {
      const info = await response.json();
      setUbicaciones(info); // Guardar los bienes en el estado si la respuesta es exitosa
    }
  };

  const getTrabajador = async () => {
    const response = await fetch(
      `http://localhost:3006/api/v1/bienes/trabajadores?cod=${cod}`
    );

    if (response.ok) {
      const info = await response.json();
      setTrabajadores(info); // Guardar los bienes en el estado si la respuesta es exitosa
    } else {
      setTrabajadores([]);
    }
  };

  const getEtiquetas = async () => {
    const response = await fetch(
      `http://localhost:3006/api/v1/bienes/etiquetas?cod=${cod}&dni=${dni}`
    );

    if (response.ok) {
      const info = await response.json();
      setEtiquetas(info); // Guardar los bienes en el estado si la respuesta es exitosa
    } else {
      setEtiquetas([]);
    }
  };

  useEffect(() => {
    if (cod !== "") {
      getEtiquetas();
    }
  }, [dni]);

  useEffect(() => {
    getTrabajador();
  }, [cod]);
  console.log("====================================");
  console.log(cod);
  console.log("====================================");
  return (
    <>
      <Typography.Text>Busqueda de </Typography.Text>
      <Flex
        justify="start"
        gap={"10px"}
        style={{
          backgroundColor: "white",
          padding: "15px",
          borderRadius: "8px",
        }}
      >
        <Input
          placeholder="Cod. Ubicación"
          onChange={(e) => setCod(e.target.value)}
        />
        <Select
          className="form-item-input"
          onChange={(e) => setDni(e)}
          options={
            trabajadores.length > 0
              ? trabajadores.map((item) => {
                  return { label: item.nombre, value: item.dni };
                })
              : []
          }
        />
      </Flex>

      <div ref={barcodeRef}>
        <CodigoBarras values={etiquetas} />
      </div>
    </>
  );
};

export default EtiquetasBienes;
